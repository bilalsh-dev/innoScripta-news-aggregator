import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import {
  useFetchNYTQuery,
  useFetchGuardianQuery,
  useFetchNewsQuery,
} from "../api/query";
import { RootState } from "@/store/store";
import { SOURCES_VALUES } from "@/lib/constants";
import { addArticles, resetArticles } from "../slices/articlesSlice";

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
  const handleRefreshFeed = () => {
    setRefreshFeed((pre) => !pre);
  };
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
    dispatch(resetArticles());
    setCurrentPage(1);
    handleRefreshFeed();
  }, [query, category, dateRange, sortBy, sources]);

  useEffect(() => {
    const fetchArticles = () => {
      const queries = [
        { source: SOURCES_VALUES.newyork_times, query: nytQuery },
        { source: SOURCES_VALUES.the_guardian, query: guardianQuery },
        { source: SOURCES_VALUES.newsapi_org, query: newsQuery },
      ];

      queries.forEach(({ source, query }) => {
        if (query.error) {
          console.error(`Error fetching ${source}:`, query.error);
        }
        console.log("query.isSuccess ", query.isSuccess);
        console.log(" query.data ", query.data);
        console.log("!query.isFetching", !query.isFetching);
        console.log("query", query);
        if (query.isSuccess && query.data && !query.isFetching) {
          dispatch(
            addArticles({
              source,
              data: query.data,
              page: currentPage,
            })
          );
        }
      });
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
    // dispatch,
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
    error: nytQuery.error || guardianQuery.error || newsQuery.error,
    hasMorePages,
  };
};
