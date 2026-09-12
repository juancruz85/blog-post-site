"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PostActionState = {
  error?: string;
  message?: string;
} | null;

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function getUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  title: string,
) {
  const baseSlug = slugify(title) || "post";
  let slug = baseSlug;
  let suffix = 2;

  while (true) {
    const { data } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!data) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function createPost(
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();

  if (!title) {
    return { error: "Title is required." };
  }

  if (!content) {
    return { error: "Content is required." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to create posts." };
  }

  const slug = await getUniqueSlug(supabase, title);

  const { data, error } = await supabase
    .from("posts")
    .insert({
      slug,
      title,
      content,
      category: category || null,
      published_date: new Date().toISOString().slice(0, 10),
      user_id: user.id,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Failed to create post." };
  }

  revalidatePath("/");
  revalidatePath("/posts");

  redirect(`/posts/${data.id}`);
}

export async function updatePost(
  postId: string,
  prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();

  if (!title) {
    return { error: "Title is required." };
  }

  if (!content) {
    return { error: "Content is required." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to edit posts." };
  }

  const { data: existingPost, error: fetchError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .maybeSingle();

  if (fetchError || !existingPost) {
    return { error: "Post not found." };
  }

  if (existingPost.user_id !== user.id) {
    return { error: "You can only edit your own posts." };
  }

  const { error } = await supabase
    .from("posts")
    .update({
      title,
      content,
      category: category || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath(`/posts/${postId}`);
  revalidatePath(`/posts/${postId}/edit`);

  redirect(`/posts/${postId}`);
}
