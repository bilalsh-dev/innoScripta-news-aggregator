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
