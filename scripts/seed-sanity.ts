/* Loads the catalogue and page copy into Sanity, so the Studio starts full.

   Run with a write token in .env.local, or after `npx sanity login`:
     npm run seed                 writes everything
     npm run seed -- -- --dry-run prints what would be written

   Safe to run again: every document has a fixed id and is replaced in
   place, and Sanity keeps one copy of an image however often it is
   uploaded. */

import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";
import { CATEGORIES } from "./seed/catalog";
import { ABOUT_PAGE, HOME_PAGE, SITE_SETTINGS, type SeedImage } from "./seed/pages";

const dryRun = process.argv.includes("--dry-run");

/* The CLI does not load env files for scripts; the write token lives in
   .env.local. Run with --with-user-token after `npx sanity login` instead
   if you would rather not keep a token on disk. */
try {
  process.loadEnvFile(".env.local");
} catch {
  /* No .env.local — fine if the CLI is logged in. */
}

const client = getCliClient({
  apiVersion: "2026-06-01",
  ...(process.env.SANITY_API_WRITE_TOKEN
    ? { token: process.env.SANITY_API_WRITE_TOKEN }
    : {}),
});
if (!client.config().token && !dryRun) {
  throw new Error(
    "No credentials: set SANITY_API_WRITE_TOKEN in .env.local, or run `npx sanity login` and pass --with-user-token."
  );
}
const publicDir = path.resolve(process.cwd(), "public");

type ImageValue = {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
  alt?: string;
};

/* One upload per distinct file or address; Sanity returns the existing
   asset for a file it has already seen. */
const assetIds = new Map<string, string>();

async function uploadImage(source: SeedImage): Promise<ImageValue | undefined> {
  const key = source.file ?? source.url;
  if (!key) return undefined;

  if (!assetIds.has(key)) {
    if (dryRun) {
      assetIds.set(key, `dry-run-${assetIds.size}`);
    } else if (source.file) {
      const file = path.join(publicDir, source.file);
      if (!existsSync(file)) throw new Error(`Image not found: ${file}`);
      const asset = await client.assets.upload("image", createReadStream(file), {
        filename: path.basename(file),
      });
      assetIds.set(key, asset._id);
    } else if (source.url) {
      const response = await fetch(source.url);
      if (!response.ok) throw new Error(`Could not fetch ${source.url}: ${response.status}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      const asset = await client.assets.upload("image", buffer, {
        filename: path.basename(new URL(source.url).pathname),
        contentType: response.headers.get("content-type") ?? undefined,
      });
      assetIds.set(key, asset._id);
    }
    console.log(`  image  ${key}`);
  }

  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetIds.get(key)! },
    ...(source.alt ? { alt: source.alt } : {}),
  };
}

/* Sanity needs a stable _key on every object in an array. */
const keyed = <T extends object>(items: T[] | undefined) =>
  items?.map((item, i) => ({ _key: `k${i}`, ...item }));

const ref = (id: string) => ({ _type: "reference" as const, _ref: id });
const slug = (current: string) => ({ _type: "slug" as const, current });

const collectionId = (s: string) => `collection-${s}`;
const productId = (s: string) => `product-${s}`;

async function main() {
  console.log(dryRun ? "Dry run — nothing will be written.\n" : `Seeding ${client.config().projectId}/${client.config().dataset}\n`);

  const docs: Record<string, unknown>[] = [];

  /* Collections and products */
  for (const [c, category] of CATEGORIES.entries()) {
    docs.push({
      _id: collectionId(category.slug),
      _type: "collection",
      name: category.name,
      slug: slug(category.slug),
      order: (c + 1) * 10,
      tagline: category.tagline,
      cover: await uploadImage({ file: category.src, alt: category.alt }),
      intro: category.editorial.intro,
      reasons: {
        eyebrow: category.editorial.reasons.eyebrow,
        heading: category.editorial.reasons.heading,
        items: keyed(category.editorial.reasons.items),
      },
      difference: {
        heading: category.editorial.difference.heading,
        items: keyed(category.editorial.difference.items),
      },
    });

    for (const [p, product] of category.products.entries()) {
      const image = product.image
        ? await uploadImage({ file: product.image, alt: product.name })
        : undefined;

      const base = {
        _id: productId(product.slug),
        _type: "product",
        name: product.name,
        slug: slug(product.slug),
        collection: ref(collectionId(category.slug)),
        kind: product.kind,
        configuration: product.configuration,
        sizes: product.sizes.filter((size) => size !== "—"),
        order: (p + 1) * 10,
        ...(image ? { image } : {}),
        published: Boolean(image),
        ...(product.story ? { story: product.story } : {}),
      };

      docs.push(
        product.kind === "tub"
          ? {
              ...base,
              form: product.form,
              panel: product.panel ?? "Two side panel",
              ...(product.shellNote ? { shellNote: product.shellNote } : {}),
              pumps: product.pumps ?? 1,
              jets: product.jets ?? 6,
              spineJets: product.spineJets ?? 2,
              bubbleJets: product.bubbleJets ?? 12,
              pillows: product.pillows ?? 1,
              lights: product.lights ?? 1,
              ratedAirPump: product.ratedAirPump ?? false,
              audio: product.audio ?? false,
              controlsStandard: product.controlsStandard ?? false,
              extras: product.extras ?? [],
            }
          : {
              ...base,
              highlights: keyed(product.highlights),
              specGroups: keyed(product.specGroups),
            }
      );
    }
  }

  /* Pages and settings */
  docs.push({ _id: "siteSettings", _type: "siteSettings", ...(await SITE_SETTINGS(uploadImage)) });
  docs.push({ _id: "homePage", _type: "homePage", ...(await HOME_PAGE(uploadImage, keyed)) });
  docs.push({ _id: "aboutPage", _type: "aboutPage", ...(await ABOUT_PAGE(uploadImage, keyed)) });

  const counts = docs.reduce<Record<string, number>>((acc, d) => {
    const t = String(d._type);
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {});
  console.log("\nDocuments:", counts);

  if (dryRun) return;

  /* Batches keep each transaction comfortably under the request limit. */
  for (let i = 0; i < docs.length; i += 40) {
    const batch = docs.slice(i, i + 40);
    let tx = client.transaction();
    for (const doc of batch) tx = tx.createOrReplace(doc as { _id: string; _type: string });
    await tx.commit();
    console.log(`  wrote ${Math.min(i + 40, docs.length)}/${docs.length}`);
  }
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
