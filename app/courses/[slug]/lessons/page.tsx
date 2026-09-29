import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseTabs } from "@/components/course/CourseTabs";
import { EnrolCard } from "@/components/course/CourseParts";
import { Badge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/icons";
import { courses, lessons } from "@/lib/data";

export const metadata: Metadata = { title: "Lessons" };

const KIND_ICON: Record<string, IconName> = {
  video: "play-circle",
  article: "align-left",
  quiz: "id-badge",
};

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <PageHeader title={course.title} />

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-0 md:py-20">
          <CourseTabs slug={slug} />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <section>
              <h2 className="t-h-l text-ink">
                Course Content
                <span className="t-body-m ml-3 font-normal text-subtle">
                  {lessons.length} lessons
                </span>
              </h2>
              <ol className="mt-6 flex flex-col gap-3">
                {lessons.map((lesson) => (
                  <li key={lesson.index}>
                    <a
                      href="#"
                      className="press flex items-center gap-4 rounded-md border border-line bg-white p-4 transition-colors duration-200 hover:border-ink"
                    >
                      <span className="t-body-s w-6 shrink-0 text-subtle">
                        {String(lesson.index).padStart(2, "0")}
                      </span>
                      <Icon
                        name={KIND_ICON[lesson.kind]}
                        size={20}
                        className="shrink-0 text-brand"
                      />
                      <span className="t-h-s flex-1 text-ink">{lesson.title}</span>
                      {lesson.free ? <Badge tone="lime">Free</Badge> : null}
                      <span className="t-body-s shrink-0 text-subtle">
                        {lesson.duration}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>

            <EnrolCard course={course} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
