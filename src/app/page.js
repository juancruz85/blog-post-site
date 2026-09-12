import PostCard from "../components/PostCard";
import { GetCategorizedArticles } from "../lib/articles";
import ArticleItemList from "../../components/ArticleListItem";

export default function Home() {
  const categorizedArticles = GetCategorizedArticles();

  console.log(categorizedArticles);
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
