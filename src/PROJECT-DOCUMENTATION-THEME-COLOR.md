# Redwood Biotech (Redwood Roots) — Project Documentation (Theme, Theory & Color System)

## 1) Project Theme Idea (What the site communicates)
Redwood Biotech’s website uses a single, unified brand narrative:

**“Science that grows wealth from real land.”**

The design theme is built around four visual pillars that repeat across pages (without needing to reference individual sections):

1. **Nature / Growth** (Agroforestry & plantations)
2. **Science / Precision** (Biotechnology & laboratory discipline)
3. **Trust / Governance** (Contracts, reporting, operational discipline)
4. **Wealth / Future Returns** (Long-term value, measurable yield, partner outcomes)

This means the UI doesn’t just show “green.” It mixes **biological imagery** (fields, lab visuals, team in-ground) with a **technically confident aesthetic** (charts/tables, structured steps, measurable outcomes). The result is a brand experience that feels like:
- a **modern agritech lab**
- wrapped in a **heritage-of-farming** tone

## 2) Visual Theory (How the UI achieves the feeling)
The interface is composed using a “two-world” theory:

### A) The Natural World (warm earth + living systems)
- **Whites / stones / off-whites** act as the “paper/soil blank” for content.
- **Greens** establish living growth and agroforestry legitimacy.
- **Amber/golden accents** evoke sunlight, timber value, and harvest.

### B) The Scientific World (controlled contrast + measurable clarity)
- Dark backgrounds use **deep green** and **near-black UI blacks** to create a “lab-grade focus.”
- Tables, steps, and data components are styled with **high contrast** so information reads with certainty.
- Rounded cards and soft borders reduce the clinical feel and keep the brand approachable.

### Design rules that show up repeatedly
- **Typography pairing:**
  - Serif headings for authority and “heritage legitimacy.”
  - Sans-serif body text for clarity and modern UX.
- **High-contrast CTAs:** Buttons use amber/gold on hero-style dark overlays and green on light backgrounds to consistently guide action.
- **Card layering:** Soft shadows and borders create separation between content “modules,” mirroring real workflows (process → evidence → return).
- **Motion + Reveal:** Content appears through subtle staged animations, reinforcing the idea of “process and measurement,” not random marketing.

## 3) Global Color System (How colors are defined)
The project uses an **OKLCH-based CSS variable system** combined with Tailwind utility classes. Base semantic tokens are declared in the project stylesheet.

### Semantic tokens (core)
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`

### Brand-specific tokens (the identity colors)
- `--brand-red: #991B1B`  (deep red / Redwood intensity)
- `--brand-green: #14532D` (primary Redwood green)
- `--brand-amber: #B45309` (harvest/gold emphasis)
- `--brand-teak: #292524` (warm dark teak/brown anchor)

### Light vs Dark mode behavior
- Light mode favors near-white backgrounds with earthy text.
- Dark mode shifts `--background` to deep, low-light neutral while keeping strong readable `--foreground`.

## 4) Palette Description (What each color “means”)
This palette is not arbitrary; each hue supports a story role.

### Redwood Green (primary living identity)
- **Hex:** `#14532D`
- **Usage purpose:** agroforestry credibility, trust, operational calm
- **Typical surfaces:** section backgrounds, icon backgrounds, emphasized headings

### Redwood Amber (value + harvest emphasis)
- **Hex:** `#B45309`
- **Usage purpose:** sun/harvest/timber value, CTA prominence, highlights
- **Typical surfaces:** primary buttons, “recommended” badges, highlight spans

### Redwood Teak (grounded warmth + premium anchor)
- **Hex:** `#292524`
- **Usage purpose:** timber warmth, premium “wood” mood, dark text grounding
- **Typical surfaces:** dark UI bases and brand depth in neutral layouts

### Redwood Red (science intensity + focus)
- **Hex:** `#991B1B`
- **Usage purpose:** attention accents (e.g., quote/label borders), brand signaling
- **Typical surfaces:** small but consistent highlights, borders, emphasis labels

### Neutral Stones (readability + agritech seriousness)
- **Greys/stone tones** (`stone-*`, `slate`-like feel) provide calm readability.
- They separate “data-like content” from the saturated brand colors.

## 5) How CTAs and UI states follow the theme
### CTA strategy
- **On hero dark overlays:** CTAs typically shift to **amber** for high-visibility contrast.
- **On light backgrounds:** CTAs shift to **green** to preserve a natural/trust feel.

### Borders & rings
- Borders use the semantic `--border` / `--ring` system.
- Ring focus uses the green/pine-like tone to maintain a consistent identity.

### Icons & data emphasis
- Icons often use brand colors (green/amber/red) to reflect “process evidence.”
- Tables use deep headers with readable body stripes to keep scientific clarity.

## 6) Typography & brand voice (theme-completing details)
- **Headings:** serif family for gravitas (authority, credibility, “investment-quality” messaging).
- **Body:** sans family for modern legibility.
- **Tone of copy:** measurable, process-driven, investment-oriented; animation supports a “guided discovery” flow.

## 7) One-page Brand Summary (single-file takeaway)
Redwood Roots is themed as **modern agritech with scientific certainty**:
- **Nature (growth/land)** is represented through green surfaces, stone neutrals, and rounded content modules.
- **Science (laboratory precision)** is represented through dark deep-green/near-black focus zones, structured steps, and high-contrast tables.
- **Value (harvest/returns)** is represented through amber/gold highlights and bold CTA patterns.
- **Brand recognition** is anchored by the consistent use of:
  - Redwood Green `#14532D`
  - Redwood Amber `#B45309`
  - Redwood Red `#991B1B`
  - Redwood Teak `#292524`

The result is a cohesive UI system where the theme and color theory reinforce the same promise: **science-managed teak agroforestry that turns land into measurable long-term wealth.**

