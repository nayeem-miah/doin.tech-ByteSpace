"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/lib/types";
import { CourseCard } from "./CourseCard";
import { Reveal } from "./Reveal";

/**
 * Category filter row plus the course grid it filters.
 *
 * The row is one client boundary because the selected pill is state. It
 * owns the grid so the two can never drift out of sync, and the visible
 * courses are derived rather than stored.
 */
export function FilterableCourseGrid({
  filters,
  courses,
  moreLabel = "+ More",
}: {
  filters: readonly string[];
  courses: Course[];
  moreLabel?: string;
}) {
  const [active, setActive] = useState<string>(filters[0] ?? "");

  const visible = useMemo(
    () =>
      active === "Featured"
        ? courses
        : courses.filter((c) => c.tags.includes(active)),
    [active, courses],
  );

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-4">
        {filters.map((f) => {
          const isActive = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              className={[
                "press t-body-l shrink-0 rounded-full px-4 py-3 font-medium",
                isActive
                  ? "bg-lime text-ink"
                  : "bg-surface text-muted hover:text-ink",
              ].join(" ")}
            >
              {f}
            </button>
          );
        })}
        <a
          href="#"
          className="press t-body-l shrink-0 px-4 py-3 font-medium text-brand transition-colors hover:text-brand-deep"
        >
          {moreLabel}
        </a>
      </div>

      {visible.length > 0 ? (
        /* 40px gap and a 384px row height: 1200 - 2*40 = 1120, /3 = 373px
           wide, which is exactly the card in the Figma grid. */
        <ul className="mt-12 grid auto-rows-[384px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course, i) => (
            <Reveal
              as="li"
              key={course.slug}
              delay={i * 60}
              className="flex"
            >
              <CourseCard course={course} priority={i < 3} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="t-body-l mt-12 text-subtle">
          No courses in {active} yet.
        </p>
      )}
    </>
  );
}
