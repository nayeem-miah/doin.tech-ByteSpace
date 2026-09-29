import Image from "next/image";
import { SearchField } from "@/components/ui/SearchField";
import { Icon } from "@/components/ui/icons";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroOrnaments } from "./HeroOrnaments";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";

/**
 * Hero: the brand-blue band, 1440x1024.
 *
 * Content is centred, matching the source frame: 72px Poppins headline on
 * two lines, muted sub-copy, then a white search field with a lime pill
 * button. The person and three proof cards sit over the lime disc below.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-on-dark">
      <SiteHeader />
      <HeroOrnaments />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-5 pt-6 pb-0 text-center md:px-0 md:pt-10">
        <h1 className="t-display-xl max-w-[980px] text-on-dark">
          Get Access to Hundreds Courses Available
        </h1>

        <p className="t-body-l mt-7 max-w-[820px] text-on-dark-muted">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>

        <SearchField id="hero-search" className="mt-8 max-w-[581px]" />

        {/* Person + floating proof cards */}
        <div className="relative mt-6 h-[560px] w-full md:mt-10 md:h-[600px]">
          <Image
            src="/assets/creator-photo.png"
            alt=""
            width={578}
            height={541}
            priority
            className="absolute bottom-0 left-1/2 h-[520px] w-auto -translate-x-1/2 object-contain md:h-[600px]"
          />

          <ProofCard className="top-[150px] left-[6%] hidden lg:block" />
          <ProgressCard className="top-[165px] right-[8%] hidden lg:block" />
          <HappyStudentsCard className="bottom-[190px] left-[14%] hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

function ProofCard({ className }: { className: string }) {
  return (
    <div className={`absolute w-[208px] rounded-lg bg-white p-4 ${className}`}>
      <p className="t-h-s text-ink">UI/UX Design</p>
      <p className="t-body-s mt-1 text-body">
        200 Courses <span className="mx-1">&bull;</span> 1000+ Students
      </p>
    </div>
  );
}

function ProgressCard({ className }: { className: string }) {
  return (
    <div className={`absolute w-[232px] rounded-lg bg-white p-5 ${className}`}>
      <p className="t-body-s text-ink">Learning Progress</p>
      <p className="t-display-md mt-3 text-ink">55%</p>
      <ProgressBar value={55} className="mt-3" />
    </div>
  );
}

const STACK = [
  "/assets/avatar-05.png",
  "/assets/avatar-06.png",
  "/assets/avatar-07.png",
  "/assets/avatar-08.png",
  "/assets/avatar-09.png",
];

function HappyStudentsCard({ className }: { className: string }) {
  return (
    <div className={`absolute w-[258px] rounded-lg bg-white p-4 ${className}`}>
      <p className="t-h-s text-ink">Happy Students</p>
      <p className="t-body-s mt-1 flex items-center gap-1 text-subtle">
        4.5 (240)
        <Icon name="star-lime" size={12} />
      </p>
      <div className="mt-3 flex items-center">
        {STACK.map((src, i) => (
          <Avatar
            key={src}
            src={src}
            size={32}
            alt=""
            className="ring-2 ring-white"
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
