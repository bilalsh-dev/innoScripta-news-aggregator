import { useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { resetArticles, addArticles } from "../slices/articlesSlice";
import { SOURCES_VALUES } from "@/lib/constants";
import {
  useFetchNYTQuery,
  useFetchGuardianQuery,
  useFetchNewsQuery,
} from "../api/query";
import { RootState } from "@/store/store";

export const useArticles = () => {
  const dispatch = useAppDispatch();
  const { sources, query, category, dateRange, sortBy } = useAppSelector(
    (state: RootState) => state.filters
  );

  const selectedSources =
    sources.length > 0 ? sources : Object.values(SOURCES_VALUES);

  const { articles, sources: sourceStates } = useAppSelector(
    (state: RootState) => state.articles
  );
  const [refreshFeed, setRefreshFeed] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<unknown>(null);

  const prevFilters = useRef({ query, category, dateRange, sortBy, sources });

  useEffect(() => {
    const shouldReset =
      prevFilters.current.query !== query ||
      prevFilters.current.category !== category ||
      prevFilters.current.dateRange !== dateRange ||
      prevFilters.current.sortBy !== sortBy ||
      JSON.stringify(prevFilters.current.sources) !== JSON.stringify(sources);

    if (shouldReset) {
      dispatch(resetArticles());
      setCurrentPage(1);
      setRefreshFeed((prev) => !prev);
      prevFilters.current = { query, category, dateRange, sortBy, sources };
    }
  }, [query, category, dateRange, sortBy, sources, dispatch]);

  const nytQuery = useFetchNYTQuery(
    { category, query, dateRange, sortBy, page: currentPage },
    { skip: !selectedSources.includes(SOURCES_VALUES.newyork_times) }
  );

  const guardianQuery = useFetchGuardianQuery(
    { category, query, dateRange, sortBy, page: currentPage },
    { skip: !selectedSources.includes(SOURCES_VALUES.the_guardian) }
  );

  const newsQuery = useFetchNewsQuery(
    { category, query, dateRange, sortBy, page: currentPage },
    { skip: !selectedSources.includes(SOURCES_VALUES.newsapi_org) }
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allQueries = [
          { source: SOURCES_VALUES.newyork_times, query: nytQuery },
          { source: SOURCES_VALUES.the_guardian, query: guardianQuery },
          { source: SOURCES_VALUES.newsapi_org, query: newsQuery },
        ];

        const queriesToFetch =
          selectedSources.length === 0
            ? allQueries
            : allQueries.filter(({ source }) =>
                selectedSources.includes(source)
              );

        for (const { source, query } of queriesToFetch) {
          if (query.isError) {
            setError(query.error);
            return;
          }

          if (query.isSuccess && query.data && !query.isFetching) {
            console.log("Dispatch for ", source);
            dispatch(
              addArticles({
                source,
                data: query.data,
                page: currentPage,
              })
            );
          }
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchArticles();
  }, [
    nytQuery.data,
    guardianQuery.data,
    newsQuery.data,
    nytQuery.error,
    guardianQuery.error,
    newsQuery.error,
    currentPage,
    refreshFeed,
    dispatch,
  ]);

  const hasMorePages = Object.values(SOURCES_VALUES).some(
    (source) =>
      sourceStates[source]?.currentPage < sourceStates[source]?.totalPages
  );

  const loadMoreArticles = () => {
    if (
      nytQuery.isFetching ||
      guardianQuery.isFetching ||
      newsQuery.isFetching ||
      !hasMorePages
    )
      return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return {
    articles,
    isLoading:
      nytQuery.isFetching || guardianQuery.isFetching || newsQuery.isFetching,
    loadMoreArticles,
    error,
    hasMorePages,
  };
};
