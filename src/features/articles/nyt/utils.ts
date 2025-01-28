import { Article } from "@/features/articles/types";
import { NYTArticle } from "./types";

export const normalizeNYTArticle = (article: NYTArticle): Article => ({
  author: article.byline?.original || null,
  content: article.abstract || "",
  description: article.abstract || "",
  publishedAt: article.pub_date || "",
  source: { id: "nyt", name: "The New York Times" },
  title: article.headline?.main || "",
  url: article.web_url || "",
  urlToImage: article.multimedia?.length
    ? `https://www.nytimes.com/${article.multimedia[0].url}`
    : "",
});
