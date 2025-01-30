import { Article, GuardianArticle, NewsAPIArticle, NYTArticle } from "./types";

export const normalizeGuardianArticle = (
  article: GuardianArticle
): Article => ({
  author: article.fields?.byline || article?.pillarName || null,
  content: article.fields?.body || "",
  description: article.fields?.trailText || "",
  publishedAt: article.webPublicationDate || "",
  source: { id: "guardian", name: "The Guardian" },
  title: article.webTitle || "",
  url: article.webUrl || "",
  urlToImage:
    article.fields?.thumbnail ||
    article?.blocks?.main?.elements[0]?.assets[0]?.file ||
    "",
});

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
