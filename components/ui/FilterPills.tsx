"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/lib/types";
import { CourseCard } from "./CourseCard";
import { Reveal } from "./Reveal";

/**
 * Category filter rows plus the course grid they filter.
 *
 * One client boundary because the selected pill is state. It owns the
 * grid so the two can never drift out of sync, and the visible courses
 * are derived rather than stored.
 *
 * The design sets the pills in three fixed, independently centred rows
 * (1086 / 952 / 622px wide in a 1440 frame) rather than one wrapping
 * list, so the grouping is passed in as `rows`. Each row centres
 * itself, which is what keeps rows two and three centred instead of
 * trailing off to the left under the long first row.
 */
export function FilterableCourseGrid({
  rows = [],
  courses,
  moreLabel = "+ More",
}: {
  rows?: readonly (readonly string[])[];
  courses: Course[];
  moreLabel?: string;
}) {
  // Flattened once so the component does not care whether the caller
  // passed the three designed rows or a single flat list.
  const allLabels = rows.flat();

  const [selected, setSelected] = useState<string>("");

  // Fall back to the first filter if nothing is selected, or if the
  // available filters changed and the old pick is no longer offered.
  const active = allLabels.includes(selected) ? selected : allLabels[0] ?? "";

  const visible = useMemo(
    () =>
      active === "Featured"
        ? courses
        : courses.filter((c) => c.tags.includes(active)),
    [active, courses],
  );

  return (
    <>
      <div className="mt-10 flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <ul
            key={rowIndex}
            className={[
              // Mobile: one swipeable strip, edge to edge, no scrollbar.
              "no-scrollbar -mx-5 snap-x snap-mandatory overflow-x-auto px-5",
              // sm and up: the designed wrap, centred.
              "sm:mx-0 sm:snap-none sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0",
              "flex gap-4",
            ].join(" ")}
          >
            {row.map((label) => {
              const isActive = label === active;
              return (
                <li key={label} className="snap-start shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelected(label)}
                    aria-pressed={isActive}
                    className={[
                      "press t-body-l shrink-0 rounded-full px-4 py-3 font-medium",
                      isActive
                        ? "bg-lime text-ink"
                        : "bg-surface text-muted hover:text-ink",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
            {rowIndex === rows.length - 1 ? (
              <li className="snap-start shrink-0">
                <a
                  href="#"
                  className="press t-body-l block shrink-0 px-4 py-3 font-medium text-brand transition-colors hover:text-brand-deep"
                >
                  {moreLabel}
                </a>
              </li>
            ) : null}
          </ul>
        ))}
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
        <p className="t-body-l mt-12 text-center text-subtle">
          No courses in {active} yet.
        </p>
      )}
    </>
  );
}
