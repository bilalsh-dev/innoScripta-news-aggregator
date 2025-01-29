export const DATE_RANGE_DEFAULT_VALUE = "today";
export const DEFAULT_SORTING_VALUE = "newest";

export const DATE_RANGES = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last Week", value: "lastWeek" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Last Year", value: "lastYear" },
];

export const CATEGORIES = [
  { label: "Politics", value: "politics" },
  { label: "Technology", value: "technology" },
  { label: "Business", value: "business" },
  { label: "Health", value: "health" },
  { label: "Entertainment", value: "entertainment" },
];

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export const SOURCES = [
  { label: "NewsAPI", value: "newsAPI" },
  { label: "NY Times", value: "nyt" },
  { label: "The Guardian", value: "guardian" },
  { label: "BBC", value: "bbc" },
  { label: "CNN", value: "cnn" },
];
export const SOURCES_VALUES = {
  newsapi_org: "newsAPI",
  the_guardian: "guardian",
  newyork_times: "nyt",
};
