import { newsApi } from "@/features/feed/api";
import { newsFeedReducer } from "@/features/feed/slices";
import { filtersReducer } from "@/features/filters/slices";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    newsFeed: newsFeedReducer,
    filters: filtersReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
