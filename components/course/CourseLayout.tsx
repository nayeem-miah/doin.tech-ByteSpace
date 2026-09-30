import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseHero } from "./CourseHero";
import { CourseTabs } from "./CourseTabs";
import { EnrolCard } from "./EnrolCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Shared shell for the three course tabs.
 *
 * Each tab repeats the same blue band, the enrol card straddling the band
 * edge, and the tab switcher; only the body below the tabs differs. The
 * card is anchored with a negative margin rather than being pulled up
 * with transforms, so it still occupies its own space in the flow and the
 * body beneath it clears it naturally.
 */
export function CourseLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="relative">
        <CourseHero />

        <div className="relative mx-auto max-w-[1200px] px-5 md:px-0 lg:-mt-[420px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_412px] lg:gap-10">
            <div />
            <EnrolCard />
          </div>
        </div>
      </div>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-20 md:px-0 md:pt-16 md:pb-28">
          <Reveal from="fade">
            <CourseTabs slug={slug} />
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_412px] lg:gap-10">
            <Reveal from="up" delay={90}>
              {children}
            </Reveal>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
