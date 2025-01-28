export interface Article {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface FetchArticlesParams {
  category?: string;
  query?: string;
  page: number;
}
export interface ArticleStateSlice {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}
