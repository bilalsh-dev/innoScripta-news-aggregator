import React, { useState } from "react";
import { Button, Input } from "@/components/ui";
import { Search, Calendar, Filter, X } from "lucide-react";
import { useTheme } from "@/components/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import {
  setSources,
  setDateRange,
  setCategory,
  setQuery,
  resetFilters,
} from "@/features/filters/slice";
import DropdownFilter from "./DropdownFilter";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { DATE_RANGES, CATEGORIES, SOURCES } from "@/lib/constants";
import { useDebounce } from "@/hooks/useDebounce";

const ArticleFilter: React.FC<object> = () => {
  const { isSidebarOpen, closeSidebar } = useTheme();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state: RootState) => state.filters);
  const [searchInput, setSearchInput] = useState(filters.query);

  const debouncedSearchInput = useDebounce(searchInput, 800);

  React.useEffect(() => {
    dispatch(setQuery(debouncedSearchInput));
  }, [debouncedSearchInput, dispatch]);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const isFilterActive =
    filters.sources.length !== 0 ||
    filters.dateRange !== "" ||
    filters.category !== "" ||
    filters.query !== "";

  return (
    <>
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-4xl mx-auto py-7">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full w-full bg-background hover:bg-accent/50 transition-colors"
          />
        </div>
        <MultiSelectDropdown
          options={SOURCES}
          selectedValues={filters.sources}
          onChange={(values) => dispatch(setSources(values))}
          placeholder="Select Sources"
        />
        <DropdownFilter
          icon={Calendar}
          options={DATE_RANGES.map((range) => ({
            label: range.label,
            value: range.value,
          }))}
          selected={filters.dateRange}
          setSelected={(option) => dispatch(setDateRange(option))}
          placeholder="Date"
        />

        <DropdownFilter
          icon={Filter}
          options={CATEGORIES}
          selected={filters.category}
          setSelected={(option) => dispatch(setCategory(option))}
          placeholder="Category"
        />

        {isFilterActive && (
          <Button
            onClick={handleResetFilters}
            className="rounded-full bg-primary hover:bg-primary/90 transition-colors"
          >
            Reset
          </Button>
        )}
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeSidebar}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar}
          >
            <div
              className="fixed inset-y-0 left-0 w-64 bg-card p-4 z-50 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeSidebar}
                  className="hover:bg-accent/50 transition-colors"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={filters.query}
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                  className="pl-10 pr-4 py-2 rounded-full w-full bg-background hover:bg-accent/50 transition-colors"
                />
              </div>

              <div className="mb-4">
                <DropdownFilter
                  icon={Calendar}
                  options={DATE_RANGES.map((range) => ({
                    label: range.label,
                    value: range.value,
                  }))}
                  selected={filters.dateRange}
                  setSelected={(option) => dispatch(setDateRange(option))}
                  placeholder="Date"
                />
              </div>

              <div className="mb-4">
                <DropdownFilter
                  icon={Filter}
                  options={CATEGORIES}
                  selected={filters.category}
                  setSelected={(option) => dispatch(setCategory(option))}
                  placeholder="Category"
                />
              </div>

              <div className="mb-4">
                <MultiSelectDropdown
                  options={SOURCES}
                  selectedValues={filters.sources}
                  onChange={(values) => dispatch(setSources(values))}
                  placeholder="Select Sources"
                />
              </div>

              {isFilterActive && (
                <Button
                  onClick={handleResetFilters}
                  className="w-full mb-4 bg-primary hover:bg-primary/90 transition-colors"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleFilter;
