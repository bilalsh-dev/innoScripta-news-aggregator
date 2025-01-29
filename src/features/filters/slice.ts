import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  sources: string[];
  dateRange: string;
  category: string;
  query: string;
  sortBy: string;
}

const initialState: FiltersState = {
  sources: [],
  dateRange: "",
  category: "",
  query: "",
  sortBy: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    setDateRange: (state, action: PayloadAction<string>) => {
      state.dateRange = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.sources = [];
      state.dateRange = "";
      state.category = "";
      state.query = "";
      state.sortBy = "";
    },
  },
});

export const {
  setSources,
  setDateRange,
  setCategory,
  setQuery,
  setSortBy,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
