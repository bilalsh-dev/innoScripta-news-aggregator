import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "./service";
import { normalizeNewsAPIArticle } from "./utils";
import { Article } from "../types";

interface NewsAPIState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: NewsAPIState = {
  articles: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchNewsArticles = createAsyncThunk(
  "newsAPI/fetchArticles",
  async ({
    country,
    category,
    query,
    page,
  }: {
    country?: string;
    category?: string;
    query?: string;
    page?: number;
  }) => {
    const data = await fetchNews(country, category, query, page);
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
        state.currentPage = action.payload.page || action.meta.arg.page || 1;
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
