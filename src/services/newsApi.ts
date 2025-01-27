import axios from "axios";

const {
  VITE_APP_NEWS_API_KEY,
  VITE_APP_NEW_YORK_TIMES_KEY,
  VITE_APP_THE_GUARDIAN_API_KEY,
} = import.meta.env;

export const API_URLS = {
  NEWS_API: (country = "us", category = "", query = "") =>
    `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${query}&apiKey=${API_KEYS.NEWS_API}`,
  NY_TIMES: (category = "all", query = "") =>
    query
      ? `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEYS.NY_TIMES}`
      : `https://api.nytimes.com/svc/news/v3/content/all/${category}.json?api-key=${API_KEYS.NY_TIMES}`,
  THE_GUARDIAN: (section = "", query = "") =>
    `https://content.guardianapis.com/search?section=${section}&q=${query}&page-size=20&show-fields=thumbnail&api-key=${API_KEYS.THE_GUARDIAN}`,
};

export const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
