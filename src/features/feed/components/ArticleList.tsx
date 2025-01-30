import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/components/ui";
import { useArticles } from "../hooks";
import { Article } from "../types";
import { ArticleItem } from "./ArticleItem";

const ArticleList: React.FC = () => {
  const { articles, loadMoreArticles, hasMorePages, isLoading, error } =
    useArticles();
  if (isLoading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1 h-48">
        <Loader size="lg" />
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="text-red-500 text-center p-4">
        {error && "Error: "}
        {typeof error === "object" && "data" in error
          ? JSON.stringify(error.data)
          : "An unknown error occurred."}
      </div>
    );
  }
  console.log("articles.length === 0", articles.length);
  console.log("isLoading", isLoading);
  console.log("error", error);
  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={loadMoreArticles}
      hasMore={hasMorePages}
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
      {!hasMorePages && (
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
