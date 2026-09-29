import type { ReactNode } from "react";

/** The pill used for course meta ("17 Lessons", "Beginner", "2K+"). */
export function Badge({
  children,
  tone = "surface",
  className = "",
}: {
  children: ReactNode;
  tone?: "surface" | "lime" | "outline" | "dark";
  className?: string;
}) {
  const tones = {
    surface: "bg-white/60 text-body",
    lime: "bg-lime text-ink",
    outline: "border border-line text-muted",
    dark: "bg-brand-deep text-on-dark",
  } as const;
  return (
    <span
      className={`t-label inline-flex items-center rounded-full px-3 py-1.5 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** The category filter pill row under "Discover Your Passion". */
export function FilterPill({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "press t-label-lg shrink-0 rounded-full border px-5 py-2.5",
        active
          ? "border-brand bg-brand text-white"
          : "border-line bg-white text-muted hover:border-ink hover:text-ink",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
