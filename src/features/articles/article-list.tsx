import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Article,
  fetchNews,
  //   fetchNYTimes,
  //   fetchTheGuardian,
} from "@/store/slices/newsSlice";
import { ArticleItem } from "./article-item";
import ArticleFilter from "./article-filter";
const ArticleList = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ country: "us", category: "technology" }));
    // dispatch(fetchNYTimes({ category: "technology" }));
    // dispatch(fetchTheGuardian({ section: "technology" }));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ArticleFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {articles.map(
          (article: Article, index: React.Key | null | undefined) => (
            <ArticleItem article={article} key={index} />
          )
        )}
      </div>
    </>
  );
};

export default ArticleList;
