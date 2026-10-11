import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { UrbanHero } from "@/components/urban-farmer/UrbanHero";
import { FeelStory } from "@/components/urban-farmer/FeelStory";
import { ModelSteps } from "@/components/urban-farmer/ModelSteps";
import { FarmGetaway } from "@/components/urban-farmer/FarmGetaway";
import { JoinRevolution } from "@/components/urban-farmer/JoinRevolution";

const DESCRIPTION =
  "Farming is no longer restricted to rurals. Own registered land, grow Genetically Engineered Hi-Tech Sagwan managed by Redwood Biotech, enjoy your own farm getaway — and get your Urban Farmer digital certificate.";

export const Route = createFileRoute("/urban-farmer")({
  head: () => ({
    meta: [
      { title: "Become an Urban Farmer — Redwood Biotech" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Become an Urban Farmer with Redwood Biotech" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/urban-farmer" }],
  }),
  component: UrbanFarmerPage,
});

function UrbanFarmerPage() {
  return (
    <SiteLayout transparentNav heroTone="light">
      <ScrollProgress />
      <UrbanHero />
      <FeelStory />
      <ModelSteps />
      <FarmGetaway />
      <JoinRevolution />
    </SiteLayout>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-uf-sun via-uf-soil to-uf-leaf"
      style={{ scaleX }}
    />
  );
}
