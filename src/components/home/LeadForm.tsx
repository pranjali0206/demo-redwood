import { useId, useRef, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  BUDGETS,
  CONTACT_TIMES,
  isFilled,
  LEAD_ENDPOINT,
  PRIVACY_NOTE,
  whatsappHref,
  type ContactTime,
} from "./content";

const BUDGET_RANGES = BUDGETS.filter((b) => isFilled(b.label));
const HAS_BUDGETS = BUDGET_RANGES.some((b) => b.value);
import { Icon, track, WhatsAppButton } from "./ui";

/* Schema ------------------------------------------------------------------------------------- */

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(60, "Please keep your name under 60 characters."),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Please enter a 10-digit mobile number."),
  city: z.string().trim().max(60, "Please keep the city under 60 characters.").optional(),
  budget: z.string().optional(),
  time: z.enum(["morning", "afternoon", "evening", "any"]),
  /** Honeypot: hidden from people, tempting to bots. */
  company: z.string().optional(),
});
type Lead = z.infer<typeof schema>;

/** Keeps the 10-digit national number from whatever was typed or pasted (+91, 0, spaces). */
function cleanMobile(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
  if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
}

function utm() {
  const q = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = q.get(k);
    if (v) out[k] = v;
  }
  return out;
}

async function submitLead(lead: Record<string, unknown>) {
  if (import.meta.env.DEV && (window as { __rwbLeadFail?: boolean }).__rwbLeadFail) {
    await new Promise((r) => setTimeout(r, 600));
    throw new Error("Simulated failure");
  }
  if (!LEAD_ENDPOINT) {
    if (import.meta.env.DEV) {
      console.info("[lead] VITE_LEAD_ENDPOINT is not set; simulating success.", lead);
      await new Promise((r) => setTimeout(r, 900));
      return;
    }
    throw new Error("Lead endpoint not configured");
  }
  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);
}

/* Form --------------------------------------------------------------------------------------- */

/**
 * The site-visit booking form. `full`: the five fields of the CTA section. `compact`: name and
 * mobile in one row, for the band before the FAQ. Both share validation, endpoint and analytics.
 */
export function LeadForm({
  variant,
  location,
}: {
  variant: "full" | "compact";
  location: "cta" | "repeat_cta";
}) {
  const uid = useId().replace(/:/g, "");
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [sentTime, setSentTime] = useState<ContactTime>("morning");
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<Lead>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", mobile: "", city: "", budget: "", time: "morning", company: "" },
  });
  const values = watch();
  const full = variant === "full";

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("cta_form_start", { location });
  };

  const onValid = async (data: Lead) => {
    track("cta_form_submit", { location });
    setStatus("idle");
    // A filled honeypot is a bot: thank it and send nothing.
    if (data.company) {
      setStatus("success");
      return;
    }
    try {
      await submitLead({
        name: data.name,
        mobile: `+91${data.mobile}`,
        city: data.city || "",
        budget: BUDGETS.find((b) => b.value === data.budget)?.label ?? "",
        contactTime: data.time,
        location,
        pageUrl: window.location.href,
        utm: utm(),
        timestamp: new Date().toISOString(),
      });
      setSentTime(data.time);
      setStatus("success");
      track("cta_form_success", { location });
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch (err) {
      setStatus("error");
      track("cta_form_error", { location, reason: "network", message: String(err) });
    }
  };

  const onInvalid = (errs: FieldErrors<Lead>) => {
    track("cta_form_error", { location, reason: "validation", fields: Object.keys(errs) });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // One gentle shake on each field that needs attention.
    for (const name of Object.keys(errs)) {
      formRef.current
        ?.querySelector(`[data-field="${name}"] .rwh-input`)
        ?.animate(
          [
            { transform: "translateX(0)" },
            { transform: "translateX(-6px)" },
            { transform: "translateX(5px)" },
            { transform: "translateX(-3px)" },
            { transform: "translateX(0)" },
          ],
          { duration: 360, easing: "ease-out" },
        );
    }
  };

  const back = () => {
    reset();
    setStatus("idle");
    started.current = false;
    requestAnimationFrame(() => setFocus("name"));
  };

  const state = (f: keyof Lead) => {
    if (errors[f]) return "is-error";
    if (touchedFields[f] && values[f]) return "is-valid";
    return "";
  };
  const describedBy = (f: keyof Lead, hint?: boolean) =>
    [errors[f] ? id(`${f}-err`) : "", hint ? id(`${f}-hint`) : ""].filter(Boolean).join(" ") ||
    undefined;

  const err = (f: keyof Lead) => (
    <p id={id(`${f}-err`)} className="rwh-err" aria-live="polite">
      {errors[f] ? (
        <>
          <Icon name="alert" size={15} />
          <span>{errors[f]?.message}</span>
        </>
      ) : null}
    </p>
  );
  const check = (
    <span className="rwh-field__ok" aria-hidden="true">
      <Icon name="check" size={16} />
    </span>
  );

  const mobileReg = register("mobile");
  const phrase = CONTACT_TIMES.find((t) => t.value === sentTime)?.phrase ?? "soon";

  return (
    <div className={`rwh-form rwh-form--${variant}`} data-status={status}>
      <form
        ref={formRef}
        className="rwh-form__panel"
        noValidate
        onSubmit={handleSubmit(onValid, onInvalid)}
        onFocusCapture={onStart}
        aria-hidden={status === "success"}
        inert={status === "success"}
      >
        <div className="rwh-form__fields">
          <div className={`rwh-field ${state("name")}`} data-field="name">
            <label htmlFor={id("name")}>Full Name</label>
            <div className="rwh-input">
              <input
                id={id("name")}
                type="text"
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={describedBy("name")}
                {...register("name")}
              />
              {check}
            </div>
            {err("name")}
          </div>

          <div className={`rwh-field ${state("mobile")}`} data-field="mobile">
            <label htmlFor={id("mobile")}>Mobile Number</label>
            <div className="rwh-input rwh-input--tel">
              <span className="rwh-input__prefix" aria-hidden="true">
                +91
              </span>
              <input
                id={id("mobile")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                aria-invalid={!!errors.mobile}
                aria-describedby={describedBy("mobile")}
                {...mobileReg}
                onChange={(e) => {
                  e.target.value = cleanMobile(e.target.value);
                  mobileReg.onChange(e);
                }}
              />
              {check}
            </div>
            {err("mobile")}
          </div>

          {full ? (
            <>
              <div className={`rwh-field ${state("city")}`} data-field="city">
                <label htmlFor={id("city")}>City</label>
                <div className="rwh-input">
                  <input
                    id={id("city")}
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Where do you live?"
                    aria-invalid={!!errors.city}
                    aria-describedby={describedBy("city")}
                    {...register("city")}
                  />
                  {check}
                </div>
                {err("city")}
              </div>

              {HAS_BUDGETS ? (
                <div className="rwh-field" data-field="budget">
                  <label htmlFor={id("budget")}>Investment Budget</label>
                  <div className="rwh-input rwh-input--select">
                    <select id={id("budget")} {...register("budget")}>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                    <Icon name="right" size={16} className="rwh-input__chev" />
                  </div>
                </div>
              ) : null}

              <fieldset className="rwh-field rwh-times">
                <legend>Preferred Contact Time</legend>
                <div className="rwh-pills">
                  {CONTACT_TIMES.map((t) => (
                    <label key={t.value} className="rwh-pill">
                      <input type="radio" value={t.value} {...register("time")} />
                      <span>
                        {t.label}
                        {t.hint ? <small>{t.hint}</small> : null}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          ) : null}

          {/* Honeypot */}
          <div className="rwh-hp" aria-hidden="true">
            <label htmlFor={id("company")}>Company</label>
            <input
              id={id("company")}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>

          <div className="rwh-form__submit">
            <button
              type="submit"
              className="rwh-btn rwh-btn--primary rwh-btn--block"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="rwh-spinner" aria-hidden="true" />
                  <span>Booking…</span>
                </>
              ) : (
                <>
                  <span>Book My Site Visit</span>
                  <Icon name="arrow" size={18} className="rwh-btn__arrow" />
                </>
              )}
            </button>
          </div>
        </div>

        <p className="rwh-form__error" role="alert">
          {status === "error" ? (
            <>
              <Icon name="alert" size={16} />
              <span>Something went wrong. Please try again or WhatsApp us.</span>
            </>
          ) : null}
        </p>

        {full ? (
          <>
            <p className="rwh-form__note">{PRIVACY_NOTE}</p>
            <div className="rwh-or" aria-hidden="true">
              <span>or</span>
            </div>
            <WhatsAppButton location={location} className="rwh-btn--block">
              Prefer to chat? WhatsApp us
            </WhatsAppButton>
          </>
        ) : (
          <p className="rwh-form__alt">
            <span>Prefer to chat?</span>{" "}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location })}
            >
              WhatsApp us
            </a>
          </p>
        )}
      </form>

      <div
        className="rwh-form__done"
        aria-hidden={status !== "success"}
        inert={status !== "success"}
      >
        <span className="rwh-form__tick" aria-hidden="true">
          <Icon name="check" size={26} />
        </span>
        <h3 ref={doneRef} tabIndex={-1} className="rwh-form__done-title">
          Thank you.
        </h3>
        <p>Our team will call you {phrase} to plan your site visit.</p>
        <button type="button" className="rwh-link" onClick={back}>
          Back to the form
        </button>
      </div>
    </div>
  );
}
