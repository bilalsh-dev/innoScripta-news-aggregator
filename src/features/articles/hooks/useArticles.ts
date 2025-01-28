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

export const useArticles = () => {
  const dispatch = useAppDispatch();
  const [hasMore, setHasMore] = useState(true);

  const newsAPIState = useAppSelector((state: RootState) => state.newsAPI);
  const nytState = useAppSelector((state: RootState) => state.nyt);
  const guardianState = useAppSelector((state: RootState) => state.guardian);
  const filters = useAppSelector((state: RootState) => state.filters);

  const { sources, query, category } = filters;

  const articles = [
    ...newsAPIState.articles,
    ...nytState.articles,
    ...guardianState.articles,
  ];

  const isLoading =
    newsAPIState.isLoading || nytState.isLoading || guardianState.isLoading;

  const error =
    newsAPIState.error || nytState.error || guardianState.error || null;

  const loadMoreArticles = () => {
    if (sources.includes("NewsAPI") || sources.length === 0) {
      if (newsAPIState.currentPage < newsAPIState.totalPages) {
        dispatch(
          fetchNewsArticles({
            country: "us",
            category: category.toLowerCase(),
            query,
            page: newsAPIState.currentPage + 1,
          })
        );
      }
    }

    if (sources.includes("NYT") || sources.length === 0) {
      if (nytState.currentPage < nytState.totalPages) {
        dispatch(
          fetchNYTArticles({
            category: category.toLowerCase(),
            query,
            page: nytState.currentPage + 1,
          })
        );
      }
    }

    if (sources.includes("Guardian") || sources.length === 0) {
      if (guardianState.currentPage < guardianState.totalPages) {
        dispatch(
          fetchGuardianArticles({
            query,
            page: guardianState.currentPage + 1,
          })
        );
      }
    }

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

    if (sources.includes("NewsAPI") || sources.length === 0) {
      dispatch(
        fetchNewsArticles({
          country: "us",
          category: category.toLowerCase(),
          query,
          page: 1,
        })
      );
    }

    if (sources.includes("NYT") || sources.length === 0) {
      dispatch(
        fetchNYTArticles({
          category: category.toLowerCase(),
          query,
          page: 1,
        })
      );
    }

    if (sources.includes("Guardian") || sources.length === 0) {
      dispatch(
        fetchGuardianArticles({
          query,
          page: 1,
        })
      );
    }
  }, [dispatch, query, category, sources]);

  return { articles, loadMoreArticles, hasMore, isLoading, error };
};
