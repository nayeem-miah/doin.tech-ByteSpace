import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseHero } from "./CourseHero";
import { CourseTabs } from "./CourseTabs";
import { EnrolCard } from "./EnrolCard";

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

        <div className="relative mx-auto -mt-[420px] max-w-[1200px] px-5 md:px-0">
          <div className="grid gap-8 lg:grid-cols-[1fr_412px] lg:gap-10">
            <div />
            <EnrolCard />
          </div>
        </div>
      </div>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-20 md:px-0 md:pt-16 md:pb-28">
          <CourseTabs slug={slug} />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_412px] lg:gap-10">
            {children}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
