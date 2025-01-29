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
import { SOURCES_VALUES } from "@/lib/constants";
import { Article } from "../types";

export const useArticles = () => {
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [mergedArticles, setMergedArticles] = useState<Article[]>([]);

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
    (source: string, page: number) => {
      if (fetchFunctions[source]) {
        dispatch(
          fetchFunctions[source]({ category, query, dateRange, sortBy, page })
        );
      }
    },
    [dispatch, query, category, dateRange, sortBy]
  );

  const loadMoreArticles = () => {
    const selectedSources =
      sources.length > 0 ? sources : Object.keys(sourceStateMap);

    selectedSources.forEach((source) => {
      const state = sourceStateMap[source];
      if (state.currentPage < state.totalPages) {
        fetchArticles(source, state.currentPage + 1);
      }
    });

    setHasMore(
      selectedSources.some(
        (source) =>
          sourceStateMap[source].currentPage < sourceStateMap[source].totalPages
      )
    );
  };

  useEffect(() => {
    // Object.values(resetFunctions).forEach(dispatch);
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

  const totalPages = Math.max(
    ...Object.values(sourceStateMap).map((state) => state.totalPages)
  );

  return {
    articles: mergedArticles,
    loadMoreArticles,
    hasMore,
    totalPages,
    isLoading,
    error,
  };
};
