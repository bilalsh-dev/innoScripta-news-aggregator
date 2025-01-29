import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import {
  fetchNewsArticles,
  resetArticles as resetNewsAPIArticles,
} from "../newsAPI/slice";
import {
  fetchNYTArticles,
  resetArticles as resetNYTArticles,
} from "../nyt/slice";
import {
  fetchGuardianArticles,
  resetArticles as resetGuardianArticles,
} from "../guardian/slice";
import { addArticles, resetArticles } from "../articlesSlice";
import { SOURCES_VALUES } from "@/lib/constants";
import { Article } from "../types";

export const useArticles = () => {
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);
  const articles = useAppSelector(
    (state: RootState) => state.articles.articles
  );
  const [mergedArticles, setMergedArticles] = useState<Article[]>([]);
  const [isFetching, setIsFetching] = useState(false); // Prevent duplicate requests

  const newsAPIState = useAppSelector((state: RootState) => state.newsAPI);
  const nytState = useAppSelector((state: RootState) => state.nyt);
  const guardianState = useAppSelector((state: RootState) => state.guardian);
  const filters = useAppSelector((state: RootState) => state.filters);
  const { sources, query, category, dateRange, sortBy } = filters;

  const sourceStateMap = {
    [SOURCES_VALUES.newsapi_org]: newsAPIState,
    [SOURCES_VALUES.newyork_times]: nytState,
    [SOURCES_VALUES.the_guardian]: guardianState,
  };

  const fetchFunctions = {
    [SOURCES_VALUES.newsapi_org]: fetchNewsArticles,
    [SOURCES_VALUES.newyork_times]: fetchNYTArticles,
    [SOURCES_VALUES.the_guardian]: fetchGuardianArticles,
  };

  const resetFunctions = {
    [SOURCES_VALUES.newsapi_org]: resetNewsAPIArticles,
    [SOURCES_VALUES.newyork_times]: resetNYTArticles,
    [SOURCES_VALUES.the_guardian]: resetGuardianArticles,
  };

  const isLoading = Object.values(sourceStateMap).some(
    (state) => state.isLoading
  );
  const error =
    Object.values(sourceStateMap).find((state) => state.error)?.error || null;

  const fetchArticles = useCallback(
    async (source: string, page: number) => {
      if (fetchFunctions[source]) {
        dispatch(
          fetchFunctions[source]({ category, query, dateRange, sortBy, page })
        );
      }
    },
    [dispatch, query, category, dateRange, sortBy]
  );

  const loadMoreArticles = () => {
    if (isFetching) return;
    setIsFetching(true);

    const selectedSources =
      sources.length > 0 ? sources : Object.keys(sourceStateMap);

    selectedSources.forEach((source) => {
      const state = sourceStateMap[source];
      if (state.totalPages > 0 && state.currentPage < state.totalPages) {
        fetchArticles(source, state.currentPage + 1);
      }
    });

    setHasMore(
      selectedSources.some((source) => {
        const state = sourceStateMap[source];
        return state.totalPages > 0 && state.currentPage < state.totalPages;
      })
    );

    setIsFetching(false);
  };

  useEffect(() => {
    dispatch(resetArticles());
    Object.values(resetFunctions).forEach((resetFunction) =>
      dispatch(resetFunction())
    );

    const selectedSources =
      sources.length > 0 ? sources : Object.keys(sourceStateMap);
    selectedSources.forEach((source) => fetchArticles(source, 1));
  }, [dispatch, query, category, sources, dateRange, sortBy]);

  useEffect(() => {
    const merged = Object.values(sourceStateMap).flatMap(
      (state) => state.articles
    );
    setMergedArticles(merged);
  }, [newsAPIState.articles, nytState.articles, guardianState.articles]);
  useEffect(() => {
    const updatedArticles = Object.entries(sourceStateMap).map(
      ([source, state]) => ({
        source,
        articles: state.articles.slice(-10),
      })
    );

    dispatch(addArticles(updatedArticles));
  }, [
    dispatch,
    newsAPIState.articles,
    nytState.articles,
    guardianState.articles,
  ]);

  const totalPages = Math.max(
    ...Object.values(sourceStateMap).map((state) => state.totalPages || 0)
  );
  const totalAvailableArticles = mergedArticles.length;

  return {
    articles: articles,
    loadMoreArticles,
    hasMore,
    totalPages,
    totalAvailableArticles,
    isLoading,
    error,
  };
};
