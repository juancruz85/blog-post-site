import Link from "next/link";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/CreatePostForm";
import { getCurrentUserId } from "@/lib/posts";

export default async function NewPostPage() {
  const currentUserId = await getCurrentUserId();

  if (!currentUserId) {
    redirect("/login");
  }

  return (
    <main className="ios-edit-page">
      <Link href="/posts" className="ios-back-link">
        ← Back to posts
      </Link>

      <h1 className="ios-page-title">Create Post</h1>
      <p className="ios-post-meta">Only signed-in users can create posts.</p>

      <CreatePostForm />
    </main>
  );
}
