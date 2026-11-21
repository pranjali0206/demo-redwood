import { useRef } from "react";
import { LAB } from "./content";
import { Media, useReveal } from "./ui";

/** The Redwood Lab card — a standalone section after the services. */
export function LabSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} className="rwh rwh-sec rwh-sec--start-tight rwh-bg-50" aria-labelledby="lab-title">
      <div className="rwh-wrap">
        <div className="rwh-lab" data-rv="up">
          <Media
            src={LAB.photo}
            alt={LAB.alt}
            ratio="21 / 9"
            placeholder="[Lab render — the Redwood tissue-culture lab]"
            icon="flask"
            className="rwh-lab__media"
          />
          <div className="rwh-lab__copy">
            <span className="rwh-tag">COMING SOON</span>
            <h3 className="rwh-lab__title" id="lab-title">{LAB.title}</h3>
            <p>{LAB.line}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
