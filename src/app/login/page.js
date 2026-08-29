"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions/auth";
import { createBrowserClient } from "@/lib/supabase/client";
export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-gloss"></div>

        <h1 className="login-title">Welcome Back</h1>

        <p className="login-subtitle">Sign in to continue</p>

        {state?.error && <div className="login-error">{state.error}</div>}

        <form action={formAction}>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
            />
          </div>

          <button className="ios-login-button" type="submit" disabled={pending}>
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <button
          className="ios-login-button"
          type="button"
          onClick={() => {
            const supabase = createBrowserClient();
            supabase.auth.signInWithOAuth({
              provider: "google",
              scope: "local",
              options: {
                redirectTo: `${window.location.origin}/auth/callback`,
              },
            });
          }}
          disabled={pending}
        >
          {pending ? "google..." : "go to google"}
        </button>
        <Link href="/Registration" className="ios-login-button">
          Register
        </Link>
      </div>
    </div>
  );
}
