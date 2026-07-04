import PostCard from "../components/PostCard";

export default function Home() {
  const posts = [
    {
      _id: 1,
      title: "Test Post",
      content: "Lorem ipsum dolor sit amet...",
      createdAt: new Date(),
    },
  ];

  return (
    <main>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  );
}










































