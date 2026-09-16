import { defineLive } from "next-sanity/live";
import { client } from "./client";

/* Read token: lets the server fetch drafts in preview and lets a signed-in
   editor's browser listen for draft changes. Absent, the site serves
   published content only — which is all production needs. */
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
