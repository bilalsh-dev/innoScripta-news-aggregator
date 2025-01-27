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
