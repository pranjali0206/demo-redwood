/**
 * Copy and placeholders for the homepage sections after the story (CTA → Footer), in one place.
 *
 * Anything in [square brackets] is a placeholder or a fact Redwood must supply or confirm before
 * launch. It stays visible on the page until it is replaced. Never fill it with invented facts,
 * numbers or testimonials.
 */
import site1 from "@/assets/gallery-photo-1.webp";
import site2 from "@/assets/gallery-photo-2.webp";
import site3 from "@/assets/gallery-photo-3.webp";
import site4 from "@/assets/gallery-photo-4.webp";
import droneMp4 from "@/assets/drone-site.mp4";
import dronePoster from "@/assets/drone-site-poster.webp";
import irrigationImg from "@/assets/manage-irrigation.webp";
import securityImg from "@/assets/manage-security.webp";
import careImg from "@/assets/manage-care.webp";
import saleImg from "@/assets/manage-sale.webp";
import ufCityImg from "@/assets/uf-city.webp";
import ufFarmImg from "@/assets/uf-farm.webp";
import labImg from "@/assets/biotech-lab.webp";

/* Contact ------------------------------------------------------------------------------------ */

export const CONTACT = {
  /** [WhatsApp number]: country code + number, digits only, e.g. 91XXXXXXXXXX. */
  whatsapp: "91XXXXXXXXXX",
  /** [Phone]: shown as text; set `phoneHref` (e.g. "tel:+91XXXXXXXXXX") when supplied. */
  phone: "[Phone]",
  phoneHref: "",
  /** [Email]: shown as text; set `emailHref` (e.g. "mailto:…") when supplied. */
  email: "[Email]",
  emailHref: "",
  address:
    "260, Anurag Villa, 52 Bigha, Opposite Ocean Motors, Limbodi, Khandwa Road, Indore, Madhya Pradesh",
};

export const WHATSAPP_TEXT = "Hi Redwood, I'd like to book a site visit.";
export const whatsappHref = () =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

/**
 * [Lead endpoint / CRM]: set VITE_LEAD_ENDPOINT. Leads are POSTed there as JSON. Until it is
 * set, development builds simulate a successful submission and production builds show the
 * error state (so no lead is ever silently lost).
 */
export const LEAD_ENDPOINT = (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) || "";

/* CTA form ----------------------------------------------------------------------------------- */

export const BUDGETS = [
  { value: "", label: "Select a range" },
  { value: "under-a", label: "Under ₹[A] lakh" },
  { value: "a-b", label: "₹[A]–[B] lakh" },
  { value: "b-c", label: "₹[B]–[C] lakh" },
  { value: "above-c", label: "Above ₹[C] lakh" },
] as const;

export const CONTACT_TIMES = [
  { value: "morning", label: "Morning", hint: "9am–12pm", phrase: "in the morning" },
  { value: "afternoon", label: "Afternoon", hint: "12–4pm", phrase: "in the afternoon" },
  { value: "evening", label: "Evening", hint: "4–8pm", phrase: "in the evening" },
  { value: "any", label: "Any time", hint: "", phrase: "soon" },
] as const;
export type ContactTime = (typeof CONTACT_TIMES)[number]["value"];

/** The privacy line under the submit button. [Confirm with Redwood before launch.] */
export const PRIVACY_NOTE = "We'll only use your details to arrange your visit.";

/* Why Biotech Teak --------------------------------------------------------------------------- */

/** Every fact here must be confirmed by Redwood before launch. */
export const COMPARISON = [
  {
    point: "Planting material",
    normal: "Seeds or stumps from mixed sources",
    redwood: "Lab-grown clones of [selected mother trees]",
  },
  {
    point: "Uniformity",
    normal: "Trees grow unevenly",
    redwood: "Plants are alike, so growth is even",
  },
  {
    point: "Health at planting",
    normal: "Can carry pests or disease",
    redwood: "[Lab-screened, disease-free at planting]",
  },
  { point: "Trunk", normal: "Varies", redwood: "[Straight, tall trunks]" },
  { point: "Harvest cycle", normal: "[X] years", redwood: "[Y] years under Redwood care" },
];

/* You Own. We Manage. ------------------------------------------------------------------------ */

export const SERVICES = [
  {
    icon: "drop",
    photo: irrigationImg,
    alt: "Drip irrigation line watering a row of young plants",
    title: "Irrigation",
    body: "Drip irrigation and regular watering through every season.",
    note: "[confirm system]",
  },
  {
    icon: "shield",
    photo: securityImg,
    alt: "Barbed-wire boundary fence along a field",
    title: "Security",
    body: "Fencing and on-site care, so your land and trees are safe.",
    note: "[confirm: fencing, guards, CCTV]",
  },
  {
    icon: "leaf",
    photo: careImg,
    alt: "Hands pruning a young branch with secateurs",
    title: "Care",
    body: "Fertiliser, pruning and pest control by our farm team.",
    note: "",
  },
  {
    icon: "logs",
    photo: saleImg,
    alt: "Stacks of harvested timber logs beside a plantation",
    title: "Sale",
    body: "At harvest, we cut, sell the timber and pay you your share.",
    note: "[confirm share terms]",
  },
] as const;

export const YOUR_PART = "[visit any time · get regular updates]";

/* See It for Yourself ------------------------------------------------------------------------ */

/** [Drone video]: H.264 MP4 + WebM loop, ≤ 8 MB, and a poster frame. Empty until supplied. */
export const DRONE_VIDEO = { mp4: droneMp4, webm: "", poster: dronePoster, ratio: "16 / 9" };
export const DRONE_CAPTION = "Drone view — [Site name], [District], [Month Year]";
/** [Full video URL]: the "Watch full video" button appears once this is set. */
export const FULL_VIDEO_URL = "";

export const SITE_PHOTOS: { src: string; alt: string; caption: string }[] = [
  {
    src: site1,
    alt: "Aerial view of a Redwood site cleared and marked out for planting",
    caption: "[Site name] · Year [N] trees · [Month Year]",
  },
  {
    src: site2,
    alt: "An excavator digging planting pits in rows across the prepared field",
    caption: "[Site name] · Year [N] trees · [Month Year]",
  },
  {
    src: site3,
    alt: "Young teak plants growing under shade netting in the nursery",
    caption: "[Site name] · Year [N] trees · [Month Year]",
  },
  {
    src: site4,
    alt: "Rows of young teak with drip irrigation lines along each row",
    caption: "[Site name] · Year [N] trees · [Month Year]",
  },
  { src: "", alt: "", caption: "[Site photo — Redwood plantation]" },
  { src: "", alt: "", caption: "[Site photo — Redwood plantation]" },
];

/* Built on Trust ----------------------------------------------------------------------------- */

export const TEAM = Array.from({ length: 4 }, () => ({
  name: "[Name]",
  role: "[Role]",
  line: "[One line]",
  photo: "",
}));

/** [Redwood to confirm steps and timelines] */
export const REGISTRY_STEPS = [
  "Choose your plot",
  "Visit the site",
  "Sign the agreement",
  "Registry in your name",
  "We start planting",
];

export const LAB = {
  title: "The Redwood Lab",
  /** The site already says a new laboratory is coming to Indore; the rest is a placeholder. */
  line: "A new Redwood laboratory is coming to Indore. [One line on the tissue-culture lab and when it opens]",
  photo: labImg,
  alt: "Inside the Redwood biotech laboratory",
};

/* Urban Farmer images */
export const UF_CITY_IMG = { src: ufCityImg, alt: "A city workspace with high-rise buildings outside the window" };
export const UF_FARM_IMG = { src: ufFarmImg, alt: "A person walking through a forest plantation at sunset" };

/* Urban Farmer ------------------------------------------------------------------------------- */

export const URBAN_POINTS = [
  "Own farmland without leaving your job",
  "Updates from your plot, wherever you are [confirm format]",
  "Visit with family whenever you like",
];

/* FAQ ---------------------------------------------------------------------------------------- */

const ANSWER = "[Answer to be supplied by Redwood]";
export const FAQ = [
  "Is the land registered in my name?",
  "What exactly do I get at harvest?",
  "What happens to the land after 12 years?",
  "Who looks after the trees?",
  "What is tissue-culture teak?",
  "Can I visit my plot?",
  "What is the minimum investment?",
  "What if I want to sell before 12 years?",
  "Where are Redwood's sites?",
  "Is there a maintenance fee?",
].map((q) => ({ q, a: ANSWER }));

/* Footer ------------------------------------------------------------------------------------- */

export const LOCATIONS = ["[Site names]"];
export const LEGAL_DISCLAIMER =
  "[Legal disclaimer on returns and risk — text from Redwood's advisor]";

/** True once a value no longer contains a [placeholder]. */
export const isFilled = (s: string) => !!s && !/\[[^\]]+\]/.test(s);
