import { NewsAPIArticle } from "@/features/articles/newsAPI/newsAPITypes";
import { Article } from "@/store/slices/newsSlice";

export const normalizeNewsAPIArticle = (article: NewsAPIArticle): Article => ({
  author: article.author || null,
  content: article.content || "",
  description: article.description || "",
  publishedAt: article.publishedAt || "",
  source: { id: article.source?.id || "", name: article.source?.name || "" },
  title: article.title || "",
  url: article.url || "",
  urlToImage: article.urlToImage || "",
});
