import { getDateRange } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { GuardianResponse, NewsAPIResponse, NYTResponse } from "../types";

const {
  VITE_APP_NEW_YORK_TIMES_KEY,
  VITE_APP_THE_GUARDIAN_API_KEY,
  VITE_APP_NEWS_API_KEY,
} = import.meta.env;
interface FetchParams {
  category?: string;
  query?: string;
  dateRange?: string;
  sortBy?: string;
  page?: number;
}
const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    fetchNYT: builder.query<NYTResponse, FetchParams>({
      query: ({ category, query, dateRange, sortBy, page = 1 }) => {
        const params: Record<string, string | number> = {
          "api-key": VITE_APP_NEW_YORK_TIMES_KEY,
          page,
          rows: DEFAULT_PAGE_SIZE,
          ...(category && { fq: `section_name:(${category})` }),
          ...(query && { q: query }),
          ...(sortBy && { sort: sortBy }),
        };
        if (dateRange) {
          const { from, to } = getDateRange(dateRange);
          params.begin_date = from.format("YYYYMMDD");
          params.end_date = to.format("YYYYMMDD");
        }
        return {
          url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
          params,
        };
      },
    }),

    fetchGuardian: builder.query<GuardianResponse, FetchParams>({
      query: ({ category, query, dateRange, sortBy, page = 1 }) => {
        const params: Record<string, string | number> = {
          "api-key": VITE_APP_THE_GUARDIAN_API_KEY,
          page,
          "show-fields": "bodyText",
          "show-tags": "keywords",
          "show-blocks": "main",
          "page-size": DEFAULT_PAGE_SIZE,
          ...(category && { section: category }),
          ...(query && { q: query }),
          ...(sortBy && { "order-by": sortBy }),
        };

        if (dateRange) {
          const { from, to } = getDateRange(dateRange);
          params.fromDate = from.format("YYYY-MM-DD");
          params.toDate = to.format("YYYY-MM-DD");
        }
        return { url: "https://content.guardianapis.com/search", params };
      },
    }),

    fetchNews: builder.query<NewsAPIResponse, FetchParams>({
      query: ({ category, query, dateRange, sortBy, page = 1 }) => {
        const endpoint = category ? "/top-headlines" : "/everything";
        const params: Record<string, string | number> = {
          ...(category ? { country: "us", category } : { q: "news" }),
          ...(sortBy && sortBy === "newest"
            ? { sortBy: "publishedAtDesc" }
            : { sortBy: "publishedAtAsc" }),
          ...(query && { q: query }),
          page,
          pageSize: DEFAULT_PAGE_SIZE,
          apiKey: VITE_APP_NEWS_API_KEY,
        };
        if (dateRange) {
          const { from, to } = getDateRange(dateRange);
          params["from"] = from.format("YYYY-MM-DD");
          params["to"] = to.format("YYYY-MM-DD");
        }

        return { url: `https://newsapi.org/v2${endpoint}`, params };
      },
    }),
  }),
});

export const { useFetchNYTQuery, useFetchGuardianQuery, useFetchNewsQuery } =
  newsApi;
export default newsApi;
