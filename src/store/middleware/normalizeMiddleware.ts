import { Middleware } from "@reduxjs/toolkit";
import { normalizeNewsAPIArticle } from "@/lib/normalizeData";

export const normalizeMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (action.type.endsWith("/fulfilled")) {
      const payload = action.payload;

      // Normalize NewsAPI data
      if (payload.articles) {
        action.payload.articles = payload.articles.map(normalizeNewsAPIArticle);
      }
    }

    return next(action);
  };
