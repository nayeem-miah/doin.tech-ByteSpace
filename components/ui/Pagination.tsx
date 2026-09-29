import { Icon } from "@/components/ui/icons";

/**
 * Numbered pagination: circular arrow buttons either side of the page
 * list, matching the 56px controls in the design.
 *
 * Presentational on purpose - the listing pages are static, so the
 * buttons carry the right roles and labels but do not drive state.
 */
export function Pagination({
  page = 1,
  pages = [1, 2, 3, 4, 5],
  className = "",
}: {
  page?: number;
  pages?: number[];
  className?: string;
}) {
  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            className="press grid size-14 place-items-center rounded-full bg-white text-ink transition-colors duration-200 hover:bg-surface"
          >
            <Icon name="chevron-left" size={20} />
          </button>
        </li>
        {pages.map((p) => {
          const active = p === page;
          return (
            <li key={p}>
              <button
                type="button"
                aria-label={`Page ${p}`}
                aria-current={active ? "page" : undefined}
                className={[
                  "press t-body-l grid h-14 w-9 place-items-center rounded-full",
                  active ? "bg-brand text-white" : "text-ink hover:bg-surface",
                ].join(" ")}
              >
                {p}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-label="Next page"
            className="press grid size-14 place-items-center rounded-full bg-white text-ink transition-colors duration-200 hover:bg-surface"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
