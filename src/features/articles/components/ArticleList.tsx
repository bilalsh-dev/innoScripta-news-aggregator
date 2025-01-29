import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/components/ui";
import { ArticleItem } from "./ArticleItem";
import { useArticles } from "../hooks/useArticles";
import { Article } from "../types";

const ArticleList: React.FC = () => {
  const { articles, loadMoreArticles, hasMore, isLoading, error } =
    useArticles();
  if (isLoading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1 h-48">
        <Loader size="lg" />
      </div>
    );
  }

  if (error && articles.length === 0) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={loadMoreArticles}
      hasMore={hasMore}
      loader={
        <div className="flex items-center justify-center flex-1 h-48">
          <Loader size="lg" />
        </div>
      }
      className="!overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {articles.map((article: Article, index: number) => (
          <ArticleItem article={article} key={index} />
        ))}
      </div>
      {!hasMore && (
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-4">No more articles to show.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Go to Top
          </button>
        </div>
      )}
    </InfiniteScroll>
  );
};

export default ArticleList;
