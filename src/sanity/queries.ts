import { defineQuery } from "next-sanity";

/* Every image comes with its asset resolved, so a page can size it before
   it loads and the CDN can respect the crop set in the Studio. */
const IMAGE = /* groq */ `{
  ...,
  asset->{ _id, url, metadata{ dimensions, lqip } }
}`;

const SEO = /* groq */ `seo{ ..., shareImage ${IMAGE} }`;

const PRODUCT = /* groq */ `
  _id,
  _updatedAt,
  name,
  "slug": slug.current,
  configuration,
  sizes,
  order,
  kind,
  published,
  image ${IMAGE},
  form, panel, shellNote,
  pumps, jets, spineJets, bubbleJets, pillows, lights,
  ratedAirPump, audio, controlsStandard, extras,
  highlights, specGroups,
  story,
  ${SEO}
`;

/* Only pieces with photography are shown; the Studio enforces the same rule
   before a piece can be marked published. */
const LISTED = /* groq */ `published == true && defined(image)`;

export const COLLECTIONS_QUERY = defineQuery(`
  *[_type == "collection"] | order(order asc) {
    _id,
    _updatedAt,
    name,
    "slug": slug.current,
    order,
    tagline,
    cover ${IMAGE},
    intro,
    reasons,
    difference,
    ${SEO},
    "products": *[_type == "product" && collection._ref == ^._id && ${LISTED}]
      | order(order asc) { ${PRODUCT} }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    name, parent, city, founded, positioning,
    email, phone, website, works, socialLinks,
    defaultShareImage ${IMAGE}
  }
`);

export const HOME_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    hero{ statement, taglineLead, taglineAccent, cta, image ${IMAGE} },
    ethos{
      cards[]{ _key, title, copy, image ${IMAGE} },
      closingLead, closingAccent
    },
    archetypes[]{
      _key,
      title,
      image ${IMAGE},
      collection->{ name, "slug": slug.current, tagline, cover ${IMAGE} }
    },
    signaturePieces[]{
      _key,
      copy,
      product->{
        name,
        "slug": slug.current,
        configuration,
        sizes,
        story,
        image ${IMAGE},
        "category": collection->slug.current
      }
    },
    innovation{ heading, disciplines, image ${IMAGE} },
    closing{
      heading, body, statement,
      disciplines[]{ _key, label, name, "slug": collection->slug.current }
    },
    ${SEO}
  }
`);

export const ABOUT_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    hero{ eyebrow, headline, tagline, image ${IMAGE} },
    origin,
    figures,
    principles,
    process,
    material,
    promise,
    closing,
    ${SEO}
  }
`);

/* For the About page's "pieces in the catalogue" figure and the footer. */
export const LISTED_PRODUCT_COUNT_QUERY = defineQuery(`
  count(*[_type == "product" && ${LISTED}])
`);
