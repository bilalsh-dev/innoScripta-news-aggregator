import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateRangeValue } from "./types";
import { DATE_RANGE_DEFAULT_VALUE } from "@/lib/constants";

interface FiltersState {
  sources: string[];
  dateRange: DateRangeValue;
  category: string;
  query: string;
}

const initialState: FiltersState = {
  sources: [],
  dateRange: DATE_RANGE_DEFAULT_VALUE,
  category: "",
  query: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRangeValue>) => {
      state.dateRange = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetFilters: (state) => {
      state.sources = [];
      state.dateRange = "today";
      state.category = "";
      state.query = "";
    },
  },
});

export const { setSources, setDateRange, setCategory, setQuery, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
