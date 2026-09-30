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

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-5 pt-6 pb-0 text-center md:px-0 md:pt-10">
        <h1 className="enter enter-1 t-display-xl max-w-[980px] text-on-dark">
          Get Access to Hundreds Courses Available
        </h1>

        <p className="enter enter-2 t-body-l mt-7 max-w-[820px] text-on-dark-muted">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>

        <SearchField id="hero-search" className="enter enter-3 mt-8 max-w-[581px]" />

        <figure className="enter enter-4 relative mt-6 w-full md:mt-10 md:h-[600px]">
          <Image
            src="/assets/creator-photo.png"
            alt=""
            width={578}
            height={541}
            priority
            className="mx-auto block w-full max-w-full object-contain md:absolute md:bottom-0 md:left-1/2 md:h-[600px] md:w-auto md:max-w-none md:-translate-x-1/2"
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
