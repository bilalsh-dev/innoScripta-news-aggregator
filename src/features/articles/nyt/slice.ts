import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNYT } from "./service";
import { normalizeNYTArticle } from "./utils";
import { Article } from "../types";

interface NYTState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: NYTState = {
  articles: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchNYTArticles = createAsyncThunk(
  "nyt/fetchArticles",
  async ({
    category,
    query,
    page,
  }: {
    category?: string;
    query?: string;
    page?: number;
  }) => {
    const data = await fetchNYT(category, query, page);
    return data;
  }
);

const nytSlice = createSlice({
  name: "nyt",
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
      .addCase(fetchNYTArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNYTArticles.fulfilled, (state, action) => {
        state.isLoading = false;

        state.articles = [
          ...state.articles,
          ...action.payload.response.docs.map(normalizeNYTArticle),
        ];

        state.currentPage =
          action.payload.response.meta.offset / 10 + 1 ||
          action.meta.arg.page ||
          1;

        state.totalPages = Math.ceil(action.payload.response.meta.hits / 10);
      })
      .addCase(fetchNYTArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export const { resetArticles } = nytSlice.actions;
export default nytSlice.reducer;
