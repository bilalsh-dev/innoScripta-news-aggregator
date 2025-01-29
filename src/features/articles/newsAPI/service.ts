import { getDateRange } from "@/lib/utils";
import axios from "axios";

const { VITE_APP_NEWS_API_KEY } = import.meta.env;

const NEWS_API_BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY =
  VITE_APP_NEWS_API_KEY || "4d7397ed03c74ac68ada2d73b7eca5ca";

export const fetchNews = async (
  category?: string,
  query?: string,
  dateRange?: string,
  sortBy?: string,
  page: number = 1
) => {
  try {
    const endpoint = category ? "/top-headlines" : "/everything";
    const params: Record<string, string | number> = {
      ...(category ? { country: "us" } : { q: "news" }),
      page,
      pageSize: 10,
      apiKey: NEWS_API_KEY,
    };

    if (category) params.category = category;
    if (query) params.q = query;
    if (dateRange) {
      const { from, to } = getDateRange(dateRange);
      params.from = from.format("YYYY-MM-DD");
      params.to = to.format("YYYY-MM-DD");
    }
    if (sortBy) {
      if (sortBy === "newest") {
        params.sortBy = "publishedAtDesc";
      } else if (sortBy === "oldest") {
        params.sortBy = "publishedAtAsc";
      }
    }

    const response = await axios.get(`${NEWS_API_BASE_URL + endpoint}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from News API:", error);
    throw error;
  }
};
