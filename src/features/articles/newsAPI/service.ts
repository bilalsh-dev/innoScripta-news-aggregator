import { DateRangeValue } from "@/features/filters/types";
import { getDateRange } from "@/lib/utils";
import axios from "axios";

const { VITE_APP_NEWS_API_KEY } = import.meta.env;

const NEWS_API_BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY =
  VITE_APP_NEWS_API_KEY || "a3906f4f790f4f2b8c917eb2f3a5621d";

export const fetchNews = async (
  category?: string,
  query?: string,
  dateRange?: DateRangeValue,
  page: number = 1
) => {
  try {
    const endpoint = category ? "/top-headlines" : "/everything";
    const params: Record<string, string | number> = {
      ...(category ? { country: "us" } : { q: "news" }),
      page,
      apiKey: NEWS_API_KEY,
    };

    if (category) params.category = category;
    if (query) params.q = query;
    if (dateRange) {
      const { from, to } = getDateRange(dateRange);
      params.from = from.format("YYYY-MM-DD");
      params.to = to.format("YYYY-MM-DD");
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
