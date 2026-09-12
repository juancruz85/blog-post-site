import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import moment from "moment";
import html from "remark-html";

import type { ArticleItem } from "../../types";

const articlesDirectory = path.join(process.cwd(), "articles");

const getSortedArticles = (): ArticleItem[] => {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
    };
  });

  return allArticlesData.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dateA = moment(a.date, format);
    const dateB = moment(b.date, format);

    if (dateA.isBefore(dateB)) {
      return -1;
    } else if (dateA.isAfter(dateB)) {
      return 1;
    } else {
      return 0;
    }
  });
};

export const GetCategorizedArticles = (): Record<string, ArticleItem[]> => {
  const sortedArticles = getSortedArticles();
  const categorizedArticles: Record<string, ArticleItem[]> = {};

  sortedArticles.forEach((article) => {
    if (!categorizedArticles[article.category]) {
      categorizedArticles[article.category] = [];
    }
    categorizedArticles[article.category].push(article);
  });
  return categorizedArticles;
};
