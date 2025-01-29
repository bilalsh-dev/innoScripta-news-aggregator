import { useEffect, useState } from "react";
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

  const newsAPIState = useAppSelector((state: RootState) => state.newsAPI);
  const nytState = useAppSelector((state: RootState) => state.nyt);
  const guardianState = useAppSelector((state: RootState) => state.guardian);
  const filters = useAppSelector((state: RootState) => state.filters);

  const { sources, query, category, dateRange } = filters;

  const [mergedArticles, setMergedArticles] = useState<Article[]>([]);

  const isLoading =
    newsAPIState.isLoading || nytState.isLoading || guardianState.isLoading;

  const error =
    newsAPIState.error || nytState.error || guardianState.error || null;

  const fetchArticles = (source: string, page: number) => {
    switch (source) {
      case SOURCES_VALUES.newsapi_org:
        dispatch(
          fetchNewsArticles({
            category,
            query,
            dateRange,
            page,
          })
        );
        break;
      case SOURCES_VALUES.newyork_times:
        dispatch(
          fetchNYTArticles({
            category,
            query,
            dateRange,
            page,
          })
        );
        break;
      case SOURCES_VALUES.the_guardian:
        dispatch(fetchGuardianArticles({ category, query, dateRange, page }));
        break;
      default:
        break;
    }
  };

  const loadMoreArticles = () => {
    sources.forEach((source) => {
      const state =
        source === SOURCES_VALUES.newsapi_org
          ? newsAPIState
          : source === SOURCES_VALUES.newyork_times
          ? nytState
          : guardianState;

      if (state.currentPage < state.totalPages) {
        fetchArticles(source, state.currentPage + 1);
      }
    });

    setHasMore(
      newsAPIState.currentPage < newsAPIState.totalPages ||
        nytState.currentPage < nytState.totalPages ||
        guardianState.currentPage < guardianState.totalPages
    );
  };

  useEffect(() => {
    dispatch(resetNewsAPIArticles());
    dispatch(resetNYTArticles());
    dispatch(resetGuardianArticles());

    const selectedSources =
      sources.length > 0 ? sources : Object.values(SOURCES_VALUES);

    selectedSources.forEach((source) => {
      fetchArticles(source, 1);
    });
  }, [dispatch, query, category, sources, dateRange]);

  useEffect(() => {
    // Merge articles ensuring Guardian articles are always first
    const merged = [
      ...guardianState.articles, // Guardian articles first
      ...newsAPIState.articles,
      ...nytState.articles,
    ];
    setMergedArticles(merged);
  }, [guardianState.articles, newsAPIState.articles, nytState.articles]);

  return {
    articles: mergedArticles,
    loadMoreArticles,
    hasMore,
    isLoading,
    error,
  };
};
