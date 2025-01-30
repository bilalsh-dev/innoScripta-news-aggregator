import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  Skeleton,
} from "@/components/ui";
import { Article } from "../types";

export const ArticleItem: React.FC<{ article: Article }> = React.memo(
  ({ article }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );

      if (imageRef.current) observer.observe(imageRef.current);

      return () => observer.disconnect();
    }, []);

    const handleCardClick = () => window.open(article.url, "_blank");

    const renderImage = () => {
      if (!isVisible) return <Skeleton className="w-full h-full" />;

      if (!article.urlToImage)
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500 text-sm">No image available</p>
          </div>
        );

      return (
        <img
          src={article.urlToImage}
          alt={article.title || "Article image"}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      );
    };

    return (
      <Card
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === "Enter" && handleCardClick()}
        className="cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      >
        <CardContent className="p-0 overflow-hidden">
          <div
            ref={imageRef}
            className="w-full h-48 relative bg-gray-100 group hover:scale-105 transition-transform duration-500 ease-in-out"
          >
            {renderImage()}
            {article.source.name && (
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 p-2 text-white text-xs rounded-tl-md">
                {article.source.name} - {moment(article.publishedAt).fromNow()}
              </div>
            )}
          </div>
        </CardContent>

        <CardHeader className="flex-1">
          <CardTitle className="text-lg line-clamp-2">
            {article.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-3">
            {article.description}
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button onClick={handleCardClick} className="w-full">
            Read More
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

ArticleItem.displayName = "ArticleItem";
