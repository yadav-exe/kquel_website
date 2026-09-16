import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";

/* Opened by the Studio's Presentation tool. Turns on draft mode for the
   editor's browser so the site renders unpublished changes for them. */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
