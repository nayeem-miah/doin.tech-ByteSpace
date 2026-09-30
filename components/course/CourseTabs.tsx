"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/icons";

const TABS: { label: string; segment: string; icon: IconName }[] = [
  { label: "About", segment: "", icon: "align-left" },
  { label: "Lessons", segment: "/lessons", icon: "play-circle" },
  { label: "Reviews", segment: "/reviews", icon: "star-blue" },
];

/**
 * About / Lessons / Reviews switcher shared by the three course pages.
 *
 * Same pill language as the category filters: the active tab is the lime
 * fill and the rest sit on the surface grey, with no border on either.
 */
export function CourseTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Course sections">
      <ul className="flex flex-wrap gap-4">
        {TABS.map((tab) => {
          const href = `/courses/${slug}${tab.segment}`;
          const active = pathname === href;
          return (
            <li key={tab.label}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "tab-pill t-body-l inline-flex items-center gap-2 rounded-full px-4 py-3 font-medium",
                  active
                    ? "bg-lime text-ink"
                    : "bg-surface text-muted hover:text-ink",
                ].join(" ")}
              >
                <Icon name={tab.icon} size={18} />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
