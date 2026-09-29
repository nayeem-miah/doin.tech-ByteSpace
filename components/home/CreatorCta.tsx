import { testimonials } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialGlows } from "@/components/ui/SectionGlow";
import { TintedShape } from "@/components/ui/TintedShape";

/**
 * Full-bleed brand-blue creator call to action, 1440x488.
 *
 * Content is a 964px centred column: a 710px headline, the supporting
 * copy at its full 964px, then the lime button. The 3D ornaments are
 * positioned from the design's own coordinates, most of which sit
 * outside the frame and are clipped by the section.
 */
export function CreatorCta() {
  return (
    <section className="relative h-[488px] overflow-hidden bg-brand text-on-dark">
      <CtaGrid />
      <CtaOrnaments />

      <div className="relative mx-auto max-w-[964px] px-5 pt-[85px] text-center md:px-0">
        <h2 className="t-display-lg mx-auto max-w-[710px] text-on-dark">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="t-body-l mx-auto mt-6 max-w-[964px] text-on-dark-muted">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now and become a part of a community
          comprising over 10,000 local and international creators. Utilize our
          Course Editor, and showcase your expertise by publishing your finest
          course on the ByteSpace Course Library.
        </p>
        <Button href="/register" variant="lime" size="md" className="mt-8">
          Join as Creator
        </Button>
      </div>
    </section>
  );
}

/** The 120px grid printed over the blue field, as in the hero. */
function CtaGrid() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "120px 120px",
      }}
    />
  );
}

/**
 * Ornament offsets are the design's, measured against the 1440x488 frame.
 * Several sit outside it and are clipped, which is how the source does it.
 */
function CtaOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <TintedShape
        src="/assets/shape-lime-2.png"
        tint="lime"
        className="absolute top-0 left-[1080px] size-[188px]"
      />
      <TintedShape
        src="/assets/hero-float-4.png"
        tint="lime"
        className="absolute top-[289px] left-[1110px] size-[330px]"
      />
      <TintedShape
        src="/assets/hero-float-6.png"
        tint="lime"
        className="absolute top-[-162px] left-[-118px] size-[385px]"
      />
      <TintedShape
        src="/assets/hero-float-3.png"
        tint="white"
        className="absolute top-[5px] left-[178px] size-[175px]"
      />
      <TintedShape
        src="/assets/hero-float-1.png"
        tint="white"
        className="absolute top-[225px] left-[-48px] size-[188px]"
      />
      <TintedShape
        src="/assets/hero-float-6.png"
        tint="lime"
        className="absolute top-[299px] left-[20px] size-[342px] rotate-[12deg]"
      />
      <TintedShape
        src="/assets/shape-lime-4.png"
        tint="white"
        className="absolute top-[6px] left-[1226px] size-[370px]"
      />
    </div>
  );
}

/**
 * "Discover What Our Community Is Saying".
 *
 * The header is a two-column band - headline left, body right - with the
 * three cards on a full-width row beneath it, not beside it. Avatars are
 * 80px and the cards sit on the same 41px gutter as the source.
 */
export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-surface-2">
      <TestimonialGlows />

      <div className="relative mx-auto max-w-[1200px] px-5 py-20 md:px-0 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[577fr_580fr] lg:gap-[43px]">
          <h2 className="t-display-lg text-ink">
            Discover What Our Community Is Saying
          </h2>
          <p className="t-body-l text-body">
            At ByteSpace, our vibrant community of learners and creators is at
            the heart of what we do. Hear what our users have to say about their
            experiences and why they choose ByteSpace for their learning journey.
          </p>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              as="li"
              key={t.name}
              delay={i * 70}
              className="flex flex-col rounded-lg border border-line bg-white p-6"
            >
              <Avatar src={t.avatar} size={80} alt={t.name} />
              <div className="mt-6">
                <p className="t-display-xs text-ink">{t.name}</p>
                <p className="t-body-l text-brand">{t.role}</p>
              </div>
              <p className="t-body-l mt-4 text-body">
                &ldquo;{t.quote}&rdquo;
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
