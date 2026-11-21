import { useEffect, useState } from "react";
import { whatsappHref } from "./content";
import { goToBooking, track, WhatsAppGlyph } from "./ui";

/**
 * Phones: a white pill bar at the bottom once the visitor is past the hero, taking them to the
 * booking form. It steps away while a booking form is on screen, while the keyboard is open, and
 * while the City section is pinned (styles/home.css).
 */
export function StickyBookBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".rwb-hero");
    const forms = Array.from(document.querySelectorAll("#contact, .rwh-band"));
    let pastHero = false;
    let typing = false;
    const seen = new Set<Element>();
    const update = () => setShow(pastHero && seen.size === 0 && !typing);

    const heroIO = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    if (hero) heroIO.observe(hero);
    else pastHero = true;

    const formIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target);
          else seen.delete(e.target);
        }
        update();
      },
      { threshold: 0.12 },
    );
    forms.forEach((f) => formIO.observe(f));

    // Keyboard open: a text field has focus, or the visual viewport has shrunk a lot.
    const vv = window.visualViewport;
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement &&
      t.matches("input:not([type=radio]):not([type=checkbox]), textarea, select");
    const onVV = () => {
      typing = (!!vv && window.innerHeight - vv.height > 150) || isField(document.activeElement);
      update();
    };
    const onIn = (e: FocusEvent) => {
      if (isField(e.target)) {
        typing = true;
        update();
      }
    };
    const onOut = () => requestAnimationFrame(onVV);
    vv?.addEventListener("resize", onVV);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      heroIO.disconnect();
      formIO.disconnect();
      vv?.removeEventListener("resize", onVV);
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  return (
    <div className={`rwh rwh-sticky ${show ? "is-on" : ""}`} aria-hidden={!show} inert={!show}>
      <p className="rwh-sticky__text">Ready to see it?</p>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="rwh-sticky__wa"
        aria-label="WhatsApp us"
        onClick={() => track("whatsapp_click", { location: "sticky_bar" })}
      >
        <WhatsAppGlyph size={22} />
      </a>
      <a href="#contact" className="rwh-btn rwh-btn--primary rwh-btn--sm" onClick={goToBooking}>
        Book visit
      </a>
    </div>
  );
}
