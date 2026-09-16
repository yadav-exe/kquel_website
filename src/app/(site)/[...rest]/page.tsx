import { notFound } from "next/navigation";

/* Any address no page claims lands here, inside the site layout, so the 404
   keeps its header and footer. */
export default function CatchAll() {
  notFound();
}
