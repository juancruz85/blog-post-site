import { createClient } from "@/lib/supabase/server";
import type { Post } from "../../types";

type ProfileRow = {
  id: string;
  name: string | null;
  email: string | null;
};

type PostRow = {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string | null;
  published_date: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  profiles: ProfileRow | ProfileRow[] | null;
};

function normalizeProfile(
  profiles: ProfileRow | ProfileRow[] | null,
): ProfileRow | null {
  if (!profiles) {
    return null;
  }

  return Array.isArray(profiles) ? (profiles[0] ?? null) : profiles;
}

function mapPost(row: PostRow): Post {
  const profile = normalizeProfile(row.profiles);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    content: row.content,
    category: row.category,
    published_date: row.published_date,
    user_id: row.user_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    owner: profile
      ? {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        }
      : null,
  };
}

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      slug,
      title,
      content,
      category,
      published_date,
      user_id,
      created_at,
      updated_at,
      profiles (
        id,
        name,
        email
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch posts:", error.message);
    return [];
  }

  return (data as PostRow[]).map(mapPost);
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      slug,
      title,
      content,
      category,
      published_date,
      user_id,
      created_at,
      updated_at,
      profiles (
        id,
        name,
        email
      )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapPost(data as PostRow);
}

export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}
