import { Hero } from "@/components/home/Hero";
import {
  DiscoverSection,
  FeaturedCategoriesBar,
  GrowthSection,
  LearningPathsSection,
  LogoStrip,
} from "@/components/home/Sections";
import {
  CreatorCta,
  CreatorSection,
  TestimonialsSection,
} from "@/components/home/CreatorCta";
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
        <GrowthSection stats={stats} />
        <CreatorSection />
        <CreatorCta />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
