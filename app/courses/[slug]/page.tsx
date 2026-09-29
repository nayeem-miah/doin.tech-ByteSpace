import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseTabs } from "@/components/course/CourseTabs";
import { CourseHero, EnrolCard } from "@/components/course/CourseParts";
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
      <PageHeader title="Course Details" />

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-0 md:py-20">
          <CourseTabs slug={slug} />

          <div className="mt-12">
            <CourseHero course={course} />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div className="flex flex-col gap-10">
              <section>
                <h2 className="t-h-l text-ink">Description</h2>
                <p className="t-body-l mt-4 text-body">
                  This course provides a comprehensive introduction to the
                  subject, walking through the fundamentals before building up to
                  more advanced techniques. Each module combines concise written
                  material with hands-on practice so you can apply each idea
                  straight away.
                </p>
              </section>
            </div>
            <EnrolCard course={course} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
