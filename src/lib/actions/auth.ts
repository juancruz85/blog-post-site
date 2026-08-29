"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  message?: string;
} | null;

function getLoginErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Incorrect email or password. Please try again.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Please verify your email before signing in.";
  }

  if (normalized.includes("too many requests")) {
    return "Too many sign-in attempts. Please wait a moment and try again.";
  }

  return message;
}

function getSignUpErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("already registered") || normalized.includes("already been registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }

  if (normalized.includes("password")) {
    return "Password must be at least 6 characters long.";
  }

  if (normalized.includes("invalid email")) {
    return "Please enter a valid email address.";
  }

  if (normalized.includes("too many requests")) {
    return "Too many sign-up attempts. Please wait a moment and try again.";
  }

  return message;
}

export async function signUp(
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!name) {
    return { error: "Please enter your name." };
  }

  if (!email) {
    return { error: "Please enter your email address." };
  }

  if (!password) {
    return { error: "Please enter a password." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return { error: getSignUpErrorMessage(error.message) };
  }

  if (!data.session) {
    return {
      message:
        "Account created! Check your email for a verification link, then sign in.",
    };
  }

  redirect("/");
}

export async function login(
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email) {
    return { error: "Please enter your email address." };
  }

  if (!password) {
    return { error: "Please enter your password." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: getLoginErrorMessage(error.message) };
  }

  redirect("/");
}

export async function logout(prevState: unknown) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { message: error.message };
  }

  redirect("/");
}
