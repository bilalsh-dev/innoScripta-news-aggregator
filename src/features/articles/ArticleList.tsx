import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArticleItem } from "./ArticleItem";
import {
  fetchNewsArticles,
  resetArticles,
} from "@/features/articles/newsAPI/newsAPISlice";
import { RootState } from "@/store/store";
import { Loader } from "@/components/ui";

const ArticleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector((state: RootState) => state.newsAPI.articles);
  const totalPages = useAppSelector(
    (state: RootState) => state.newsAPI.totalPages
  );

  const isLoading = useAppSelector(
    (state: RootState) => state.newsAPI.isLoading
  );
  const error = useAppSelector((state: RootState) => state.newsAPI.error);
  const currentPage = useAppSelector(
    (state: RootState) => state.newsAPI.currentPage
  );
  const filters = useAppSelector((state: RootState) => state.filters);
  const loadMoreArticles = () => {
    dispatch(
      fetchNewsArticles({
        country: "us",
        category: "technology",
        query: filters.query,
        page: currentPage + 1,
      })
    );
  };

  useEffect(() => {
    dispatch(resetArticles());
    dispatch(
      fetchNewsArticles({
        country: "us",
        category: filters.category.toLowerCase(),
        query: filters.query,
        page: 1,
      })
    );
  }, [
    dispatch,
    filters.query,
    filters.category,
    filters.source,
    filters.dateRange,
  ]);

  if (isLoading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1 h-48">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={loadMoreArticles}
        hasMore={currentPage < totalPages}
        loader={<h4>Loading...</h4>}
        className="!overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {articles.map((article, index) => (
            <ArticleItem article={article} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default ArticleList;
