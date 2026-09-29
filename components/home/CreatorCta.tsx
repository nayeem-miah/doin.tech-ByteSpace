import { testimonials } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialGlows } from "@/components/ui/SectionGlow";
import { TintedShape } from "@/components/ui/TintedShape";

/** Full-bleed brand-blue creator call to action. */
export function CreatorCta() {
  return (
    <section className="relative overflow-hidden bg-brand text-on-dark">
      {/* Same 120px grid printed over the blue field as the hero */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative mx-auto max-w-[964px] px-5 py-20 text-center md:px-0 md:py-[85px]">
        <h2 className="t-display-lg mx-auto max-w-[710px] text-on-dark">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="t-body-l mx-auto mt-6 max-w-[964px] text-on-dark-muted">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now to showcase your expertise and
          contribute to the growing ByteSpace creator community.
        </p>
        <Button href="/register" variant="lime" size="lg" className="mt-8">
          Join as Creator
        </Button>
      </div>

      <CtaOrnaments />
    </section>
  );
}

/** The 3D cone and ring ornaments that clip out of the CTA band. */
function CtaOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <TintedShape src="/assets/hero-float-6.png" tint="lime" className="absolute top-0 right-[280px] h-[189px] w-[189px]" />
      <TintedShape src="/assets/hero-float-4.png" tint="white" className="absolute right-[0px] bottom-0 h-[330px] w-[330px]" />
      <TintedShape src="/assets/hero-float-3.png" tint="white" className="absolute top-0 left-0 h-[387px] w-[387px]" />
      <TintedShape src="/assets/hero-float-1.png" tint="lime" className="absolute right-[20px] bottom-0 h-[189px] w-[189px]" />
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
