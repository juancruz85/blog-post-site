import PostCard from "../components/PostCard";
import { getPosts, getCurrentUserId } from "../lib/posts";

export default async function Home() {
  const [posts, currentUserId] = await Promise.all([
    getPosts(),
    getCurrentUserId(),
  ]);

  return (
    <main>
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
