import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Bug, Droplets, Leaf, Sprout, FlaskConical, Hand } from "lucide-react";
import fieldFallback from "@/assets/plantation-field.webp";
import handsFallback from "@/assets/nursery.webp";

/*
 * "Rooted in living soil": the three bio-fertilizers that feed Redwood's Sagwan, on the About page
 * before "Investing in tomorrow's growth".
 *
 * Jeevamrut, Ghanjeevamrut and earthworm compost (vermicompost), each with an animated scene of how
 * it is made, its real recipe and how it goes onto the land. The recipes follow the natural-farming
 * guidance published by ICAR, NIOS and Krishi Vigyan Kendras.
 *
 * The scenes are SVG animated in CSS (styles/biofert.css). They only play while on screen, and with
 * reduced motion they rest on a finished frame.
 */

/* Photos -------------------------------------------------------------------------------------- */

// Photos saved into src/assets as bio-soil-nutrients.(jpg|png|webp) and bio-soil-hands.(…) are used
// automatically; until then the section shows the stand-ins imported above (with captions that suit
// them, and no compost polaroid).
const PHOTOS = import.meta.glob<string>("../../assets/bio-soil-*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const ownPhoto = (name: string) =>
  Object.entries(PHOTOS).find(([path]) => path.includes(`/bio-soil-${name}.`))?.[1];
const NUTRIENTS_PHOTO = ownPhoto("nutrients");
const HANDS_PHOTO = ownPhoto("hands");

/* Content ------------------------------------------------------------------------------------- */

type Fertilizer = {
  key: "jeevamrut" | "ghan" | "vermi";
  name: string;
  native: string;
  kind: string;
  tagline: string;
  body: string;
  fact: string;
  recipe: { qty: string; what: string }[];
  steps: string[];
  use: string;
  accent: string;
};

const FERTILIZERS: Fertilizer[] = [
  {
    key: "jeevamrut",
    name: "Jeevamrut",
    native: "जीवामृत",
    kind: "Liquid microbial culture",
    tagline: "The living liquid",
    body: "A fermented brew that wakes the soil up. Fresh desi cow dung and cow urine carry beneficial microbes, jaggery and pulse flour feed them, and a handful of undisturbed farm soil adds native strains. Within two days the drum is alive and frothing, ready to go onto the land.",
    fact: "Ready in 48 hours",
    recipe: [
      { qty: "200 L", what: "water" },
      { qty: "10 kg", what: "fresh desi cow dung" },
      { qty: "5–10 L", what: "desi cow urine" },
      { qty: "2 kg", what: "jaggery" },
      { qty: "2 kg", what: "pulse flour" },
      { qty: "1 handful", what: "farm-bund soil" },
    ],
    steps: [
      "Mix everything in a drum",
      "Stir clockwise, twice a day",
      "Ferment in the shade for 48 hours",
      "Pour onto the land with irrigation water",
    ],
    use: "About 200 litres an acre, flowed in with irrigation water every 15 to 30 days, around the base of each tree.",
    accent: "#175f45",
  },
  {
    key: "ghan",
    name: "Ghanjeevamrut",
    native: "घनजीवामृत",
    kind: "Solid microbial manure",
    tagline: "Jeevamrut you can store",
    body: "The same living culture in solid form. Cow dung is kneaded with jaggery, pulse flour, farm soil and a little cow urine, spread to dry in the shade and then crumbled. The microbes rest until moisture in the soil wakes them, so it keeps for months and can be placed right where the roots are.",
    fact: "Dried in shade · keeps for months",
    recipe: [
      { qty: "100 kg", what: "desi cow dung" },
      { qty: "2 kg", what: "jaggery" },
      { qty: "2 kg", what: "pulse flour" },
      { qty: "1 handful", what: "farm soil" },
      { qty: "A little", what: "cow urine, to bind" },
    ],
    steps: [
      "Knead into a thick dough",
      "Shape into cakes",
      "Dry slowly in the shade",
      "Crumble and store in jute bags",
    ],
    use: "Mixed into every planting pit and spread in the basin around young trees, where it releases life into the root zone as the soil turns moist.",
    accent: "#b08a3e",
  },
  {
    key: "vermi",
    name: "Earthworm compost",
    native: "केंचुआ खाद · Vermicompost",
    kind: "Earthworm castings",
    tagline: "Black gold, made by earthworms",
    body: "Earthworms such as the red wiggler (Eisenia fetida) and the African nightcrawler (Eudrilus eugeniae) feed on cow dung and fallen leaves and turn them into dark, crumbly castings that smell of fresh earth. Rich in humus and plant-available nutrients, it loosens the soil and helps it hold water.",
    fact: "Ready in about two months",
    recipe: [
      { qty: "Layers of", what: "cow dung" },
      { qty: "Layers of", what: "dry leaves & crop residue" },
      { qty: "Hundreds of", what: "earthworms" },
      { qty: "Daily", what: "shade & a sprinkle of water" },
    ],
    steps: [
      "Layer dung and leaves in shaded beds",
      "Release the earthworms",
      "Sprinkle to keep the beds moist",
      "Harvest the dark castings",
    ],
    use: "Spread in each tree's basin and worked into the topsoil, building a loose, moisture-holding bed for young roots.",
    accent: "#8a3b2e",
  },
];

const BENEFITS = [
  {
    icon: Bug,
    title: "Microbes multiply",
    body: "Beneficial bacteria and fungi fill the root zone and keep working season after season.",
  },
  {
    icon: FlaskConical,
    title: "Nutrients unlocked",
    body: "Soil life turns locked-up nitrogen, phosphorus and potash into forms roots can take up.",
  },
  {
    icon: Sprout,
    title: "Roots run deeper",
    body: "Loose, crumbly, humus-rich soil lets Sagwan roots spread wide and anchor deep.",
  },
  {
    icon: Droplets,
    title: "Water stays longer",
    body: "Humus holds moisture like a sponge, carrying young trees through dry spells.",
  },
];

/* Section ------------------------------------------------------------------------------------- */

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function BioFertilizers() {
  return (
    <section className="bf relative overflow-hidden px-6 py-16 md:py-24" aria-labelledby="bf-title">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-40 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[oklch(0.55_0.09_70/0.08)] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div {...rise} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            What feeds our Sagwan
          </p>
          <h2 id="bf-title" className="mt-3 font-display text-4xl md:text-5xl">
            Rooted in <span className="italic text-gradient-gold">living soil</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Great timber starts underground. Our plantations are nourished with three time-tested
            bio-fertilizers from Indian natural farming: Jeevamrut, Ghanjeevamrut and earthworm
            compost. Each is made from simple farm ingredients, and each fills the soil with the life
            that roots depend on.
          </p>
        </motion.div>

        {/* Real soil, up close */}
        <div className="mt-16 grid gap-6 md:grid-cols-[1.35fr_1fr]">
          <PhotoReveal
            src={NUTRIENTS_PHOTO ?? fieldFallback}
            alt={
              NUTRIENTS_PHOTO
                ? "A hand lifting dark, nutrient-rich soil"
                : "Young Sagwan growing in rows of dark, tilled soil"
            }
            caption="Nitrogen, phosphorus, potash and trace minerals, made available by soil life."
            delay={0}
          />
          <PhotoReveal
            src={HANDS_PHOTO ?? handsFallback}
            alt={
              HANDS_PHOTO
                ? "Gloved hands holding rich, dark compost full of fine roots"
                : "Rows of young Sagwan saplings in a shaded nursery"
            }
            caption={
              HANDS_PHOTO
                ? "Dark, crumbly and full of roots: what healthy soil looks like."
                : "From nursery bag to field, every stage is fed naturally."
            }
            delay={0.12}
          />
        </div>

        {/* The three fertilizers */}
        <div className="mt-14 space-y-16 md:mt-16 md:space-y-20">
          {FERTILIZERS.map((f, i) => (
            <Chapter key={f.key} f={f} index={i} />
          ))}
        </div>

        {/* What it does for the trees */}
        <motion.div {...rise} transition={{ duration: 0.7 }} className="mt-16 text-center md:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Under every tree
          </p>
          <h3 className="mt-3 font-display text-3xl md:text-4xl">
            Soil that keeps <span className="italic text-gradient-gold">giving back</span>
          </h3>
        </motion.div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              {...rise}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bf-benefit group relative overflow-hidden rounded-3xl border border-border bg-card p-7"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#175f45] to-transparent opacity-50" />
              <div className="bf-benefit__icon mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#175f45]/10 text-[#175f45]">
                <b.icon className="h-6 w-6" />
              </div>
              <h4 className="font-display text-xl text-foreground">{b.title}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b.body}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Preparation as set out in natural-farming guides from ICAR, NIOS and Krishi Vigyan Kendras.
          Recipe quantities are per batch.
        </p>
      </div>
    </section>
  );
}

/* Pieces -------------------------------------------------------------------------------------- */

function PhotoReveal({
  src,
  alt,
  caption,
  delay,
}: {
  src: string;
  alt: string;
  caption: string;
  delay: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, clipPath: "inset(12% 8% 12% 8% round 24px)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bf-photo relative m-0 aspect-[4/3] overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)] md:aspect-auto md:min-h-[380px]"
    >
      <img src={src} alt={alt} loading="lazy" className="bf-photo__img h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-6 text-[15px] leading-snug text-white">
        <Leaf className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#cfe3b0]" aria-hidden />
        {caption}
      </figcaption>
    </motion.figure>
  );
}

function Chapter({ f, index }: { f: Fertilizer; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      style={{ "--bf-accent": f.accent } as CSSProperties}
      aria-labelledby={`bf-${f.key}`}
    >
      <motion.div
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={flip ? "lg:order-2" : undefined}
      >
        <Scene kind={f.key} fact={f.fact} />
      </motion.div>

      <div className={flip ? "lg:order-1" : undefined}>
        <motion.div {...rise} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-5xl leading-none text-[color:var(--bf-accent)] opacity-25">
              0{index + 1}
            </span>
            <span className="rounded-full border border-[color:var(--bf-accent)]/25 bg-[color:var(--bf-accent)]/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--bf-accent)]">
              {f.kind}
            </span>
          </div>
          <h3 id={`bf-${f.key}`} className="mt-4 font-display text-4xl text-foreground md:text-5xl">
            {f.name}
          </h3>
          <p className="mt-1 text-sm font-medium tracking-wide text-[color:var(--bf-accent)]">{f.native}</p>
          <p className="mt-4 font-display text-xl italic text-foreground/80">{f.tagline}</p>
          <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{f.body}</p>
        </motion.div>

        {/* The recipe */}
        <motion.div {...rise} transition={{ duration: 0.6, delay: 0.08 }} className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
            The recipe
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {f.recipe.map((r, i) => (
              <motion.li
                key={r.what}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[13.5px] text-muted-foreground shadow-sm"
              >
                <b className="font-semibold text-foreground">{r.qty}</b> {r.what}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* How it's made */}
        <motion.div {...rise} transition={{ duration: 0.6, delay: 0.12 }} className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">
            How it's made
          </p>
          <Steps steps={f.steps} />
        </motion.div>

        {/* How it goes onto the land */}
        <motion.div
          {...rise}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-7 flex gap-4 rounded-2xl border border-[color:var(--bf-accent)]/20 bg-[color:var(--bf-accent)]/[0.05] p-5"
        >
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[color:var(--bf-accent)]/10 text-[color:var(--bf-accent)]">
            <Hand className="h-5 w-5" aria-hidden />
          </span>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            <b className="font-semibold text-foreground">On our land: </b>
            {f.use}
          </p>
        </motion.div>
      </div>
    </article>
  );
}

/** Numbered steps joined by a line that draws in as they come into view. */
function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="relative mt-4 grid gap-3 sm:grid-cols-4 sm:gap-2">
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        className="absolute left-4 right-[calc(25%-22px)] top-4 hidden h-px origin-left bg-[color:var(--bf-accent)]/40 sm:block"
      />
      {steps.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.35 + i * 0.22 }}
          className="relative flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2"
        >
          <span className="relative z-10 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--bf-accent)] text-xs font-bold text-white shadow-[0_0_0_4px_var(--color-background)]">
            {i + 1}
          </span>
          <span className="text-[13.5px] leading-snug text-foreground/80">{s}</span>
        </motion.li>
      ))}
    </ol>
  );
}

/* Animated scenes ----------------------------------------------------------------------------- */

const SCENE_LABEL: Record<Fertilizer["key"], string> = {
  jeevamrut:
    "Illustration: farm ingredients drop into a drum of Jeevamrut, which froths and is stirred while it ferments for 48 hours, as microbes multiply.",
  ghan: "Illustration: cakes of Ghanjeevamrut dry under a shade net on a jute mat, then crumble into a jute bag for storage.",
  vermi:
    "Illustration: a cross-section of a compost bed where earthworms tunnel through leaves and cow dung, leaving dark castings, while water is sprinkled on top.",
};

function Scene({ kind, fact }: { kind: Fertilizer["key"]; fact: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  let art: ReactNode;
  if (kind === "jeevamrut") art = <JeevamrutArt />;
  else if (kind === "ghan") art = <GhanArt />;
  else art = <VermiArt />;
  return (
    <div
      ref={ref}
      className={`bf-scene bf-scene--${kind} relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elegant)]`}
      data-play={inView ? "true" : "false"}
    >
      <svg viewBox="0 0 400 300" className="block h-auto w-full" role="img" aria-label={SCENE_LABEL[kind]}>
        {art}
      </svg>
      <span className="bf-scene__fact">
        <i aria-hidden /> {fact}
      </span>
      {kind === "vermi" && HANDS_PHOTO && (
        <figure className="bf-polaroid">
          <img src={HANDS_PHOTO} alt="" loading="lazy" />
          <figcaption>Finished compost</figcaption>
        </figure>
      )}
    </div>
  );
}

function JeevamrutArt() {
  const bubbles = [
    [168, 112, 3.2],
    [184, 108, 2.4],
    [201, 114, 3.6],
    [217, 109, 2.6],
    [232, 113, 3],
    [192, 116, 2],
  ];
  const microbes = [
    [300, 78, "rod"],
    [322, 70, "dot"],
    [336, 88, "rod"],
    [308, 100, "dot"],
    [326, 108, "rod"],
    [296, 92, "dot"],
    [340, 104, "dot"],
    [316, 86, "dot"],
  ] as const;
  return (
    <>
      <defs>
        <linearGradient id="bf-j-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef3e6" />
          <stop offset="1" stopColor="#e6dcc6" />
        </linearGradient>
        <linearGradient id="bf-j-drum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d4268" />
          <stop offset="0.45" stopColor="#2f6297" />
          <stop offset="1" stopColor="#1a3b5e" />
        </linearGradient>
        <radialGradient id="bf-j-brew" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#8a7238" />
          <stop offset="1" stopColor="#5a4722" />
        </radialGradient>
        <clipPath id="bf-j-above">
          <rect x="0" y="0" width="400" height="112" />
        </clipPath>
        <clipPath id="bf-j-lens">
          <circle cx="318" cy="90" r="42" />
        </clipPath>
      </defs>
      <rect width="400" height="300" fill="url(#bf-j-bg)" />
      {/* Dappled shade */}
      <circle className="bf-dapple" cx="90" cy="40" r="60" fill="#fff8e1" opacity="0.5" />
      <circle className="bf-dapple bf-dapple--2" cx="330" cy="230" r="70" fill="#fff8e1" opacity="0.35" />
      <ellipse cx="200" cy="264" rx="112" ry="13" fill="#3b2a1a" opacity="0.16" />

      {/* Ingredients dropping in */}
      <g className="bf-drop" style={{ "--i": 0 } as CSSProperties}>
        <path d="M168 28c6-6 16-4 18 3s-4 12-11 11-12-8-7-14z" fill="#5a3b1f" />
      </g>
      <g className="bf-drop" style={{ "--i": 1 } as CSSProperties}>
        <rect x="194" y="24" width="14" height="12" rx="3" fill="#c9952f" />
      </g>
      <g className="bf-drop" style={{ "--i": 2 } as CSSProperties}>
        <path d="M222 22c4 6 7 10 7 14a7 7 0 0 1-14 0c0-4 3-8 7-14z" fill="#e3c54f" />
      </g>
      <g className="bf-drop" style={{ "--i": 3 } as CSSProperties}>
        <circle cx="184" cy="30" r="3" fill="#efe2c3" />
        <circle cx="190" cy="27" r="2.4" fill="#efe2c3" />
        <circle cx="187" cy="35" r="2.2" fill="#efe2c3" />
      </g>
      <g className="bf-drop" style={{ "--i": 4 } as CSSProperties}>
        <path d="M206 30c4-5 13-4 14 2s-5 9-10 8-8-5-4-10z" fill="#3d2a1a" />
      </g>

      {/* Drum */}
      <rect x="130" y="110" width="140" height="152" rx="18" fill="url(#bf-j-drum)" />
      <rect x="130" y="148" width="140" height="6" fill="#ffffff" opacity="0.12" />
      <rect x="130" y="214" width="140" height="6" fill="#ffffff" opacity="0.12" />
      <rect x="148" y="120" width="10" height="132" rx="5" fill="#ffffff" opacity="0.1" />
      <ellipse cx="200" cy="110" rx="70" ry="16" fill="#244d7a" />
      <ellipse cx="200" cy="112" rx="62" ry="12" fill="url(#bf-j-brew)" />
      <path
        className="bf-swirl"
        d="M156 112a44 7 0 1 1 88 0a44 7 0 1 1-88 0"
        fill="none"
        stroke="#f3e6bf"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        strokeDasharray="16 12"
      />
      {/* Froth */}
      <g fill="#d9c995" opacity="0.85">
        <ellipse cx="176" cy="113" rx="7" ry="2.4" />
        <ellipse cx="222" cy="110" rx="9" ry="2.6" />
        <ellipse cx="203" cy="116" rx="6" ry="2" />
      </g>
      {/* Stirring stick */}
      <g clipPath="url(#bf-j-above)">
        <g className="bf-stir">
          <line x1="226" y1="30" x2="205" y2="124" stroke="#8b5e34" strokeWidth="7" strokeLinecap="round" />
          <line x1="226" y1="30" x2="205" y2="124" stroke="#b07a48" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      {/* Bubbles */}
      {bubbles.map(([x, y, r], i) => (
        <circle
          key={i}
          className="bf-bubble"
          cx={x}
          cy={y}
          r={r}
          fill="none"
          stroke="#f1e6c4"
          strokeWidth="1.2"
          style={{ "--i": i } as CSSProperties}
        />
      ))}

      {/* Fermentation timer */}
      <g transform="translate(78 92)">
        <circle r="30" fill="#fffdf6" />
        <circle r="26" fill="none" stroke="#3b2a1a" strokeOpacity="0.12" strokeWidth="5" />
        <circle
          className="bf-timer"
          r="26"
          fill="none"
          stroke="#175f45"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={1}
          transform="rotate(-90)"
        />
        <text y="5" textAnchor="middle" className="bf-svg-num">
          48h
        </text>
        <text y="48" textAnchor="middle" className="bf-svg-label">
          ferment
        </text>
      </g>

      {/* Microbes, magnified */}
      <line x1="280" y1="104" x2="240" y2="112" stroke="#b08a3e" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="318" cy="90" r="45" fill="#fffdf6" stroke="#b08a3e" strokeWidth="3" />
      <line x1="350" y1="122" x2="372" y2="146" stroke="#b08a3e" strokeWidth="8" strokeLinecap="round" />
      <g clipPath="url(#bf-j-lens)">
        <circle cx="318" cy="90" r="42" fill="#f4efd9" />
        {microbes.map(([x, y, shape], i) =>
          shape === "rod" ? (
            <rect
              key={i}
              className="bf-microbe"
              x={x - 6}
              y={y - 2.5}
              width="12"
              height="5"
              rx="2.5"
              fill="#3f8a4f"
              transform={`rotate(${i * 37} ${x} ${y})`}
              style={{ "--i": i } as CSSProperties}
            />
          ) : (
            <circle
              key={i}
              className="bf-microbe"
              cx={x}
              cy={y}
              r="3.4"
              fill="#c08a2e"
              style={{ "--i": i } as CSSProperties}
            />
          ),
        )}
      </g>
      <text x="318" y="166" textAnchor="middle" className="bf-svg-label">
        microbes
      </text>
    </>
  );
}

function GhanArt() {
  const cakes = [
    [92, 206],
    [148, 214],
    [204, 206],
    [260, 214],
  ];
  return (
    <>
      <defs>
        <linearGradient id="bf-g-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6efdf" />
          <stop offset="1" stopColor="#eadbbd" />
        </linearGradient>
        <pattern id="bf-g-net" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#2f6b3a" />
          <rect width="2" height="8" fill="#ffffff" opacity="0.14" />
        </pattern>
        <pattern id="bf-g-jute" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#c9a36b" />
          <path d="M0 3h6M3 0v6" stroke="#a9834d" strokeWidth="1" />
        </pattern>
        <linearGradient id="bf-g-rays" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6d8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff6d8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bf-g-bg)" />
      {/* Light through the shade net */}
      <polygon className="bf-ray" points="70,44 110,44 150,250 60,250" fill="url(#bf-g-rays)" />
      <polygon className="bf-ray bf-ray--2" points="200,44 236,44 290,250 196,250" fill="url(#bf-g-rays)" />
      {/* Shade net and poles */}
      <line x1="34" y1="40" x2="34" y2="246" stroke="#8b5e34" strokeWidth="6" strokeLinecap="round" />
      <line x1="366" y1="40" x2="366" y2="246" stroke="#8b5e34" strokeWidth="6" strokeLinecap="round" />
      <path d="M24 30 Q200 54 376 30 L376 50 Q200 72 24 50 Z" fill="url(#bf-g-net)" />
      <text x="200" y="88" textAnchor="middle" className="bf-svg-label">
        drying slowly in the shade
      </text>

      {/* Jute mat */}
      <path d="M40 222 L320 222 L336 252 L26 252 Z" fill="url(#bf-g-jute)" />
      <path d="M26 252 L336 252 L336 258 L26 258 Z" fill="#9c7644" />

      {/* Heat shimmer */}
      {[110, 176, 238].map((x, i) => (
        <path
          key={x}
          className="bf-shimmer"
          d={`M${x} 190 q6 -8 0 -16 q-6 -8 0 -16 q6 -8 0 -16`}
          fill="none"
          stroke="#c79a5a"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ "--i": i } as CSSProperties}
        />
      ))}

      {/* Cakes, wet → dry, with cracks */}
      {cakes.map(([x, y], i) => (
        <g key={i} className="bf-cake" style={{ "--i": i } as CSSProperties}>
          <ellipse cx={x} cy={y + 5} rx="27" ry="10" className="bf-cake__side" />
          <ellipse cx={x} cy={y} rx="27" ry="10" className="bf-cake__top" />
          <path
            className="bf-crack"
            d={`M${x - 14} ${y - 1} l7 2 l5 -3 l6 3 l8 -1`}
            pathLength={1}
            fill="none"
            stroke="#5e4326"
            strokeWidth="1.1"
          />
          <circle className="bf-spark" cx={x + 9} cy={y - 3} r="1.6" fill="#fff3c4" />
        </g>
      ))}

      {/* Crumbs hopping into the jute bag */}
      {[0, 1, 2].map((i) => (
        <circle key={i} className="bf-crumb" cx="282" cy="206" r="3" fill="#8a6a45" style={{ "--i": i } as CSSProperties} />
      ))}
      <g>
        <path d="M318 168 q-8 0 -10 16 l-6 64 q0 8 10 8 h40 q10 0 10 -8 l-6 -64 q-2 -16 -10 -16 z" fill="#b8925a" />
        <path d="M318 168 q-8 0 -10 16 l-6 64 q0 8 10 8 h40 q10 0 10 -8 l-6 -64 q-2 -16 -10 -16 z" fill="url(#bf-g-jute)" opacity="0.45" />
        <ellipse cx="333" cy="170" rx="17" ry="5" fill="#6b4a2b" />
        <path d="M318 176 q15 6 30 0" fill="none" stroke="#7a5a30" strokeWidth="3" />
        <rect x="314" y="208" width="38" height="18" rx="3" fill="#f6efdf" />
        <text x="333" y="221" textAnchor="middle" className="bf-svg-tag">
          STORE
        </text>
      </g>
    </>
  );
}

function VermiArt() {
  const worms = [
    { d: "M-20 150 C40 130 70 175 120 160 S200 120 250 150 S340 190 420 165", dur: 11, delay: 0 },
    { d: "M420 210 C360 225 320 195 270 210 S180 245 130 220 S50 200 -20 225", dur: 13, delay: -4 },
    { d: "M60 300 C80 250 120 240 150 200 S200 130 230 110", dur: 9, delay: -2 },
  ];
  const leaves = [
    [52, 92, 20, "#b9873b"],
    [96, 98, -30, "#6f8f3a"],
    [140, 90, 60, "#a65f2a"],
    [190, 96, -10, "#c9a24a"],
    [236, 90, 35, "#7d9a3e"],
    [282, 97, -45, "#b9873b"],
    [326, 91, 15, "#a65f2a"],
    [356, 99, -20, "#6f8f3a"],
  ] as const;
  const castings = [
    [70, 262],
    [96, 270],
    [128, 258],
    [160, 268],
    [196, 262],
    [232, 270],
    [266, 260],
    [298, 268],
    [330, 262],
    [112, 248],
    [214, 250],
    [312, 250],
  ];
  return (
    <>
      <defs>
        <linearGradient id="bf-v-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6a3a" />
          <stop offset="0.2" stopColor="#6b4a2b" />
          <stop offset="0.55" stopColor="#4a3220" />
          <stop offset="1" stopColor="#21160d" />
        </linearGradient>
        <pattern id="bf-v-grain" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="0.9" fill="#ffffff" opacity="0.08" />
          <circle cx="7" cy="8" r="0.7" fill="#000000" opacity="0.18" />
        </pattern>
        <linearGradient id="bf-v-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef3e6" />
          <stop offset="1" stopColor="#e2e9d4" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#bf-v-sky)" />
      {/* Watering rose and drops */}
      <g transform="translate(236 6)">
        <rect x="0" y="10" width="100" height="10" rx="5" fill="#175f45" />
        <rect x="88" y="0" width="12" height="20" rx="4" fill="#175f45" />
        {[10, 26, 42, 58, 74].map((x, i) => (
          <path
            key={x}
            className="bf-rain"
            d={`M${x} 26 c2 4 3 6 3 8 a3 3 0 0 1 -6 0 c0 -2 1 -4 3 -8z`}
            fill="#7fb4d9"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </g>
      {/* The bed, in cross-section */}
      <rect x="0" y="80" width="400" height="220" fill="url(#bf-v-soil)" />
      <rect x="0" y="80" width="400" height="220" fill="url(#bf-v-grain)" />
      <text x="12" y="122" className="bf-svg-layer">
        leaves
      </text>
      <text x="12" y="178" className="bf-svg-layer">
        cow dung
      </text>
      <text x="12" y="244" className="bf-svg-layer">
        castings
      </text>
      {/* Leaf litter */}
      {leaves.map(([x, y, a, c], i) => (
        <ellipse key={i} cx={x} cy={y} rx="16" ry="6" fill={c} transform={`rotate(${a} ${x} ${y})`} />
      ))}
      {/* Tunnels and the worms travelling them */}
      {worms.map((w, i) => (
        <g key={i}>
          <path d={w.d} fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="10" strokeLinecap="round" />
          <path
            className="bf-worm"
            d={w.d}
            fill="none"
            stroke="#c85a62"
            strokeWidth="7"
            strokeLinecap="round"
            pathLength={100}
            style={{ "--dur": `${w.dur}s`, "--delay": `${w.delay}s` } as CSSProperties}
          />
          <path
            className="bf-worm bf-worm--shine"
            d={w.d}
            fill="none"
            stroke="#f0a3a6"
            strokeWidth="2.2"
            strokeLinecap="round"
            pathLength={100}
            style={{ "--dur": `${w.dur}s`, "--delay": `${w.delay}s` } as CSSProperties}
          />
        </g>
      ))}
      {/* Castings left behind */}
      {castings.map(([x, y], i) => (
        <ellipse
          key={i}
          className="bf-casting"
          cx={x}
          cy={y}
          rx="4"
          ry="2.8"
          fill="#120b06"
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </>
  );
}
