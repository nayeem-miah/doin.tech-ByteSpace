import Image from "next/image";
import { testimonials, creatorBenefits } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

/** "Create & Manage Courses Easily" - benefits list beside a photo. */
export function CreatorSection() {
  return (
    <section className="bg-surface-2">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 pb-20 md:px-0 md:pb-28 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <Image
            src="/assets/creator-photo.png"
            alt=""
            width={578}
            height={541}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="t-display-lg text-ink">Create &amp; Manage Courses Easily.</h2>
          <p className="t-body-l mt-5 text-body">
            ByteSpace supports individuals or entities in the creation,
            publication, and administration of online courses.
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

/** Full-bleed brand-blue creator call to action. */
export function CreatorCta() {
  return (
    <section className="relative overflow-hidden bg-brand text-on-dark">
      <div className="relative mx-auto max-w-[880px] px-5 py-24 text-center md:px-0 md:py-28">
        <h2 className="t-display-lg text-on-dark">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="t-body-l mx-auto mt-6 max-w-[760px] text-on-dark-muted">
          Experience the collaboration of numerous creators and an expanding
          selection of courses. Register now to showcase your expertise and
          contribute to the growing ByteSpace creator community.
        </p>
        <Button href="/register" variant="lime" size="lg" className="mt-9">
          Join as Creator
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/assets/shape-lime-1.png"
          alt=""
          width={147}
          height={147}
          className="absolute -top-10 -left-10"
        />
        <Image
          src="/assets/shape-lime-2.png"
          alt=""
          width={189}
          height={189}
          className="absolute -right-8 -bottom-12"
        />
      </div>
    </section>
  );
}

/** Three testimonial cards on the light grey band. */
export function TestimonialsSection() {
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-0 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-16">
          <div>
            <h2 className="t-display-lg text-ink">
              Discover What Our Community Is Saying
            </h2>
            <p className="t-body-l mt-5 text-body">
              At ByteSpace, our vibrant community of learners and creators is at
              the heart of what we do. Hear what our users have to say about their
              experiences and why they choose ByteSpace for their learning journey.
            </p>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                as="li"
                key={t.name}
                delay={i * 70}
                className="flex flex-col gap-4 rounded-lg border border-line bg-white p-6"
              >
                <Avatar src={t.avatar} size={52} alt={t.name} />
                <div>
                  <p className="t-display-xs text-ink">{t.name}</p>
                  <p className="t-body-l text-brand">{t.role}</p>
                </div>
                <p className="t-body-l text-body">&ldquo;{t.quote}&rdquo;</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
