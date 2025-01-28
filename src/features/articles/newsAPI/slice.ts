import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "./service";
import { normalizeNewsAPIArticle } from "./utils";
import { ArticleStateSlice, FetchArticlesParams } from "../types";
import { NewsAPIResponse } from "./types";

const initialState: ArticleStateSlice = {
  articles: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchNewsArticles = createAsyncThunk<
  NewsAPIResponse,
  FetchArticlesParams
>(
  "newsAPI/fetchArticles",
  async ({
    category,
    query,
    page,
  }: {
    category?: string;
    query?: string;
    page: number;
  }) => {
    const data = await fetchNews(category, query, page);
    return data;
  }
);

const newsAPISlice = createSlice({
  name: "newsAPI",
  initialState,
  reducers: {
    resetArticles: (state) => {
      state.articles = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNewsArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = [
          ...state.articles,
          ...action.payload.articles.map(normalizeNewsAPIArticle),
        ];
        state.currentPage = action.meta.arg.page || 1;
        state.totalPages = Math.ceil(action.payload.totalResults / 20);
      })
      .addCase(fetchNewsArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export const { resetArticles } = newsAPISlice.actions;
export default newsAPISlice.reducer;
