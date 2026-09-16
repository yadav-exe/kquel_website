"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry } from "@/app/actions/enquiry";

type Field = "name" | "email" | "phone" | "collection" | "message";
type Values = Record<Field | "product", string>;

const EMPTY: Values = {
  name: "", email: "", phone: "", collection: "", product: "", message: "",
};

const fieldClasses =
  "w-full border-0 border-b border-chrome/50 bg-transparent px-0 py-3 text-base text-foreground " +
  "transition-colors duration-300 placeholder:text-chrome/60 focus:border-violet focus:outline-none " +
  "focus:ring-0 aria-[invalid=true]:border-error";

function validate(values: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter an email address we can reply to.";
  }
  if (values.phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Enter a phone number, including the country code.";
  }
  if (!values.collection) {
    errors.collection = "Choose the collection you are interested in.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Tell us a little about the project.";
  }
  return errors;
}

function Label({ htmlFor, children, optional }: {
  htmlFor: string; children: React.ReactNode; optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="label-caps block text-chrome/70">
      {children}
      {optional && <span className="ml-2 text-chrome/70">Optional</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-error">
      {message}
    </p>
  );
}

export type EnquiryCollection = {
  name: string;
  slug: string;
  products: { name: string; slug: string; sizes: string[] }[];
};

export default function EnquiryForm({
  collections,
  contactEmail,
}: {
  collections: EnquiryCollection[];
  contactEmail: string;
}) {
  const params = useSearchParams();
  const [values, setValues] = useState<Values>(() => ({
    ...EMPTY,
    /* Arriving from a product page carries its context in. */
    collection: params.get("collection") ?? "",
    product: params.get("product") ?? "",
  }));
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [botField, setBotField] = useState("");
  const [pending, startTransition] = useTransition();
  /* Counts submissions rather than reading `errors`, so re-submitting with
     the same faults still moves focus. */
  const [attempt, setAttempt] = useState(0);
  const errorCount = Object.keys(errors).length;

  /* Focus has to wait for the render that puts `aria-invalid` on the field —
     querying straight after setState finds nothing on the first submit. */
  useEffect(() => {
    if (attempt === 0 || errorCount === 0) return;
    const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
    first?.focus();
  }, [attempt, errorCount]);

  const products = useMemo(() => {
    const category = collections.find((c) => c.slug === values.collection);
    return category?.products ?? [];
  }, [collections, values.collection]);

  const set = (field: keyof Values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const next = e.target.value;
    setValues((v) => ({
      ...v,
      [field]: next,
      /* A different collection invalidates the chosen piece. */
      ...(field === "collection" ? { product: "" } : {}),
    }));
    if (errors[field as Field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setAttempt((n) => n + 1);
    setSendError(null);
    if (Object.keys(found).length > 0) return;

    /* Success is only claimed once the server confirms the row was written
       and the alert sent — never on optimism. */
    startTransition(async () => {
      const result = await submitEnquiry({ ...values, company: botField });
      if (result.ok) {
        setSubmitted(true);
      } else {
        setSendError(result.error);
      }
    });
  };

  if (submitted) {
    return (
      <div
        className="border border-chrome/15 bg-surface p-10 md:p-12"
        role="status"
        aria-live="polite"
      >
        <p className="label-caps text-violet-ink">Enquiry received</p>
        <h2 className="mt-6 font-display text-3xl leading-tight text-foreground">
          Thank you, {values.name.trim().split(" ")[0]}.
        </h2>
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-chrome/80">
          We will come back to you within two working days. If your project is
          on a shorter timeline, call us and we will move with it.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setSubmitted(false);
          }}
          className="label-caps mt-10 inline-flex min-h-11 items-center border-b border-chrome/40 pb-2 text-foreground transition-colors duration-300 hover:border-violet hover:text-violet-ink"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* Announced to screen readers, which otherwise get no signal that the
          submission was rejected. */}
      <p aria-live="polite" className="sr-only">
        {errorCount > 0
          ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.`
          : ""}
      </p>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <input
            id="name" name="name" type="text" autoComplete="name"
            value={values.name} onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClasses}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <input
            id="phone" name="phone" type="tel" autoComplete="tel"
            value={values.phone} onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldClasses}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <input
          id="email" name="email" type="email" autoComplete="email"
          value={values.email} onChange={set("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClasses}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <Label htmlFor="collection">Collection</Label>
          <select
            id="collection" name="collection"
            value={values.collection} onChange={set("collection")}
            aria-invalid={Boolean(errors.collection)}
            aria-describedby={errors.collection ? "collection-error" : undefined}
            className={`${fieldClasses} cursor-pointer`}
          >
            <option value="" className="bg-surface">Select a collection</option>
            {collections.map((category) => (
              <option
                key={category.slug} value={category.slug}
                className="bg-surface text-foreground"
              >
                {category.name}
              </option>
            ))}
          </select>
          <FieldError id="collection-error" message={errors.collection} />
        </div>

        <div>
          <Label htmlFor="product" optional>Piece</Label>
          <select
            id="product" name="product"
            value={values.product} onChange={set("product")}
            disabled={products.length === 0}
            className={`${fieldClasses} cursor-pointer disabled:cursor-not-allowed disabled:text-chrome/30`}
          >
            <option value="" className="bg-surface">
              {products.length === 0
                ? "Choose a collection first"
                : "No particular piece"}
            </option>
            {products.map((product) => (
              <option
                key={product.slug} value={product.slug}
                className="bg-surface text-foreground"
              >
                {product.name} — {product.sizes[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">About the project</Label>
        <textarea
          id="message" name="message" rows={4}
          value={values.message} onChange={set("message")}
          placeholder="Where it is going, when you need it, and anything we should know."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClasses} resize-y`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot: off-screen, out of the tab order and hidden from screen
          readers, so only an automated filler ever completes it. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
        />
      </div>

      {/* A failed send must never be mistaken for a sent one — say so, and
          give a way through that does not depend on this form. */}
      {sendError && (
        <div
          role="alert"
          className="border border-error/40 bg-error/5 p-6 text-sm leading-relaxed text-foreground"
        >
          {sendError}{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="underline underline-offset-4 transition-colors duration-300 hover:text-violet-ink"
          >
            {contactEmail}
          </a>
        </div>
      )}

      <div className="flex flex-col gap-6 border-t border-chrome/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-chrome/70">
          We reply within two working days.
        </p>
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="label-caps bg-violet-deep px-12 py-4 text-white shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-opacity duration-300 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
