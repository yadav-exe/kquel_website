import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/* Sanity calls this when a document is published. The site is statically
   rendered, so this is what makes an edit go live without a redeploy: the
   affected cache tags expire, and the next request rebuilds those pages.

   Set up in Sanity → API → Webhooks: URL /api/revalidate, trigger on
   create/update/delete, projection {_type, "slug": slug.current}, and the
   secret matching SANITY_REVALIDATE_SECRET. */

type Payload = { _type?: string; slug?: string | null };

/* Which tags a change to each type touches. Collections embed their
   products, and both pages read site settings, so a change fans out. */
const AFFECTS: Record<string, string[]> = {
  product: ["product", "collection", "homePage"],
  collection: ["collection", "product", "homePage", "aboutPage"],
  siteSettings: ["siteSettings", "homePage", "aboutPage", "collection", "product"],
  homePage: ["homePage"],
  aboutPage: ["aboutPage"],
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response("Revalidation is not configured.", { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<Payload>(request, secret);
  if (!isValidSignature) {
    return new Response("Invalid signature.", { status: 401 });
  }
  if (!body?._type) {
    return new Response("Missing _type.", { status: 400 });
  }

  const tags = AFFECTS[body._type] ?? [body._type];
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ revalidated: tags, at: new Date().toISOString() });
}
