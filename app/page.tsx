import { Hero } from "@/components/home/Hero";
import {
  DiscoverSection,
  FeaturedCategoriesBar,
  FeatureBand,
  LearningPathsSection,
  LogoStrip,
} from "@/components/home/Sections";
import { CreatorCta, TestimonialsSection } from "@/components/home/CreatorCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { stats } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <main>
        <DiscoverSection />
        <LearningPathsSection />
        <FeaturedCategoriesBar />
        <FeatureBand stats={stats} />
        <CreatorCta />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
