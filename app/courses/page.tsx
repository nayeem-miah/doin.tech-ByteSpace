import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseCard } from "@/components/ui/CourseCard";
import { FilterPill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { categoryFilters, courses } from "@/lib/data";

export const metadata: Metadata = { title: "Courses" };

export default function CoursesPage() {
  // The design shows a full three-row result grid.
  const results = [...courses, ...courses, ...courses];

  return (
    <>
      <PageHeader
        title="Search "
        subtitle="Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses."
      >
        <form className="mt-9 flex max-w-[581px] flex-col gap-3 sm:flex-row" action="#">
          <label htmlFor="search-q" className="sr-only">
            Search courses
          </label>
          <div className="relative flex-1">
            <Icon
              name="search"
              size={18}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-subtle"
            />
            <input
              id="search-q"
              name="q"
              type="search"
              placeholder="Course, topic, creator"
              className="t-body-l placeholder:text-subtle h-[52px] w-full rounded-full border border-transparent bg-white pr-4 pl-11 text-ink transition-colors duration-200 focus:border-lime focus:outline-none"
            />
          </div>
          <Button type="submit" variant="lime" size="lg">
            Search
          </Button>
        </form>
      </PageHeader>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-0 md:py-20">
          <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-3">
              {categoryFilters.slice(0, 7).map((c, i) => (
                <FilterPill key={c} active={i === 0}>
                  {c}
                </FilterPill>
              ))}
            </ul>
            <button
              type="button"
              className="press t-h-s flex shrink-0 items-center gap-2 text-ink"
            >
              <Icon name="filter" size={18} />
              Filter
            </button>
          </div>

          <p className="t-body-m mt-8 text-subtle">
            Showing {results.length} courses
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((course, i) => (
              <CourseCard key={`${course.slug}-${i}`} course={course} />
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
