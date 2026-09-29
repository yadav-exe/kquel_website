import type { SchemaTypeDefinition } from "sanity";
import { aboutPageType } from "./documents/aboutPage";
import { collectionType } from "./documents/collection";
import { homePageType } from "./documents/homePage";
import { productType } from "./documents/product";
import { siteSettingsType } from "./documents/siteSettings";
import { figureType } from "./objects/figure";
import { linkType } from "./objects/link";
import { pointType } from "./objects/point";
import { seoType } from "./objects/seo";

export const schemaTypes: SchemaTypeDefinition[] = [
  /* Documents */
  siteSettingsType,
  homePageType,
  aboutPageType,
  collectionType,
  productType,
  /* Objects */
  seoType,
  pointType,
  figureType,
  linkType,
];

/* Documents that exist exactly once. The Studio hides "create new" for them
   and opens them straight from the sidebar. */
export const SINGLETON_TYPES = new Set(["siteSettings", "homePage", "aboutPage"]);
