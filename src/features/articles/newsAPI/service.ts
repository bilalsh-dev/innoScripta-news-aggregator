import axios from "axios";

const { VITE_APP_NEWS_API_KEY } = import.meta.env;

const NEWS_API_KEY =
  VITE_APP_NEWS_API_KEY || "a3906f4f790f4f2b8c917eb2f3a5621d";

export const fetchNews = async (
  category?: string,
  query?: string,
  page: number = 1
) => {
  try {
    const params: Record<string, string | number> = {
      country: "us",
      page,
      apiKey: NEWS_API_KEY,
    };

    if (category) params.category = category;
    if (query) params.q = query;

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from News API:", error);
    throw error;
  }
};
