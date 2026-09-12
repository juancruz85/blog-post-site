import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import EditPostForm from "@/components/EditPostForm";
import { getPostById, getCurrentUserId } from "@/lib/posts";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const [post, currentUserId] = await Promise.all([
    getPostById(id),
    getCurrentUserId(),
  ]);

  if (!post) {
    notFound();
  }

  if (!currentUserId) {
    redirect("/login");
  }

  if (post.user_id !== currentUserId) {
    redirect(`/posts/${post.id}`);
  }

  const ownerLabel = post.owner?.name || post.owner?.email || "you";

  return (
    <main className="ios-edit-page">
      <Link href={`/posts/${post.id}`} className="ios-back-link">
        ← Back to post
      </Link>

      <h1 className="ios-page-title">Edit Post</h1>
      <p className="ios-post-meta">Owned by {ownerLabel}</p>

      <EditPostForm post={post} />
    </main>
  );
}
