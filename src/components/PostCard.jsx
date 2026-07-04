import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <article className="ios-post-card">
      <div className="ios-post-gloss"></div>

      <div className="ios-post-content">
        <h2 className="ios-post-title">{post.title}</h2>

        <div className="ios-post-meta">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <p className="ios-post-excerpt">
          {post.content.length > 250
            ? post.content.substring(0, 250) + "..."
            : post.content}
        </p>

        <div className="ios-post-footer">
          <Link href={`/posts/${post._id}`} className="ios-button">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}

































