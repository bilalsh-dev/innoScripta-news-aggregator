import moment from "moment";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui";
import { Article } from "@/store/slices/newsSlice";

export function ArticleItem({ article }: { article: Article }) {
  const gotoArticle = () => {
    window.open(article.url, "_blank");
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardContent className="p-0 overflow-hidden">
        <div
          style={{ backgroundImage: `url(${article.urlToImage})` }}
          className="w-full h-48 bg-cover bg-center relative group hover:scale-105 transition-transform duration-500 ease-in-out"
        >
          {!article.urlToImage && (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 text-sm">No image available</p>
            </div>
          )}
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 p-2 text-white text-xs rounded-tl-md">
            {article.source.name} - {moment(article.publishedAt).fromNow()}
          </div>
        </div>
      </CardContent>

      <CardHeader className="flex-1">
        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3">
          {article.description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button onClick={gotoArticle} className="w-full">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
