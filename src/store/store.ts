import { configureStore } from "@reduxjs/toolkit";
import newsAPIReducer from "@/features/articles/newsAPI/slice";
import nytReducer from "@/features/articles/nyt/slice";
import guardianReducer from "@/features/articles/guardian/slice";
import filtersReducer from "@/features/filters/slice";

export const store = configureStore({
  reducer: {
    newsAPI: newsAPIReducer,
    nyt: nytReducer,
    guardian: guardianReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
