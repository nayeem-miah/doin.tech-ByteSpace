"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/icons";

const TABS: { label: string; segment: string; icon: IconName }[] = [
  { label: "Details", segment: "", icon: "align-left" },
  { label: "Lessons", segment: "/lessons", icon: "play-circle" },
  { label: "Reviews", segment: "/reviews", icon: "star-blue" },
];

/** Details / Lessons / Reviews switcher shared by the three course pages. */
export function CourseTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Course sections">
      <ul className="flex flex-wrap gap-3">
        {TABS.map((tab) => {
          const href = `/courses/${slug}${tab.segment}`;
          const active = pathname === href;
          return (
            <li key={tab.label}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "press t-h-s inline-flex items-center gap-2 rounded-full border px-5 py-2.5",
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-muted hover:border-ink hover:text-ink",
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
