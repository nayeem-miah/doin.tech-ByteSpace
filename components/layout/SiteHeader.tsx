import Link from "next/link";
import { headerLinks, nav } from "@/lib/data";
import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";

/**
 * Site header. Sits on the brand-blue band in the design: 120px tall,
 * logo left, primary nav centred, account links + cart right.
 * `tone="dark"` is the light-background variant used inside page bodies.
 */
export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const onDark = tone === "light";

  return (
    <header
      className={[
        "w-full",
        onDark ? "text-on-dark" : "text-ink",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between gap-8 px-5 md:h-[120px] md:px-0">
        <Logo tone={onDark ? "light" : "dark"} />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "t-body-l transition-colors duration-200",
                    i === 0 ? "font-medium" : "",
                    onDark ? "hover:text-lime" : "hover:text-brand",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {headerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "t-body-l transition-colors duration-200",
                    onDark ? "hover:text-lime" : "hover:text-brand",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Cart"
            className={[
              "press grid size-6 place-items-center transition-colors duration-200",
              onDark ? "hover:text-lime" : "hover:text-brand",
            ].join(" ")}
          >
            <Icon name="wallet" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

/** Compact header for the auth pages, which use a 120px white band. */
export function AuthHeader() {
  return (
    <header className="w-full border-b border-line bg-white">
      <div className="mx-auto flex h-[88px] max-w-[1200px] items-center justify-between px-5 md:h-[120px] md:px-0">
        <Logo tone="dark" />
        <Link
          href="/"
          className="t-body-l text-ink transition-colors hover:text-brand"
        >
          Back to Home
        </Link>
      </div>
    </header>
  );
}
