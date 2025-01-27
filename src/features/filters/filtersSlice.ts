import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  source: string; // 'all', 'newsAPI', 'nyt', 'guardian'
  dateRange: string; // 'all', 'today', 'week', 'month'
  category: string; // 'all', 'politics', 'technology', 'business'
  query: string;
}

const initialState: FiltersState = {
  source: "",
  dateRange: "",
  category: "",
  query: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSource: (state, action: PayloadAction<string>) => {
      state.source = action.payload;
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
    resetFilters: (state) => {
      state.source = "";
      state.dateRange = "";
      state.category = "";
      state.query = "";
    },
  },
});

export const { setSource, setDateRange, setCategory, setQuery, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
