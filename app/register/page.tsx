import type { Metadata } from "next";
import {
  AuthShell,
  AuthSwitch,
  Field,
  SocialAuth,
} from "@/components/layout/AuthForm";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Register"
      subtitle="Join ByteSpace and start building your career alongside a community of learners and creators."
      footer={
        <AuthSwitch
          prefix="Already have an account?"
          href="/login"
          label="Sign In"
        />
      }
    >
      <form className="flex flex-col gap-6" action="#">
        <Field id="name" label="Full name" placeholder="Enter your full name" />
        <Field id="email" label="Email" type="email" placeholder="Enter your email" />
        <Field
          id="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          hint="Use at least 8 characters with a number and a symbol."
        />
        <label className="t-body-m flex items-start gap-2 text-body">
          <input
            type="checkbox"
            name="terms"
            className="mt-1 size-4 shrink-0 rounded border-line accent-[#003be2]"
          />
          I agree to the Terms of Service and Privacy Policy.
        </label>
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Create Account
        </Button>
      </form>
      <SocialAuth />
    </AuthShell>
  );
}
