import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * Hero: the brand-blue band, 1440x1024, with the headline, sub-copy and a
 * search field, plus the floating stat cards and lime decorative shapes
 * from the design.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-on-dark">
      <SiteHeader />

      <div className="relative mx-auto max-w-[1200px] px-5 pt-10 pb-24 md:px-0 md:pt-14 md:pb-32">
        <div className="max-w-[820px]">
          <h1 className="t-display-xl text-on-dark">
            Get Access to Hundreds Courses Available
          </h1>
          <p className="t-body-l mt-6 max-w-[700px] text-on-dark-muted">
            Unlock your creativity, gain valuable knowledge, and grow your
            business with our wide range of courses.
          </p>

          {/* Search field */}
          <form
            className="mt-9 flex max-w-[492px] flex-col gap-3 sm:flex-row"
            action="/search"
          >
            <label htmlFor="hero-search" className="sr-only">
              Search courses
            </label>
            <div className="relative flex-1">
              <Icon
                name="search"
                size={18}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-subtle"
              />
              <input
                id="hero-search"
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
        </div>

        {/* Floating proof cards */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <ProofCard
            className="left-[38%] top-[38%]"
            title="UI/UX Design"
            meta="200 Courses  •  1000+ Students"
            width={264}
          />
          <ProgressCard className="right-[16%] top-[42%]" />
          <HappyStudentsCard className="left-[30%] top-[70%]" />
          <div className="absolute top-[46%] right-[34%] flex items-center gap-2">
            <span className="t-h-l font-bold text-lime">2K+</span>
          </div>
        </div>

        {/* Hero photography */}
        <div className="pointer-events-none absolute right-[-40px] bottom-0 hidden lg:block">
          <Image
            src="/assets/hero-person.png"
            alt=""
            width={435}
            height={596}
            priority
            className="object-contain"
          />
        </div>

        <LimeShapes />
      </div>
    </section>
  );
}

function ProofCard({
  className,
  title,
  meta,
  width,
}: {
  className: string;
  title: string;
  meta: string;
  width: number;
}) {
  return (
    <div
      style={{ width }}
      className={`absolute rounded-lg bg-white/95 p-5 shadow-e4 ${className}`}
    >
      <p className="t-h-s text-ink">{title}</p>
      <p className="t-body-s mt-1 text-body">{meta}</p>
    </div>
  );
}

function ProgressCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute w-[280px] rounded-lg bg-white/95 p-5 shadow-e4 ${className}`}
    >
      <p className="t-label-lg text-ink">Learning Progress</p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div className="h-full w-[55%] rounded-full bg-lime" />
      </div>
      <p className="t-display-md mt-3 text-ink">55%</p>
    </div>
  );
}

function HappyStudentsCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute w-[220px] rounded-lg bg-white/95 p-5 shadow-e4 ${className}`}
    >
      <p className="t-h-s text-ink">Happy Students</p>
      <p className="t-body-s mt-1 text-subtle">4.5 (240)</p>
    </div>
  );
}

/** The lime blobs and squiggles scattered around the hero in the design. */
function LimeShapes() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src="/assets/shape-lime-3.png"
        alt=""
        width={372}
        height={372}
        className="absolute -top-24 -left-16 opacity-90"
      />
      <Image
        src="/assets/shape-lime-1.png"
        alt=""
        width={147}
        height={147}
        className="absolute top-32 right-[8%]"
      />
      <Image
        src="/assets/shape-lime-2.png"
        alt=""
        width={189}
        height={189}
        className="absolute right-[2%] bottom-10"
      />
    </div>
  );
}
