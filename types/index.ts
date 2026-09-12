export type ArticleItem = {
  id: string;
  title: string;
  date: string;
  category: string;
};

export type PostOwner = {
  id: string;
  name: string | null;
  email: string | null;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string | null;
  published_date: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  owner: PostOwner | null;
};
