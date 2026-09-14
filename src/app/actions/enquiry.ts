"use server";

import { CATEGORIES } from "@/lib/catalog";

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  collection: string;
  product: string;
  message: string;
  /* Honeypot. Real people never see it, so anything here is a bot. */
  company: string;
};

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: string };

const GENERIC_ERROR =
  "We could not send that just now. Please try again, or email us directly.";

/* Validated again on the server: the browser checks are there to help
   someone filling the form, not to stop someone bypassing it. */
function invalid(input: EnquiryInput): string | null {
  const email = input.email.trim();
  const digits = input.phone.replace(/\D/g, "");

  if (input.name.trim().length < 2) return "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return "Enter an email address we can reply to.";
  }
  if (digits.length < 7) return "Enter a phone number.";
  if (!CATEGORIES.some((c) => c.slug === input.collection)) {
    return "Choose the collection you are interested in.";
  }
  if (input.message.trim().length < 10) {
    return "Tell us a little about the project.";
  }
  /* Anything longer than this is a paste-bomb, not an enquiry. */
  if (input.message.length > 4000) return "That message is too long.";
  return null;
}

export async function submitEnquiry(
  input: EnquiryInput
): Promise<EnquiryResult> {
  /* Bots fill every field they find. Accept quietly so they get no signal,
     and record nothing. */
  if (input.company) return { ok: true };

  const problem = invalid(input);
  if (problem) return { ok: false, error: problem };

  const url = process.env.ENQUIRY_WEBHOOK_URL;
  const token = process.env.ENQUIRY_WEBHOOK_TOKEN;

  if (!url || !token) {
    console.error("Enquiry webhook is not configured.");
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    /* Apps Script answers a POST with a redirect to the script output, so
       redirects have to be followed. */
    const response = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        collection: collectionName(input.collection),
        product: productName(input.collection, input.product),
        message: input.message.trim(),
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      console.error("Enquiry webhook HTTP", response.status);
      return { ok: false, error: GENERIC_ERROR };
    }

    const result = await response.json().catch(() => null);
    if (!result?.ok) {
      console.error("Enquiry webhook rejected:", result?.error);
      return { ok: false, error: GENERIC_ERROR };
    }

    return { ok: true };
  } catch (err) {
    console.error("Enquiry webhook failed:", err);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/* The sheet should read the way a person would say it, not in slugs. */
function collectionName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

function productName(collectionSlug: string, productSlug: string) {
  if (!productSlug) return "";
  const category = CATEGORIES.find((c) => c.slug === collectionSlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  return product ? `${product.name} — ${product.sizes[0]}` : productSlug;
}
