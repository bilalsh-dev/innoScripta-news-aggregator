export interface Article {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface FetchArticlesParams {
  category?: string;
  query?: string;
  page: number;
}
export interface ArticleStateSlice {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

// Guardian API Types
export interface GuardianArticle {
  pillarName: string | undefined;
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  fields?: {
    thumbnail?: string;
    byline?: string;
    body?: string;
    trailText?: string;
  };
  blocks: {
    main: {
      elements: {
        type: string;
        assets: {
          type: string;
          mimeType: string;
          file: string;
        }[];
      }[];
    };
  };
}

export interface GuardianResponse {
  response: {
    status: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
  };
}

// NEWsAPI.Org  Types
export interface NewsAPIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

// NYtimes API Types

export interface NYTMultimedia {
  url: string;
  format: string;
  height: number;
  width: number;
}

export interface NYTArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: NYTMultimedia[];
  pub_date: string;
  document_type: string;
  section_name: string;
  headline: {
    main: string;
    kicker?: string;
  };
  byline: {
    original: string;
    person: { firstname: string; lastname: string }[];
  };
}

export interface NYTResponse {
  response: {
    docs: NYTArticle[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}
