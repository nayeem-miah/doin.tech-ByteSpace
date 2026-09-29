import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" />

      <main className="bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 py-24 text-center md:px-0 md:py-32">
          <p
            aria-hidden="true"
            className="t-display-xl bg-gradient-to-b from-lime to-transparent bg-clip-text text-transparent"
            style={{ fontSize: "180px", lineHeight: 1 }}
          >
            404
          </p>
          <h1 className="t-display-lg mt-6 text-ink">
            We could not find that page
          </h1>
          <p className="t-body-l mt-4 max-w-[52ch] text-body">
            The page you are looking for may have been moved or no longer
            exists. Head back to the catalogue to keep exploring.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button href="/courses" variant="outline" size="lg">
              Browse Courses
            </Button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
