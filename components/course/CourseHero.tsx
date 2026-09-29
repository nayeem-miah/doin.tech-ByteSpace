import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/icons";
import { courseDetail } from "@/lib/data";

/**
 * The blue course band: header, title block with the discount badge,
 * author line, meta pills, and the video preview.
 *
 * The band is 957px tall and the enrol card alongside it is anchored to
 * the video's top edge, so the card straddles the band edge rather than
 * starting below it.
 */
export function CourseHero() {
  const d = courseDetail;

  return (
    <section className="relative overflow-hidden bg-brand text-on-dark">
      <SiteHeader />
      <BandGrid />

      <div className="relative mx-auto max-w-[1200px] px-5 pt-10 md:px-0 md:pt-[52px]">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[769px]">
            <h1 className="t-display-md text-on-dark">{d.title}</h1>
            <p className="t-display-xs mt-3 text-on-dark">{d.subtitle}</p>
            <p className="t-body-l mt-4 text-[#f1f4fe]">by {d.author}</p>
          </div>

          <button
            type="button"
            className="press t-h-s shrink-0 rounded-full bg-lime px-6 py-2.5 text-ink"
          >
            {d.discount}
          </button>
        </div>

        {/* Meta pills sit on white so they read against the blue. */}
        <ul className="mt-7 flex flex-wrap gap-3">
          {d.meta.map((m) => (
            <li
              key={m}
              className="t-h-s rounded-full bg-white px-4 py-2 text-ink"
            >
              {m}
            </li>
          ))}
        </ul>

        {/* Video preview */}
        <div className="relative mt-8 aspect-[720/479] w-full max-w-[720px] overflow-hidden rounded-md bg-white">
          <Image
            src="/assets/course-detail-hero.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
          <button
            type="button"
            aria-label="Play course preview"
            className="press absolute top-1/2 left-1/2 grid size-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90"
          >
            <Icon name="play-circle" size={48} className="text-ink" />
          </button>
        </div>
      </div>
    </section>
  );
}

function BandGrid() {
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

/** Creator strip that closes the enrol card. */
export function CreatorStrip() {
  const c = courseDetail.creator;
  return (
    <div className="flex items-center gap-4 border-t border-line pt-6">
      <Avatar src="/assets/avatar-11.png" size={52} alt={c.name} />
      <div className="min-w-0 flex-1">
        <p className="t-h-s text-ink">{c.name}</p>
        <p className="t-body-s text-body">{c.role}</p>
        <p className="t-body-s mt-1 line-clamp-2 text-subtle">{c.bio}</p>
        <a
          href="/creator"
          className="t-body-s mt-1 inline-block text-brand hover:text-brand-deep"
        >
          See Full Profile
        </a>
      </div>
    </div>
  );
}
