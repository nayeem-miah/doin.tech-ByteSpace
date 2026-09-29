import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseTabs } from "@/components/course/CourseTabs";
import { EnrolCard } from "@/components/course/EnrolCard";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/icons";
import { courses, reviews } from "@/lib/data";

export const metadata: Metadata = { title: "Reviews" };

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const average = 4.5;

  return (
    <>
      <PageHeader title={course.title} />

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-0 md:py-20">
          <CourseTabs slug={slug} />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <section>
              {/* Summary */}
              <div className="flex flex-wrap items-center gap-8 rounded-lg border border-line bg-white p-7">
                <div>
                  <p className="t-display-lg text-ink">{average.toFixed(1)}</p>
                  <ul className="mt-2 flex gap-1" aria-label={`${average} out of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <li key={i}>
                        <Icon
                          name="star-lime"
                          size={18}
                          className={
                            i < Math.round(average) ? "text-lime" : "text-line"
                          }
                        />
                      </li>
                    ))}
                  </ul>
                  <p className="t-body-s mt-2 text-subtle">
                    {course.reviews} reviews
                  </p>
                </div>
                <Buttonless />
              </div>

              {/* Review list */}
              <ul className="mt-10 flex flex-col gap-6">
                {reviews.map((review) => (
                  <li
                    key={review.name}
                    className="rounded-lg border border-line bg-white p-7"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={review.avatar}
                        size={52}
                        alt={review.name}
                      />
                      <div className="flex-1">
                        <p className="t-display-xs text-ink">{review.name}</p>
                        <p className="t-body-m text-brand">{review.role}</p>
                      </div>
                      <time className="t-body-s text-subtle">
                        {review.date}
                      </time>
                    </div>
                    <ul className="mt-4 flex gap-1" aria-label={`${review.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <li key={i}>
                          <Icon
                            name="star-lime"
                            size={16}
                            className={
                              i < review.rating ? "text-lime" : "text-line"
                            }
                          />
                        </li>
                      ))}
                    </ul>
                    <p className="t-body-l mt-4 text-body">{review.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <EnrolCard />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/** Placeholder kept separate so the summary block reads top-down. */
function Buttonless() {
  return (
    <div className="flex-1" aria-hidden="true">
      <p className="t-h-m text-ink">59 Comments</p>
      <p className="t-body-m mt-1 text-body">
        Learners are finding this course well paced and practical.
      </p>
    </div>
  );
}
