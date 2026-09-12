import Link from "next/link";
import PostCard from "../../components/PostCard";
import { getPosts, getCurrentUserId } from "../../lib/posts";

export default async function PostsPage() {
  const [posts, currentUserId] = await Promise.all([
    getPosts(),
    getCurrentUserId(),
  ]);

  return (
    <main>
      <div className="ios-page-header">
        <h1 className="ios-page-title">All Posts</h1>
        {currentUserId && (
          <Link href="/posts/new" className="ios-button">
            New Post
          </Link>
        )}
      </div>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={currentUserId}
          />
        ))
      )}
    </main>
  );
}
