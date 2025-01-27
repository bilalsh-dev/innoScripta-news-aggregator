/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchData, API_URLS } from "@/services/newsApi";

// Types

export interface Source {
  category?: string;
  country?: string;
  description?: string;
  id: string;
  language?: string;
  name: string;
  url?: string;
}

export interface Article {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: Source;
  title: string;
  url: string;
  urlToImage: string;
}

interface NewsState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  isLoading: false,
  error: null,
};

// Async Thunks
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({
    country,
    category,
    query = "",
    page,
  }: {
    country?: string;
    category?: string;
    query?: string;
    page?: number;
  }) => {
    console.table({ country, category, query, page });
    const url = API_URLS.NEWS_API(country, category, query, page);
    const data = await fetchData(url);
    return data.articles;
  }
);

export const fetchNYTimes = createAsyncThunk(
  "news/fetchNYTimes",
  async ({ category, query }: { category?: string; query?: string }) => {
    const url = API_URLS.NY_TIMES(category, query);
    const data = await fetchData(url);
    return query ? data.response.docs : data.results;
  }
);

export const fetchTheGuardian = createAsyncThunk(
  "news/fetchTheGuardian",
  async ({ section, query }: { section?: string; query?: string }) => {
    const url = API_URLS.THE_GUARDIAN(section, query);
    const data = await fetchData(url);
    return data.response.results;
  }
);

// Slice
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.articles = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch news";
      })

      // NY Times
      .addCase(fetchNYTimes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchNYTimes.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.articles = action.payload;
        }
      )
      .addCase(fetchNYTimes.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to fetch NY Times articles";
      })

      // The Guardian
      .addCase(fetchTheGuardian.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchTheGuardian.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoading = false;
          state.articles = action.payload;
        }
      )
      .addCase(fetchTheGuardian.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || "Failed to fetch The Guardian articles";
      });
  },
});

export const { clearArticles } = newsSlice.actions;
export default newsSlice.reducer;
