import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "@/features/filters/slice";
import articlesReducer from "@/features/feed/slices/articlesSlice";
import newsApi from "@/features/feed/api/query";
export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    filters: filtersReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
