import type { StructureResolver } from "sanity/structure";

/* The sidebar. Pages first, then the catalogue grouped by collection, then
   the settings nobody touches often. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("KQUEL")
    .items([
      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.listItem()
        .title("Collections")
        .id("collections")
        .schemaType("collection")
        .child(
          S.documentTypeList("collection")
            .title("Collections")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.listItem()
        .title("Products by collection")
        .id("productsByCollection")
        .child(
          S.documentTypeList("collection")
            .title("Choose a collection")
            .defaultOrdering([{ field: "order", direction: "asc" }])
            .child((collectionId) =>
              S.documentList()
                .title("Products")
                .schemaType("product")
                .filter('_type == "product" && collection._ref == $collectionId')
                .params({ collectionId })
                .defaultOrdering([{ field: "order", direction: "asc" }])
                .initialValueTemplates([
                  S.initialValueTemplateItem("product-in-collection", {
                    collectionId,
                  }),
                ])
            )
        ),
      S.documentTypeListItem("product").title("All products"),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);
