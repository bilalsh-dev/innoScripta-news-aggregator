import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_PAGE_SIZE, SOURCES_VALUES } from "@/lib/constants";
import {
  normalizeGuardianArticle,
  normalizeNewsAPIArticle,
  normalizeNYTArticle,
} from "../utils";
import {
  Article,
  GuardianResponse,
  NewsAPIResponse,
  NYTResponse,
} from "../types";

interface SourceState {
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

interface NewsFeedState {
  articles: Article[];
  sources: Record<string, SourceState>;
}

const initialState: NewsFeedState = {
  articles: [],
  sources: {
    [SOURCES_VALUES.newsapi_org]: {
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
    [SOURCES_VALUES.newyork_times]: {
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
    [SOURCES_VALUES.the_guardian]: {
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
  },
};

const interleaveArticles = (
  prevArticles: Article[],
  newArticlesBySource: Article[]
): Article[] => {
  const result: Article[] = [...prevArticles, ...newArticlesBySource];

  return result;
};
interface NormalizeApiDataPayload {
  source: string;
  data: GuardianResponse | NewsAPIResponse | NYTResponse;
  page: number;
}
export const normalizeApiData = ({
  source,
  data,
  page,
}: NormalizeApiDataPayload) => {
  try {
    switch (source) {
      case SOURCES_VALUES.newsapi_org:
        if (!("articles" in data)) throw new Error("Invalid NewsAPI response");
        return {
          source,
          articles: data.articles.map(normalizeNewsAPIArticle),
          currentPage: page,
          totalPages: Math.ceil(data.totalResults / DEFAULT_PAGE_SIZE),
        };

      case SOURCES_VALUES.newyork_times:
        if (!("response" in data) || !("docs" in data.response)) {
          throw new Error("Invalid NYT response");
        }
        return {
          source,
          articles: data.response.docs.map(normalizeNYTArticle),
          currentPage: page,
          totalPages: Math.ceil(data.response.meta.hits / DEFAULT_PAGE_SIZE),
        };

      case SOURCES_VALUES.the_guardian:
        if (!("response" in data) || !("results" in data.response)) {
          throw new Error("Invalid Guardian response");
        }
        return {
          source,
          articles: data.response.results.map(normalizeGuardianArticle),
          currentPage: data.response.currentPage,
          totalPages: Math.ceil(data.response.total / data.response.pageSize),
        };

      default:
        throw new Error(`Unsupported source: ${source}`);
    }
  } catch (error) {
    console.error("Error processing articles:", error);
    return {
      source,
      articles: [],
      currentPage: page,
      totalPages: 1,
    };
  }
};

const newsFeedSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addToFeed: (
      state,

      action: PayloadAction<NormalizeApiDataPayload>
    ) => {
      const { articles, ...rest } = normalizeApiData(action.payload);
      state.articles = interleaveArticles(state.articles, articles);
      state.sources[action.payload.source] = {
        ...state.sources[action.payload.source],
        ...rest,
      };
    },
    resetFeed: (state) => {
      state.articles = [];
      Object.keys(state.sources).forEach((source) => {
        state.sources[source] = {
          ...initialState.sources[source],
          currentPage: 1,
        };
      });
    },
  },
});

export const { addToFeed, resetFeed } = newsFeedSlice.actions;
export default newsFeedSlice.reducer;
