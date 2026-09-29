import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { TintedShape } from "@/components/ui/TintedShape";
import { courses } from "@/lib/data";

/**
 * Shared shell for Sign in and Register, 1440x1024.
 *
 * The blue panel carries the pitch and two course cards scattered over
 * each other, with the form card sitting on the right. Card positions
 * and the ornament offsets are the design's, measured from the frame.
 */
export function AuthShell({
  pitch,
  body,
  children,
}: {
  /** Small line above the pitch heading. */
  pitch: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="relative min-h-[1024px] overflow-hidden bg-brand text-on-dark">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <AuthHeader />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_579px] lg:gap-0">
          {/* Left: pitch, scattered cards, social proof */}
          <div className="relative min-h-[640px]">
            <div className="max-w-[475px] pt-2">
              <h1 className="t-display-xs text-on-dark">{pitch}</h1>
              <p className="t-body-l mt-4 text-on-dark">{body}</p>
            </div>

            {/* Two cards, offset from each other as in the design */}
            <div className="pointer-events-none absolute top-[185px] left-0 hidden w-[373px] lg:block">
              <CardShell>
                <AuthCourseCard index={1} dimmed />
              </CardShell>
            </div>
            <div className="pointer-events-none absolute top-[96px] left-[111px] hidden w-[373px] lg:block">
              <CardShell>
                <AuthCourseCard index={0} />
              </CardShell>
            </div>

            {/* Lime social-proof card */}
            <div className="absolute top-[620px] left-[226px] hidden w-[258px] rounded-md bg-lime p-4 lg:block">
              <p className="t-h-s text-ink">Happy Students</p>
              <p className="text-[10px] text-[#424348]">4.5 (240)</p>
              <div className="mt-2 flex items-center">
                {STACK.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={32}
                    height={32}
                    className="shrink-0 rounded-full object-cover ring-2 ring-lime"
                    {...{ style: { marginLeft: i === 0 ? 0 : -8 } }}
                  />
                ))}
                <span className="t-label ml-2 grid size-8 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-bold text-on-dark">
                  2K+
                </span>
              </div>
            </div>

            <AuthOrnaments />
          </div>

          {/* Right: the form card */}
          <div className="relative z-10 lg:pl-0">
            <div className="rounded-lg bg-white p-9 shadow-e5">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STACK = [
  "/assets/avatar-05.png",
  "/assets/avatar-06.png",
  "/assets/avatar-07.png",
  "/assets/avatar-08.png",
];

/** Header sits above the split, spanning the full frame. */
function AuthHeader() {
  return (
    <div className="relative mx-auto max-w-[1200px] px-5 py-8 md:px-0 md:py-10">
      <LogoOnly />
    </div>
  );
}

function LogoOnly() {
  return (
    <Link href="/" className="inline-flex items-center gap-[10px]" aria-label="ByteSpace home">
      <svg width="29" height="32" viewBox="0 0 29 32" aria-hidden="true">
        <path
          fill="#d4fb20"
          d="M0 32V0h14.5C22.5 0 27 3.4 27 9c0 3.5-1.9 6.2-5 7.4 3.9 1.1 6.1 4 6.1 7.7C28.1 28.9 23.3 32 15 32H0Zm8-13.7h5.6c3.1 0 4.7-1.2 4.7-3.6 0-2.3-1.6-3.5-4.7-3.5H8v7.1Zm0 7.2h6.2c3.4 0 5.1-1.3 5.1-3.8 0-2.5-1.7-3.8-5.1-3.8H8V25.5Z"
        />
      </svg>
    </Link>
  );
}

function CardShell({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-lg">{children}</div>;
}

/**
 * Course card for the auth panel. Same 373x384 card as the listing, with
 * the deep-purple price the design uses here and an optional dimmed card
 * for the one sitting behind.
 */
function AuthCourseCard({
  index,
  dimmed = false,
}: {
  index: number;
  dimmed?: boolean;
}) {
  const course = courses[index] ?? courses[0];
  return (
    <div className={dimmed ? "opacity-90" : undefined}>
      <AuthCard course={course} />
    </div>
  );
}

function AuthCard({ course }: { course: (typeof courses)[number] }) {
  return (
    <article className="flex h-[384px] w-[373px] flex-col overflow-hidden rounded-lg bg-white">
      <div className="relative mx-4 mt-4 h-[195px] shrink-0 overflow-hidden rounded-sm">
        <Image
          src={course.thumb}
          alt=""
          fill
          sizes="373px"
          className="object-cover"
        />
        <ul className="absolute bottom-3 left-3 flex gap-3">
          {[
            `${course.lessons} Lessons`,
            course.duration,
            `${course.comments} Comments`,
          ].map((label) => (
            <li
              key={label}
              className="t-label rounded-full bg-white/60 px-3 py-1.5 text-body"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="t-display-xs truncate text-ink">{course.title}</h3>
          <span className="t-h-s shrink-0 text-body">{course.rating}</span>
        </div>
        <p className="t-body-s mt-1 text-body">by {course.author}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="t-label rounded-full bg-surface px-3 py-1.5 text-muted">
            {course.level}
          </span>
          <span className="t-label ml-auto grid size-8 place-items-center rounded-full bg-brand text-white">
            {course.students}
          </span>
        </div>
        <p className="mt-auto flex items-baseline gap-1.5">
          <span className="t-display-xs text-purple">{course.price}</span>
          <span className="t-body-s text-body">{course.period}</span>
        </p>
      </div>
    </article>
  );
}

/** Ornament offsets are the design's, measured from the 1440x1024 frame. */
function AuthOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <TintedShape
        src="/assets/hero-float-6.png"
        tint="lime"
        className="absolute top-[702px] left-[97px] size-[188px]"
      />
      <TintedShape
        src="/assets/hero-float-4.png"
        tint="lime"
        className="absolute top-[320px] left-[151px] size-[146px]"
      />
      <TintedShape
        src="/assets/hero-float-3.png"
        tint="white"
        className="absolute top-[626px] left-[470px] size-[175px]"
      />
    </div>
  );
}

/** The small blue link-style line above the form heading. */
export function AuthKicker({ children }: { children: ReactNode }) {
  return <p className="t-body-l text-brand">{children}</p>;
}

/** Labelled field matching the design's label-over-input block. */
export function AuthField({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-label text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="t-body-l h-[52px] w-full rounded-sm border border-line bg-white px-4 text-ink transition-colors duration-200 focus:border-ink focus:outline-none"
      />
    </div>
  );
}

/** Hairline with a word centred in it, for the social sign-in row. */
export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="t-body-l text-subtle">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Circular social buttons, as on the sign-in card. */
export function SocialButtons() {
  return (
    <div className="flex justify-center gap-4">
      {(["facebook", "google"] as const).map((name) => (
        <button
          key={name}
          type="button"
          aria-label={name === "facebook" ? "Continue with Facebook" : "Continue with Google"}
          className="press grid size-10 place-items-center rounded-full bg-white text-ink transition-colors duration-200 hover:bg-surface"
        >
          <Icon name={name} size={20} />
        </button>
      ))}
    </div>
  );
}
