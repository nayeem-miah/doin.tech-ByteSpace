import Image from "next/image";
import { categoryFilters, featuredCategories, learningPaths } from "@/lib/data";
import { CourseCard } from "@/components/ui/CourseCard";
import { FilterPill } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/icons";
import { courses } from "@/lib/data";

/** Grey partner-logo strip that sits directly under the hero. */
export function LogoStrip() {
  const partners = [
    "Logoipsum",
    "Logoipsum",
    "Logoipsum",
    "Logoipsum",
    "Logoipsum",
  ];
  return (
    <section className="bg-surface" aria-label="Partners">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-16 gap-y-6 px-5 py-12 md:px-0">
        {partners.map((name, i) => (
          <span
            key={i}
            className="t-h-m flex items-center gap-2 text-muted opacity-70"
          >
            <Icon name="shapes" size={20} />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

/** "Discover Your Passion" - heading, filter pills and the course grid. */
export function DiscoverSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-0 md:py-24">
        <div className="max-w-[720px]">
          <h2 className="t-display-lg text-brand-deep">
            Discover Your Passion, Build Your Skills
          </h2>
          <p className="t-body-l mt-5 text-body">
            At Bytespace Courses, we bring you closer to life-changing knowledge.
            Explore a variety of courses across different fields, from cooking to
            IT programming, that will help you enhance your career and personal
            growth.
          </p>
        </div>

        {/* Filter pills */}
        <div className="mt-10 flex flex-wrap gap-3">
          {categoryFilters.map((c, i) => (
            <FilterPill key={c} active={i === 0}>
              {c}
            </FilterPill>
          ))}
        </div>

        {/* Course grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** "Explore Diverse Learning Paths" - the six category tiles. */
export function LearningPathsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-20 md:px-0 md:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[720px]">
            <h2 className="t-display-md text-brand-deep">
              Explore Diverse Learning Paths at Bytespace
            </h2>
            <p className="t-body-l mt-5 text-body">
              At ByteSpace, we believe in empowering individuals through knowledge.
              Our diverse range of course paths ensures that learners can find the
              perfect fit for their interests and goals.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {learningPaths.map((path) => (
            <li key={path.label}>
              <a
                href="#"
                className="press flex h-full flex-col items-center gap-3 rounded-md border border-line bg-white px-4 py-7 text-center transition-colors duration-200 hover:border-ink"
              >
                <span className="grid size-12 place-items-center rounded-full bg-lime">
                  <Icon name="shapes" size={22} className="text-ink" />
                </span>
                <span className="t-h-m text-ink">{path.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Featured-category strip with a "View More" affordance. */
export function FeaturedCategoriesBar() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 pb-4 sm:flex-row sm:items-center sm:justify-between md:px-0">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <h3 className="t-h-s text-brand">Featured Categories</h3>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          {featuredCategories.map((c) => (
            <li key={c.label}>
              <a
                href="#"
                className="t-body-l text-body transition-colors hover:text-brand"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="#"
        className="t-h-s text-brand transition-colors hover:text-brand-deep"
      >
        View More
      </a>
    </div>
  );
}

/** "Your Path to Professional Growth" - stats plus a floating course card. */
export function GrowthSection({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="bg-surface-2">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-20 md:px-0 md:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="t-display-lg text-ink">
            Your Path to Professional Growth Starts Here!
          </h2>
          <p className="t-body-l mt-5 text-body">
            Explore our curated selection of courses tailored to enhance your
            capabilities and accelerate your professional development.
          </p>

          <dl className="mt-10 flex gap-12">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="t-display-md block text-brand">{s.value}</span>
                  <span className="t-body-l mt-1 block text-body">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <Image
            src="/assets/course-detail-hero.png"
            alt=""
            width={720}
            height={479}
            className="w-full rounded-lg object-cover"
          />
          <div className="absolute -bottom-6 -left-4 w-[280px] rounded-lg bg-white p-5 shadow-e5 md:-left-10">
            <p className="t-h-s text-ink">Happy Students</p>
            <p className="t-body-s mt-1 text-subtle">4.5 (240)</p>
            <p className="t-display-xs mt-3 text-ink">2K+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
