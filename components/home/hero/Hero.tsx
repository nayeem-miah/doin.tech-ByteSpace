import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SearchField } from "@/components/ui/SearchField";
import {
  CourseProofCard,
  HappyStudentsCard,
  LearningProgressCard,
} from "@/components/cards";
import { HeroOrnaments } from "./HeroOrnaments";

/**
 * Hero: the brand-blue band, 1440x1024.
 *
 * Content is centred, matching the source frame: 72px Poppins headline on
 * two lines, muted sub-copy, then a white search field with a lime pill
 * button. Below sits the photographer, with three proof cards floating
 * around them. The proof cards are positioned from here but defined in
 * components/cards, since the creator band reuses two of them.
 *
 * The cards are hidden below lg: at narrower widths there is no room to
 * float them without crowding the figure.
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

        <figure className="relative mt-6 h-[560px] w-full md:mt-10 md:h-[600px]">
          <Image
            src="/assets/creator-photo.png"
            alt=""
            width={578}
            height={541}
            priority
            className="absolute bottom-0 left-1/2 h-[520px] w-auto -translate-x-1/2 object-contain md:h-[600px]"
          />

          <CourseProofCard
            title="UI/UX Design"
            meta={
              <>
                200 Courses <span className="mx-1">&bull;</span> 1000+ Students
              </>
            }
            className="absolute top-[150px] left-[6%] hidden lg:block"
          />
          <LearningProgressCard className="absolute top-[165px] right-[8%] hidden lg:block" />
          <HappyStudentsCard className="absolute bottom-[190px] left-[14%] hidden lg:block" />
        </figure>
      </div>
    </section>
  );
}
