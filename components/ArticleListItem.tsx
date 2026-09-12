import Link from "next/link";
import type { ArticleItem } from "../types";

interface Props {
  category: string;
  articles: ArticleItem[];
}

const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, id) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            {article.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleItemList;
