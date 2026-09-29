import { useRef, useState, type ReactNode, type RefObject } from "react";
import { Controller, useForm, useWatch, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Copy,
  Download,
  Facebook,
  Linkedin,
  LoaderCircle,
  Lock,
  MessageCircle,
  Send,
  Share2,
  Twitter,
} from "lucide-react";
import joinBg from "@/assets/teak-forest.webp";
import { Reveal } from "@/components/site/Reveal";
import {
  canvasToBlob,
  certificateFileName,
  createCertificateId,
  downloadBlob,
} from "./certificate";
import { CertificateStage } from "./CertificateStage";
import { EASE } from "./constants";
import { Eyebrow } from "./Eyebrow";
import { leadWhatsAppUrl, saveLead, type UrbanFarmerLead } from "./lead";

const INTERESTS = [
  "Agroforestry",
  "Investing In Sagwaan",
  "Camping & Picnic Spots",
  "Long-term Returns",
] as const;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(60, "Please keep it under 60 characters"),
  whatsapp: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit WhatsApp number"),
  city: z
    .string()
    .trim()
    .min(2, "Please enter your city")
    .max(40, "Please keep it under 40 characters"),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address")]),
  interests: z.array(z.enum(INTERESTS)).min(1, "Pick at least one"),
  consent: z.boolean().refine((v) => v, "Please allow us to contact you on WhatsApp"),
});

type FormValues = z.infer<typeof schema>;

const DEFAULTS: FormValues = {
  name: "",
  whatsapp: "",
  city: "",
  email: "",
  interests: [],
  consent: false,
};

const SHARE_TEXT =
  "I just became an Urban Farmer with Redwood Biotech! Farming is no longer restricted to rurals — be a part of the revolution and get your own digital certificate.";

type Issued = { lead: UrbanFarmerLead; issuedAt: Date };

export function JoinRevolution() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [issued, setIssued] = useState<Issued | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const [previewDate] = useState(() => new Date());

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULTS,
    mode: "onTouched",
  });
  const [watchedName, watchedCity] = useWatch({ control: form.control, name: ["name", "city"] });

  const onSubmit = async (values: FormValues) => {
    // A short beat so the "issuing" state reads as a moment, not a flicker.
    await new Promise((resolve) => setTimeout(resolve, 800));
    const now = new Date();
    const lead: UrbanFarmerLead = {
      name: values.name,
      whatsapp: values.whatsapp,
      city: values.city,
      email: values.email,
      interests: values.interests,
      certificateId: createCertificateId(),
      createdAt: now.toISOString(),
    };
    saveLead(lead);
    setIssued({ lead, issuedAt: now });
    setBurstKey((k) => k + 1);
    toast.success(`Welcome aboard, ${firstName(lead.name)}! Your certificate is ready.`);
    requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const startOver = () => {
    form.reset(DEFAULTS);
    setIssued(null);
  };

  const certificate = issued
    ? {
        name: issued.lead.name,
        city: issued.lead.city,
        certificateId: issued.lead.certificateId,
        issuedAt: issued.issuedAt,
      }
    : {
        name: watchedName ?? "",
        city: watchedCity ?? "",
        certificateId: "RWB-UF-XXXXXXXX",
        issuedAt: previewDate,
      };

  return (
    <section
      id="join"
      className="relative scroll-mt-16 overflow-hidden bg-uf-cream py-24 text-uf-forest sm:py-32"
    >
      <img
        src={joinBg}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-multiply"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-uf-cream via-uf-cream/75 to-uf-cream"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-uf-sun/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow centered>Join the Revolution</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-6xl">
            Be a Part of the Revolution.
            <span className="mt-2 block italic text-uf-soil">
              Get Your Digital Asset in the Moment.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-600">
            Share a few details and instantly receive your personalised Urban Farmer certificate —
            yours to download, keep and share with pride.
          </p>
        </Reveal>

        <div
          ref={gridRef}
          className="mt-16 grid scroll-mt-24 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10"
        >
          <div className={`lg:col-span-5 ${issued ? "order-2 lg:order-1" : "order-1"}`}>
            <AnimatePresence mode="wait">
              {issued ? (
                <SuccessPanel
                  key="issued"
                  lead={issued.lead}
                  canvasRef={canvasRef}
                  onStartOver={startOver}
                />
              ) : (
                <JoinForm key="form" form={form} onSubmit={onSubmit} />
              )}
            </AnimatePresence>
          </div>

          <Reveal
            delay={0.1}
            className={`lg:col-span-7 ${issued ? "order-1 lg:order-2" : "order-2"}`}
          >
            <CertificateStage
              data={certificate}
              issued={!!issued}
              canvasRef={canvasRef}
              burstKey={burstKey}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function JoinForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => Promise<void>;
}) {
  const reduce = useReducedMotion() ?? false;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const consent = useWatch({ control, name: "consent" });
  const phone = register("whatsapp");

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="space-y-5 rounded-3xl border border-uf-green/10 bg-white/85 p-6 shadow-[0_30px_80px_-40px_rgba(23,61,10,0.45)] backdrop-blur-xl sm:p-8"
    >
      <div className="flex items-end justify-between gap-4">
        <p className="font-serif text-2xl font-bold text-uf-forest">Claim Your Certificate</p>
        <span className="shrink-0 text-xs text-stone-500">Takes 30 seconds</span>
      </div>

      <Field label="Full Name" htmlFor="uf-name" error={errors.name?.message}>
        <input
          id="uf-name"
          {...register("name")}
          autoComplete="name"
          placeholder="e.g. Ananya Sharma"
          aria-invalid={!!errors.name}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="WhatsApp Number" htmlFor="uf-phone" error={errors.whatsapp?.message}>
        <div className="flex">
          <span className="inline-flex items-center rounded-l-xl border border-r-0 border-stone-300 bg-uf-cream px-3 text-sm text-stone-600">
            +91
          </span>
          <input
            id="uf-phone"
            {...phone}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
              void phone.onChange(e);
            }}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="98XXXXXXXX"
            aria-invalid={!!errors.whatsapp}
            className={`${inputClass(!!errors.whatsapp)} rounded-l-none`}
          />
        </div>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City" htmlFor="uf-city" error={errors.city?.message}>
          <input
            id="uf-city"
            {...register("city")}
            autoComplete="address-level2"
            placeholder="e.g. Indore"
            aria-invalid={!!errors.city}
            className={inputClass(!!errors.city)}
          />
        </Field>
        <Field label="Email" htmlFor="uf-email" error={errors.email?.message} optional>
          <input
            id="uf-email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <Field label="What excites you most?" error={errors.interests?.message}>
        <Controller
          control={control}
          name="interests"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((option) => {
                const on = field.value.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      field.onChange(
                        on ? field.value.filter((v) => v !== option) : [...field.value, option],
                      )
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all duration-300 ${
                      on
                        ? "border-uf-green bg-uf-green/10 text-uf-forest"
                        : "border-stone-300 text-stone-600 hover:border-uf-green/50 hover:text-uf-forest"
                    }`}
                  >
                    {on && <Check size={14} />}
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-stone-600">
          <input type="checkbox" {...register("consent")} className="peer sr-only" />
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-uf-green/40 ${
              consent ? "border-uf-green bg-uf-green text-uf-cream" : "border-stone-300 bg-white"
            }`}
          >
            {consent && <Check size={14} strokeWidth={3} />}
          </span>
          I'd like Redwood Biotech to contact me on WhatsApp about becoming an Urban Farmer.
        </label>
        <FieldError message={errors.consent?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-r from-uf-green via-uf-leaf to-uf-green px-6 py-4 text-left text-uf-cream shadow-[0_20px_40px_-15px_rgba(44,94,20,0.8)] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-80"
      >
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            animate={{ x: ["-150%", "400%"] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          />
        )}
        <span className="relative">
          <span className="block font-serif text-lg font-bold leading-tight sm:text-xl">
            {isSubmitting ? "Issuing your certificate…" : "Be a Part of the Revolution"}
          </span>
          <span className="mt-0.5 block text-xs font-semibold opacity-80 sm:text-sm">
            Get your digital asset in the moment
          </span>
        </span>
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-uf-sun text-uf-forest transition-transform duration-300 group-hover:translate-x-1">
          {isSubmitting ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <ArrowRight size={20} />
          )}
        </span>
      </button>

      <p className="flex items-center gap-1.5 text-[11px] text-stone-500">
        <Lock size={12} /> Your details are used only by Redwood Biotech to get in touch with you.
      </p>
    </motion.form>
  );
}

function SuccessPanel({
  lead,
  canvasRef,
  onStartOver,
}: {
  lead: UrbanFarmerLead;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onStartOver: () => void;
}) {
  const shareUrl = `${window.location.origin}/urban-farmer`;
  const fileName = certificateFileName(lead.name);
  const encodedText = encodeURIComponent(SHARE_TEXT);
  const encodedUrl = encodeURIComponent(shareUrl);
  const whatsappShare = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${shareUrl}`)}`;

  const socials = [
    { label: "WhatsApp", Icon: MessageCircle, href: whatsappShare },
    {
      label: "LinkedIn",
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "X",
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const getBlob = () => {
    if (!canvasRef.current) throw new Error("Certificate is not ready yet");
    return canvasToBlob(canvasRef.current);
  };

  const handleShare = async () => {
    try {
      const blob = await getBlob();
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "I'm an Urban Farmer!",
          text: `${SHARE_TEXT} ${shareUrl}`,
        });
        return;
      }
      downloadBlob(blob, fileName);
      window.open(whatsappShare, "_blank", "noopener,noreferrer");
      toast.success("Certificate downloaded — attach it to your post to share it.");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      toast.error("Sharing isn't available here. Try downloading instead.");
    }
  };

  const handleDownload = async () => {
    try {
      downloadBlob(await getBlob(), fileName);
      toast.success("Certificate downloaded.");
    } catch {
      toast.error("Couldn't download the certificate. Please try again.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT} ${shareUrl}`);
      toast.success("Invite link copied — send it to someone who'd love this.");
    } catch {
      toast.error("Couldn't copy the link.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="rounded-3xl border border-uf-green/15 bg-white/85 p-6 shadow-[0_30px_80px_-40px_rgba(23,61,10,0.45)] backdrop-blur-xl sm:p-8"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-uf-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-uf-green">
        <BadgeCheck size={14} /> Certificate Issued
      </span>
      <h3 className="mt-4 font-serif text-3xl font-bold leading-tight text-uf-forest">
        Welcome aboard, {firstName(lead.name)}!
      </h3>
      <p className="mt-3 leading-relaxed text-stone-600">
        You're officially part of the Urban Farmer revolution. Share your achievement and inspire
        others to claim theirs.
      </p>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={handleShare}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-uf-green px-6 py-4 font-bold text-uf-cream shadow-[0_16px_36px_-14px_rgba(44,94,20,0.8)] transition-colors hover:bg-uf-forest"
        >
          <Share2 size={18} /> Share My Achievement
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-uf-forest transition-colors hover:border-uf-green/50 hover:bg-uf-cream"
          >
            <Download size={16} /> Download
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-uf-forest transition-colors hover:border-uf-green/50 hover:bg-uf-cream"
          >
            <Copy size={16} /> Copy Invite
          </button>
        </div>
        <div className="flex items-center justify-center gap-3 pt-1">
          {socials.map(({ label, Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 text-stone-600 transition-all hover:-translate-y-0.5 hover:border-uf-green hover:text-uf-green"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-7 rounded-2xl border border-stone-200 bg-uf-cream/70 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
          Next step
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-700">
          Send your details to our team on WhatsApp so we can plan your urban farm with you.
        </p>
        <a
          href={leadWhatsAppUrl(lead)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-500"
        >
          <Send size={16} /> Send Details on WhatsApp
        </a>
      </div>

      <button
        type="button"
        onClick={onStartOver}
        className="mt-5 text-xs text-stone-500 underline-offset-4 transition-colors hover:text-uf-forest hover:underline"
      >
        Create a certificate for someone else
      </button>
    </motion.div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-stone-600"
      >
        {label}
        {optional && (
          <span className="font-normal normal-case tracking-normal text-stone-400">Optional</span>
        )}
      </label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 text-xs text-red-600"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function inputClass(invalid: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-stone-900 outline-none transition placeholder:text-stone-400 focus:ring-4 ${
    invalid
      ? "border-red-400 focus:ring-red-400/15"
      : "border-stone-300 focus:border-uf-green focus:ring-uf-green/10"
  }`;
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? name;
}
