import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";
import { ArticleItem } from "./article-item";
import ArticleFilter from "./article-filter";

const ArticleList = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useAppSelector((state) => state.news);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);

  // Fetch more data for infinite scroll
  const fetchMoreData = useCallback(async () => {
    try {
      const result = await dispatch(
        fetchNews({
          country: "us",
          category: "technology",
          query: "",
          page: page.current,
        })
      );

      // Check if there are more articles to load
      if (result.payload && result.payload.articles.length === 0) {
        setHasMore(false);
      } else {
        page.current += 1; // Increment page for the next fetch
      }
    } catch (err) {
      console.error("Failed to fetch more articles:", err);
    }
  }, [dispatch]);

  // Initial fetch
  useEffect(() => {
    dispatch(
      fetchNews({
        country: "us",
        category: "technology",
        query: "",
        page: page.current,
      })
    );
  }, [dispatch]);

  if (isLoading && articles.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <>
      <ArticleFilter />
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center my-4">
            Loading...
          </div>
        }
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
