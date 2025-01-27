import { configureStore } from "@reduxjs/toolkit";
import newsAPIReducer from "@/features/articles/newsAPI/newsAPISlice";
import filtersReducer from "@/features/filters/filtersSlice";
import { normalizeMiddleware } from "./middleware/normalizeMiddleware";

export const store = configureStore({
  reducer: {
    newsAPI: newsAPIReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(normalizeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
