"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { signUp, type AuthActionState } from "@/lib/actions/auth";

export default function RegisterationPage() {
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    signUp,
    null,
  );

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-gloss"></div>

        <h1 className="login-title">Welcome</h1>

        <p className="login-subtitle">Create your account</p>

        {state?.error && <div className="login-error">{state.error}</div>}
        {state?.message && <div className="login-success">{state.message}</div>}

        <form action={formAction}>
          <div className="input-group">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={6}
              placeholder="At least 6 characters"
            />
          </div>

          <button className="ios-login-button" type="submit" disabled={pending}>
            {pending ? "Creating account..." : "Register"}
          </button>
        </form>

        <Link href="/login" className="ios-login-button">
          Sign In
        </Link>
      </div>
    </div>
  );
}
