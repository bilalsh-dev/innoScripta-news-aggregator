import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGuardianArticles } from "@/network/guardianAPI";
import { GuardianResponse, GuardianArticle } from "./guardianTypes";

interface GuardianThunkResult {
  articles: GuardianArticle[];
  totalPages: number;
}

export const fetchGuardianArticlesThunk = createAsyncThunk<
  GuardianThunkResult,
  number
>("guardian/fetchArticles", async (page: number) => {
  const response: GuardianResponse = await fetchGuardianArticles(page);
  return {
    articles: response.response.results.map((item) => ({
      ...item,
      author: null, // Adjust based on the normalized schema
    })),
    totalPages: response.response.pages,
  };
});
