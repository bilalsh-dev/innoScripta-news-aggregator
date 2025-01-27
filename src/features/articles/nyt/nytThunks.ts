import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNYTArticles } from "@/network/nytAPI";
import { NYTResponse, NYTArticle } from "./nytTypes";

interface NYTThunkResult {
  articles: NYTArticle[];
  totalPages: number;
}

export const fetchNYTArticlesThunk = createAsyncThunk<NYTThunkResult, number>(
  "nyt/fetchArticles",
  async (page: number) => {
    const response: NYTResponse = await fetchNYTArticles(page);
    return {
      articles: response.response.docs.map((doc) => ({
        ...doc,
        author: doc.byline.original || null,
      })),
      totalPages: Math.ceil(response.response.meta.hits / 20),
    };
  }
);
