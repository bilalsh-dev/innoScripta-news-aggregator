import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "./types";

interface ArticlesState {
  articles: Article[];
}

const initialState: ArticlesState = {
  articles: [],
};

const interleaveArticles = (
  prevArticles: Article[],
  newArticlesBySource: Article[][]
): Article[] => {
  const result: Article[] = [...prevArticles]; // Preserve previous articles
  let i = 0;

  while (newArticlesBySource.some((arr) => i < arr.length)) {
    newArticlesBySource.forEach((arr) => {
      if (i < arr.length) result.push(arr[i]);
    });
    i++;
  }

  return result;
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticles: (
      state,
      action: PayloadAction<{ source: string; articles: Article[] }[]>
    ) => {
      const newGroupedArticles = action.payload.map(({ articles }) => articles);
      state.articles = interleaveArticles(state.articles, newGroupedArticles); // Append, not overwrite
    },
    resetArticles: (state) => {
      state.articles = [];
    },
  },
});

export const { addArticles, resetArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
