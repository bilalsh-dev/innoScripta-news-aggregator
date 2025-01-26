/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

export function ArticleCard({ article }: { article: any }) {
  const gotoArticle = () => {
    window.open(article.url, "_blank");
  };

  return (
    <div key={article.url}>
      <div
        className="bg-white rounded-xl shadow h-full overflow-hidden cursor-pointer"
        onClick={gotoArticle}
      >
        <div
          style={{
            backgroundImage: `url(${article.urlToImage})`,
          }}
          className="w-full h-48 bg-cover bg-center relative"
        >
          {!article.urlToImage ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 text-sm">No image available</p>
            </div>
          ) : null}
          <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 p-2 text-white text-xs rounded-tl-md">
            {article.source.name} - {moment(article.publishedAt).fromNow()}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold leading-5">{article.title}</h2>
          <p className="text-gray-500 text-sm leading-4">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );
}
