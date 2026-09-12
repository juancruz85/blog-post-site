import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, getCurrentUserId } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const [post, currentUserId] = await Promise.all([
    getPostById(id),
    getCurrentUserId(),
  ]);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);
  const isOwner = currentUserId === post.user_id;
  const ownerLabel = post.owner?.name || post.owner?.email || "Unknown author";
  const displayDate = post.published_date || post.created_at;

  return (
    <article className="ios-post-detail">
      <Link href="/" className="ios-back-link">
        ← Back to home
      </Link>

      <h1 className="ios-post-title">{post.title}</h1>

      <div className="ios-post-meta">
        <span>{new Date(displayDate).toLocaleDateString()}</span>
        {post.category && <span> · {post.category}</span>}
        <span> · by {ownerLabel}</span>
      </div>

      <div
        className="ios-post-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {isOwner && (
        <div className="ios-post-footer">
          <Link href={`/posts/${post.id}/edit`} className="ios-button">
            Edit Post
          </Link>
        </div>
      )}
    </article>
  );
}
