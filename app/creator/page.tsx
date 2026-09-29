import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Avatar } from "@/components/ui/Avatar";
import { CourseCard } from "@/components/ui/CourseCard";
import { Icon, type IconName } from "@/components/ui/icons";
import { courses } from "@/lib/data";

export const metadata: Metadata = { title: "Creator" };

const FILTERS: { label: string; icon: IconName }[] = [
  { label: "Filter", icon: "filter" },
  { label: "Level", icon: "chart-bar" },
  { label: "Category", icon: "shapes" },
];

export default function CreatorPage() {
  return (
    <>
      {/* Blue band: identity, bio, stats, follow */}
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

        <div className="relative mx-auto max-w-[1200px] px-5 pt-10 pb-16 md:px-0 md:pt-12">
          <div className="flex items-start gap-6">
            <Avatar
              src="/assets/avatar-11.png"
              size={80}
              alt="PurePearl Studio"
              className="border-4 border-white/20"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="t-display-md text-on-dark">PurePearl Studio</h1>
                <span className="t-body-l rounded-full bg-white px-3 py-1 text-ink">
                  Creator
                </span>
              </div>
              <p className="t-body-l mt-2 text-on-dark">
                Passionate UI/UX, Web designer
              </p>
            </div>

            <button
              type="button"
              className="press t-h-s shrink-0 rounded-full bg-lime px-6 py-3 text-ink"
            >
              Follow
            </button>
          </div>

          <p className="t-body-l mt-6 max-w-[900px] text-on-dark-muted">
            Welcome to the creative world of PurePearl Studio. Here, you&rsquo;ll
            discover the passion, expertise, and inspiration that drives
            everything we make.
          </p>

          <dl className="mt-6 flex gap-10">
            <div>
              <dt className="sr-only">Products</dt>
              <dd>
                <span className="t-h-s text-lime">3</span>{" "}
                <span className="t-h-s text-on-dark">Products</span>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Followers</dt>
              <dd>
                <span className="t-h-s text-lime">12</span>{" "}
                <span className="t-h-s text-on-dark">Followers</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <main className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-0 md:py-16">
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

          <div className="mt-12 grid auto-rows-[384px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} priority />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
