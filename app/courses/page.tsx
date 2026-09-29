import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CourseCard } from "@/components/ui/CourseCard";
import { Icon, type IconName } from "@/components/ui/icons";
import { Pagination } from "@/components/ui/Pagination";
import { SearchField } from "@/components/ui/SearchField";
import { categoryFilters, courses } from "@/lib/data";

export const metadata: Metadata = { title: "Courses" };

/** The three dropdown filters in the design, with their own icons. */
const FILTERS: { label: string; icon: IconName }[] = [
  { label: "Filter", icon: "filter" },
  { label: "Level", icon: "chart-bar" },
  { label: "Category", icon: "shapes" },
];

/** The design shows six rows of three. */
const RESULTS = [...courses, ...courses, ...courses];

export default function CoursesPage() {
  return (
    <>
      {/* Blue band: heading, search, and the 120px grid printed over it. */}
      <section className="relative overflow-hidden bg-brand text-on-dark">
        <SiteHeader />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        <div className="relative mx-auto max-w-[624px] px-5 pt-10 pb-14 text-center md:px-0 md:pt-14">
          <h1 className="t-display-md text-on-dark">Find Your Next Course</h1>
          <SearchField id="course-search" className="mt-6" />
        </div>
      </section>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-0 md:py-16">
          {/* Filters left, sort right */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-3">
              {FILTERS.map((f) => (
                <li key={f.label}>
                  <button
                    type="button"
                    className="press t-body-l flex h-12 items-center gap-2 rounded-full bg-white px-5 text-muted transition-colors duration-200 hover:text-ink"
                  >
                    <Icon name={f.icon} size={20} className="text-ink" />
                    {f.label}
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="press t-body-l flex h-12 shrink-0 items-center gap-2 self-start rounded-full px-2 text-muted transition-colors duration-200 hover:text-ink sm:self-auto"
            >
              <Icon name="align-left" size={18} className="text-ink" />
              Most relevant
            </button>
          </div>

          {/* Category pills: a single row in this frame, unlike the home page. */}
          <ul className="mt-6 flex flex-wrap justify-center gap-4">
            {categoryFilters.slice(0, 8).map((c, i) => (
              <li key={c}>
                <span
                  className={[
                    "t-body-l block rounded-full px-4 py-3 font-medium",
                    i === 0 ? "bg-lime text-ink" : "bg-surface text-muted",
                  ].join(" ")}
                >
                  {c}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid auto-rows-[384px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {RESULTS.map((course, i) => (
              <CourseCard
                key={`${course.slug}-${i}`}
                course={course}
                priority={i < 3}
              />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Pagination />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
