import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGuardian } from "./service";
import { Article } from "../types";
import { normalizeGuardianArticle } from "./utils";

interface GuardianState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: GuardianState = {
  articles: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchGuardianArticles = createAsyncThunk(
  "guardian/fetchArticles",
  async ({
    category,
    query,
    page,
  }: {
    category?: string;
    query?: string;
    page?: number;
  }) => {
    const data = await fetchGuardian(category, query, page);
    return data;
  }
);

const guardianSlice = createSlice({
  name: "guardian",
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
      .addCase(fetchGuardianArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGuardianArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = [
          ...state.articles,
          ...action.payload.response.results.map(normalizeGuardianArticle),
        ];
        state.currentPage =
          action.meta.arg.page ||
          Math.ceil(action.payload.response.currentPage);
        state.totalPages = Math.ceil(
          action.payload.response.total / action.payload.response.pageSize
        );
      })
      .addCase(fetchGuardianArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch articles";
      });
  },
});

export const { resetArticles } = guardianSlice.actions;
export default guardianSlice.reducer;
