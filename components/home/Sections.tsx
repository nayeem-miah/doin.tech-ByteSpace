import Image from "next/image";
import { categoryFilters, courses, creatorBenefits, learningPaths } from "@/lib/data";
import { CourseCard } from "@/components/ui/CourseCard";
import { FilterableCourseGrid } from "@/components/ui/FilterPills";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/icons";
import { GrowthGlows } from "@/components/ui/SectionGlow";

/** Grey partner-logo strip that sits directly under the hero. */
export function LogoStrip() {
  return (
    <section className="bg-surface" aria-label="Partners">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-16 gap-y-6 px-5 py-12 md:px-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="t-h-m flex items-center gap-2 text-muted opacity-70"
          >
            <Icon name="shapes" size={20} />
            Logoipsum
          </span>
        ))}
      </div>
    </section>
  );
}

/**
 * "Discover Your Passion" - heading, the filter pills and the grid.
 * The pills filter the grid, so both live in one client boundary.
 */
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

        <FilterableCourseGrid filters={categoryFilters} courses={courses} />
      </div>
    </section>
  );
}

/** "Explore Diverse Learning Paths" - the six category tiles. */
export function LearningPathsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-20 md:px-0 md:pb-24">
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
          {learningPaths.map((c) => (
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

/**
 * The two-part feature band from Figma "Frame 15": growth stats, then the
 * creator block, sharing one glow field.
 *
 * The glows must live on a single wrapper. Split across two sections each
 * with overflow-hidden, the ellipses that bleed in from outside the frame
 * get clipped away and the band loses its colour entirely.
 */
export function FeatureBand({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-surface-2">
      <GrowthGlows />

      {/* Row 1: growth */}
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 pt-20 pb-16 md:px-0 md:pt-24 lg:grid-cols-[574fr_621fr] lg:gap-16">
        <div>
          <h2 className="t-display-lg text-ink">
            Your Path to Professional Growth Starts Here!
          </h2>
          <p className="t-body-l mt-5 max-w-[520px] text-body">
            Explore our curated selection of courses tailored to enhance your
            capabilities and accelerate your career journey. Whether you are
            looking to sharpen specific skills, gain industry expertise, or
            embark on a new career path entirely, we have the resources you
            need.
          </p>

          <dl className="mt-8 flex gap-12">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp
                    value={s.value}
                    className="t-display-md block text-brand"
                  />
                  <span className="t-body-l mt-1 block text-body">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-[373px]">
            <CourseCard course={courses[0]} />
          </div>
          <ProgressCard className="absolute top-[120px] right-[-110px] hidden xl:block" />
        </div>
      </div>

      {/* Row 2: creator */}
      <div className="relative mx-auto grid max-w-[1200px] items-center gap-14 px-5 pb-20 md:px-0 md:pb-28 lg:grid-cols-2">
        <div className="relative flex justify-center lg:justify-start">
          <RevenueCard
            className="absolute top-0 left-0 z-10 hidden xl:block"
            title="Total Revenue"
            period="July 1-28"
            amount="$120.29"
          />
          <RevenueCard
            className="absolute bottom-6 left-12 z-10 hidden xl:block"
            title="Year to Date"
            period="2023"
            amount="$1,200.38"
          />
          <Image
            src="/assets/hero-person.png"
            alt=""
            width={435}
            height={596}
            className="w-full max-w-[360px] object-contain"
          />
          <HappyStudentsCard className="absolute right-0 bottom-0 z-10 hidden xl:block" />
        </div>

        <div>
          <h2 className="t-display-lg text-ink">
            Create &amp; Manage Courses Easily.
          </h2>
          <p className="t-body-l mt-5 text-body">
            <strong className="font-medium text-ink">ByteSpace</strong> supports
            individuals or entities in the creation, publication, and
            administration of educational courses.
          </p>
          <ul className="mt-7 flex flex-col gap-4">
            {creatorBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand">
                  <Icon name="check-circle" size={16} className="text-white" />
                </span>
                <span className="t-h-s text-ink">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProgressCard({ className }: { className: string }) {
  return (
    <div className={`w-[232px] rounded-lg bg-white p-5 shadow-e4 ${className}`}>
      <p className="t-body-s text-ink">Learning Progress</p>
      <p className="t-display-md mt-3 text-ink">55%</p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div className="h-full w-[55%] rounded-full bg-lime" />
      </div>
    </div>
  );
}

function RevenueCard({
  className,
  title,
  period,
  amount,
}: {
  className: string;
  title: string;
  period: string;
  amount: string;
}) {
  return (
    <div className={`w-[175px] rounded-md bg-brand p-4 text-on-dark ${className}`}>
      <p className="t-label text-on-dark-muted">{title}</p>
      <p className="t-body-s text-on-dark-muted">{period}</p>
      <p className="t-display-sm mt-2 text-on-dark">{amount}</p>
    </div>
  );
}

const STACK = [
  "/assets/avatar-05.png",
  "/assets/avatar-06.png",
  "/assets/avatar-07.png",
  "/assets/avatar-08.png",
];

function HappyStudentsCard({ className }: { className: string }) {
  return (
    <div className={`w-[258px] rounded-lg bg-white p-4 shadow-e4 ${className}`}>
      <p className="t-h-s text-ink">Happy Students</p>
      <p className="t-body-s mt-1 flex items-center gap-1 text-subtle">
        4.5 (240)
        <Icon name="star-lime" size={12} />
      </p>
      <div className="mt-3 flex items-center">
        {STACK.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={32}
            height={32}
            className="shrink-0 rounded-full object-cover ring-2 ring-white"
            {...{ style: { marginLeft: i === 0 ? 0 : -8 } }}
          />
        ))}
        <span className="t-label ml-2 grid size-8 shrink-0 place-items-center rounded-full bg-lime text-ink">
          2K+
        </span>
      </div>
    </div>
  );
}
