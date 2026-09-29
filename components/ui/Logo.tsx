import Link from "next/link";

/**
 * ByteSpace wordmark: the lime glyph from the Figma file (a notched
 * "B" mark, 29x32) plus "ByteSpace" set in Clash Display 24/700.
 */
export function Logo({
  tone = "light",
  className = "",
}: {
  /** "light" = for dark backgrounds, "dark" = for light backgrounds. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-[10px] ${className}`}
      aria-label="ByteSpace home"
    >
      <svg width="29" height="32" viewBox="0 0 29 32" aria-hidden="true">
        <path
          fill="#d4fb20"
          d="M0 32V0h14.5C22.5 0 27 3.4 27 9c0 3.5-1.9 6.2-5 7.4 3.9 1.1 6.1 4 6.1 7.7C28.1 28.9 23.3 32 15 32H0Zm8-13.7h5.6c3.1 0 4.7-1.2 4.7-3.6 0-2.3-1.6-3.5-4.7-3.5H8v7.1Zm0 7.2h6.2c3.4 0 5.1-1.3 5.1-3.8 0-2.5-1.7-3.8-5.1-3.8H8V25.5Z"
        />
      </svg>
      <span
        className={`t-logo ${tone === "light" ? "text-on-dark" : "text-ink"}`}
      >
        ByteSpace
      </span>
    </Link>
  );
}
