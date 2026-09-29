import Link from "next/link";
import { AuthHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Shared shell for Sign In and Register. The Figma frames put a 579x784
 * white form card on the left, with course cards and lime ornaments on
 * the brand-blue right half.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  aside,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main className="flex-1 bg-white">
        <div className="grid lg:grid-cols-[579px_1fr]">
          {/* Form card */}
          <div className="px-5 py-16 md:px-12 lg:py-20">
            <div className="mx-auto w-full max-w-[420px]">
              <h1 className="t-display-lg text-ink">{title}</h1>
              <p className="t-body-l mt-4 text-body">{subtitle}</p>
              <div className="mt-9">{children}</div>
              <p className="t-body-m mt-8 text-center text-body">{footer}</p>
            </div>
          </div>

          {/* Blue aside */}
          <div className="relative hidden overflow-hidden bg-brand lg:block">
            {aside ?? (
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute top-24 left-24 size-[372px] rounded-full bg-lime" />
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

/** Labelled field with helper and error slots, per the design's form block. */
export function Field({
  id,
  label,
  type = "text",
  placeholder,
  hint,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-label-lg text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="t-body-l placeholder:text-subtle h-[52px] w-full rounded-full border border-line bg-white px-5 text-ink transition-colors duration-200 focus:border-ink focus:outline-none"
      />
      {hint ? (
        <p id={`${id}-hint`} className="t-body-s text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Social sign-in row used on both auth pages. */
export function SocialAuth() {
  return (
    <>
      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="t-body-m text-subtle">or</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" size="lg">
          <Icon name="google" size={18} className="text-ink" />
          Google
        </Button>
        <Button variant="outline" size="lg">
          <Icon name="facebook" size={18} className="text-ink" />
          Facebook
        </Button>
      </div>
    </>
  );
}

/** Inline link used in the "New user?" / "Already have an account?" line. */
export function AuthSwitch({ prefix, href, label }: { prefix: string; href: string; label: string }) {
  return (
    <>
      {prefix}{" "}
      <Link href={href} className="t-h-s text-brand transition-colors hover:text-brand-deep">
        {label}
      </Link>
    </>
  );
}
