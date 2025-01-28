import { Article } from "@/features/articles/types";
import { GuardianArticle } from "./types";

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
