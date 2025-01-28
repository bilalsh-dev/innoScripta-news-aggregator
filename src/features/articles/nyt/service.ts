import axios from "axios";

const { VITE_APP_NEW_YORK_TIMES_KEY } = import.meta.env;

const NYT_BASE_URL = "https://api.nytimes.com/svc/search/v2";
const NYT_API_KEY =
  VITE_APP_NEW_YORK_TIMES_KEY || "uvXeQ3yYDdhDsKcSfRWkUAtOHN6tIVYe";

export const fetchNYT = async (
  category?: string,
  query?: string,
  page: number = 1
) => {
  try {
    const params: Record<string, string | number> = {
      "api-key": NYT_API_KEY,
      page,
    };

    if (category) params.fq = `section_name:(${category})`;
    if (query) params.q = query;

    const response = await axios.get(`${NYT_BASE_URL}/articlesearch.json`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from NYT API:", error);
    throw error;
  }
};
