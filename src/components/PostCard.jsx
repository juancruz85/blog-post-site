import Link from "next/link";

export default function PostCard({ post, currentUserId }) {
  const isOwner = currentUserId && post.user_id === currentUserId;
  const ownerLabel = post.owner?.name || post.owner?.email || "Unknown author";
  const displayDate = post.published_date || post.created_at;

  return (
    <article className="ios-post-card">
      <div className="ios-post-gloss"></div>

      <div className="ios-post-content">
        <h2 className="ios-post-title">{post.title}</h2>

        <div className="ios-post-meta">
          <span>{new Date(displayDate).toLocaleDateString()}</span>
          {post.category && <span> · {post.category}</span>}
          <span> · by {ownerLabel}</span>
        </div>

        <p className="ios-post-excerpt">
          {post.content.length > 250
            ? post.content.substring(0, 250) + "..."
            : post.content}
        </p>

        <div className="ios-post-footer">
          <Link href={`/posts/${post.id}`} className="ios-button">
            Read More
          </Link>
          {isOwner && (
            <Link href={`/posts/${post.id}/edit`} className="ios-button ios-button-secondary">
              Edit
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
