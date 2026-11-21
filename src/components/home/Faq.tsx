import { useId, useRef, useState } from "react";
import { FAQ, isFilled } from "./content";
import { LeadForm } from "./LeadForm";
import { Headline, Icon, useReveal, WhatsAppButton } from "./ui";

/** 3.7 — A slim booking band before the FAQ, so a reader at the end can book without going back. */
export function RepeatCta() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="rwh rwh-band" aria-labelledby="again-title">
      <div className="rwh-wrap rwh-band__grid">
        <Headline id="again-title" className="rwh-band__h2">
          Ready to see <em>your land?</em>
        </Headline>
        <div data-rv="up">
          <LeadForm variant="compact" location="repeat_cta" />
        </div>
      </div>
    </section>
  );
}

/** 3.8 — Questions, answered. */
export function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId().replace(/:/g, "");
  useReveal(ref);
  // FAQPage structured data, only once every answer is final.
  const ready = FAQ.every((f) => isFilled(f.a));
  return (
    <section ref={ref} className="rwh rwh-sec rwh-bg-50" aria-labelledby="faq-title">
      <div className="rwh-wrap rwh-faq">
        <div className="rwh-faq__side">
          <Headline id="faq-title">
            Questions, <em>answered.</em>
          </Headline>
          <div className="rwh-faq__help rwh-faq__help--side" data-rv="up">
            <p>Still unsure?</p>
            <WhatsAppButton location="faq" />
          </div>
        </div>
        <div className="rwh-acc" data-rv="up">
          {FAQ.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className={`rwh-acc__item ${on ? "is-open" : ""}`}>
                <h3 className="rwh-acc__q">
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    aria-expanded={on}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(on ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="rwh-acc__icon" aria-hidden="true">
                      <Icon name="plus" size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${uid}-a${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q${i}`}
                  className="rwh-acc__panel"
                  inert={!on}
                >
                  <div className="rwh-acc__inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="rwh-faq__help rwh-faq__help--below">
          <p>Still unsure?</p>
          <WhatsAppButton location="faq" />
        </div>
      </div>
      {ready ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      ) : null}
    </section>
  );
}
