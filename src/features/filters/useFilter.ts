import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import {
  setSources,
  setDateRange,
  setCategory,
  setQuery,
  setSortBy,
  resetFilters,
} from "@/features/filters/slice";
import { useDebounce } from "@/hooks/useDebounce";

const useFilter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const [searchInput, setSearchInput] = useState(filters.query);

  const debouncedSearchInput = useDebounce(searchInput, 800);

  useEffect(() => {
    dispatch(setQuery(debouncedSearchInput));
  }, [debouncedSearchInput, dispatch]);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const isFilterActive =
    filters.sources.length !== 0 ||
    filters.dateRange !== "" ||
    filters.category !== "" ||
    filters.query !== "" ||
    filters.sortBy !== "";

  const handleSetSources = (sources: string[]) => {
    dispatch(setSources(sources));
  };

  const handleSetDateRange = (dateRange: string) => {
    dispatch(setDateRange(dateRange));
  };

  const handleSetCategory = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleSetSortBy = (sortBy: string) => {
    dispatch(setSortBy(sortBy));
  };

  return {
    searchInput,
    setSearchInput,
    handleResetFilters,
    isFilterActive,
    handleSetSources,
    handleSetDateRange,
    handleSetCategory,
    handleSetSortBy,
    filters,
  };
};

export default useFilter;
