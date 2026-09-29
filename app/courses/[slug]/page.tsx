import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseBody } from "@/components/course/CourseBody";
import { CourseHero } from "@/components/course/CourseHero";
import { CourseTabs } from "@/components/course/CourseTabs";
import { EnrolCard } from "@/components/course/EnrolCard";
import { courses } from "@/lib/data";

export const metadata: Metadata = { title: "Course" };

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <div className="relative">
        <CourseHero />

        {/* The enrol card straddles the band edge, anchored to the
            video preview's top row the way the design does. */}
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
            <CourseBody />
            <div />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
