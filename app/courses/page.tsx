import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CourseCard } from "@/components/ui/CourseCard";
import { FilterPill } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchField } from "@/components/ui/SearchField";
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
        <SearchField id="search-q" className="mt-9 max-w-[581px]" />
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
