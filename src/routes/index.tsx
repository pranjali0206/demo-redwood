import { createFileRoute } from "@tanstack/react-router";
import { TriangleSection } from "@/components/triangle/TriangleSection";
import { TRIANGLE_FONTS } from "@/components/triangle/constants";
import { CitySection } from "@/components/city/CitySection";
import { SiteLayout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { BookSection } from "@/components/home/Book";
import { BiotechTeak } from "@/components/home/BiotechTeak";
import { WeManage } from "@/components/home/WeManage";
import { SeeIt } from "@/components/home/SeeIt";
import { LabSection } from "@/components/home/Trust";
import { UrbanFarmerSection } from "@/components/home/UrbanFarmerSection";
import { RepeatCta } from "@/components/home/Faq";
import { UrbanFarmerFaq } from "@/components/home/UrbanFarmerFaq";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redwood Biotech — Genetically Engineered Sagwan Teak Plantation, Indore" },
      {
        name: "description",
        content:
          "Partner your land with Redwood Biotech. 12-year managed Genitically Engineered Hi-Tech Sagwan teak plantation using tissue culture biotechnology. 75% yield to landowners. Based in Indore, MP.",
      },
      {
        property: "og:title",
        content: "Redwood Biotech — Innovative Science. Wealthier Tomorrow.",
      },
      {
        property: "og:description",
        content: "Genetically Engineered teak plantation, grown on your land, managed by science.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: TRIANGLE_FONTS },
    ],
  }),
  component: Home,
});

/**
 * Story (Hero, Triangle, City) → opportunity (book) → mind (biotech teak, we manage) → proof
 * (see it, lab) → identity (urban farmer) → booking again → footer.
 * The earlier sections (Agroforestry, CombinedSection, Process, About, gallery preview, contact)
 * are no longer on the home page; their components are unchanged in components/site.
 */
function Home() {
  return (
    <SiteLayout transparentNav heroTone="light">
      <Hero />
      <TriangleSection />
      <CitySection />
      <BookSection />
      <BiotechTeak />
      <WeManage />
      <SeeIt />
      <LabSection />
      <UrbanFarmerSection />
      <UrbanFarmerFaq />
      <RepeatCta />

    </SiteLayout>
  );
}
