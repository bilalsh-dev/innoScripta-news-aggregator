import { NewsAPIArticle } from "./types";
import { Article } from "@/features/articles/types";

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
