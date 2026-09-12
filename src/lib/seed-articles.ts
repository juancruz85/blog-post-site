import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { createClient } from "@/lib/supabase/server";

const articlesDirectory = path.join(process.cwd(), "articles");

function parseDate(dateStr: string): string | null {
  const [day, month, year] = dateStr.split("-");
  if (!day || !month || !year) {
    return null;
  }
  return `${year}-${month}-${day}`;
}

export async function seedArticlesFromMarkdown(userId: string) {
  if (!fs.existsSync(articlesDirectory)) {
    return { imported: 0, skipped: 0 };
  }

  const supabase = await createClient();
  const fileNames = fs.readdirSync(articlesDirectory).filter((name) =>
    name.endsWith(".md"),
  );

  let imported = 0;
  let skipped = 0;

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      skipped += 1;
      continue;
    }

    const { error } = await supabase.from("posts").insert({
      slug,
      title: frontmatter.title ?? slug,
      content: content.trim(),
      category: frontmatter.category ?? null,
      published_date: frontmatter.date ? parseDate(frontmatter.date) : null,
      user_id: userId,
    });

    if (error) {
      console.error(`Failed to import ${slug}:`, error.message);
      skipped += 1;
    } else {
      imported += 1;
    }
  }

  return { imported, skipped };
}
