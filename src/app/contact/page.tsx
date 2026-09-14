import type { Metadata } from "next";
import { Suspense } from "react";
import EnquiryForm from "@/components/enquiry-form";
import { CONTACT_DETAILS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — KQUEL",
  description:
    "Enquire about KQUEL whirlpool bathtubs, hot spas, saunas, steam cabins, showers and pools. Manufactured in New Delhi since 1998.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="content" className="flex-1">
      <div className="mx-auto max-w-[1440px] px-5 pt-32 pb-28 md:px-20 md:pt-40 md:pb-36">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="label-caps text-violet-ink">Contact</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none tracking-[-0.02em] text-foreground">
              Start a project.
            </h1>
            <p className="mt-7 max-w-[42ch] text-base leading-relaxed text-chrome/80">
              Tell us the room, the collection and the timeline. Every piece is
              built to order, so the conversation is more useful than a
              price list.
            </p>

            <dl className="mt-14 border-t border-chrome/15">
              {CONTACT_DETAILS.map((detail) => (
                <div key={detail.label} className="border-b border-chrome/15 py-6">
                  <dt className="label-caps text-chrome/70">{detail.label}</dt>
                  <dd className="mt-3 text-base text-foreground">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-violet-ink"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Suspense fallback={<div className="min-h-[40rem]" />}>
            <EnquiryForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
