import type { Metadata } from "next";
import {
  AuthShell,
  AuthSwitch,
  Field,
  SocialAuth,
} from "@/components/layout/AuthForm";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Login"
      subtitle="Ready to Dive In? Enroll Now and Start Building Your Career"
      footer={<AuthSwitch prefix="New user?" href="/register" label="Sign Up" />}
    >
      <form className="flex flex-col gap-6" action="#">
        <Field id="email" label="Email" type="email" placeholder="Enter your email" />
        <Field
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <div className="flex items-center justify-between">
          <label className="t-body-m flex items-center gap-2 text-body">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border-line accent-[#003be2]"
            />
            Remember me
          </label>
          <a href="#" className="t-body-m text-brand hover:text-brand-deep">
            Forgot password?
          </a>
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Login
        </Button>
      </form>
      <SocialAuth />
    </AuthShell>
  );
}
