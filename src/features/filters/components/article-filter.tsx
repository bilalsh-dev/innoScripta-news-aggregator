import { ArrowUpDown, Calendar, Filter, Search, X } from "lucide-react";
import { useTheme } from "@/components/theme";
import { Button, Input } from "@/components/ui";
import {
  CATEGORIES,
  DATE_RANGES,
  SORT_OPTIONS,
  SOURCES,
} from "@/lib/constants";
import { useFilter } from "../hooks";
import DropdownFilter from "./dropdown-filter";
import MultiSelectDropdown from "./multi-select-dropdown";

const ArticleFilter = () => {
  const {
    searchInput,
    setSearchInput,
    handleResetFilters,
    isFilterActive,
    handleSetSources,
    handleSetDateRange,
    handleSetCategory,
    handleSetSortBy,
    filters,
  } = useFilter();
  const { isSidebarOpen, closeSidebar } = useTheme();
  const selectedSources = filters.sources;
  const selectedDateRange = filters.dateRange;
  const selectedCategory = filters.category;
  const selectedSortBy = filters.sortBy;

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
          selectedValues={selectedSources}
          onChange={(values) => handleSetSources(values)}
          placeholder="Select Sources"
        />
        <DropdownFilter
          icon={Calendar}
          options={DATE_RANGES.map((range) => ({
            label: range.label,
            value: range.value,
          }))}
          selected={selectedDateRange}
          setSelected={(option) => handleSetDateRange(option)}
          placeholder="Date"
        />

        <DropdownFilter
          icon={Filter}
          options={CATEGORIES}
          selected={selectedCategory}
          setSelected={(option) => handleSetCategory(option)}
          placeholder="Category"
        />
        <DropdownFilter
          icon={ArrowUpDown}
          options={SORT_OPTIONS}
          selected={selectedSortBy}
          setSelected={(option) => handleSetSortBy(option)}
          placeholder="Sort By"
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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
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
                  selected={selectedDateRange}
                  setSelected={(option) => handleSetDateRange(option)}
                  placeholder="Date"
                />
              </div>

              <div className="mb-4">
                <DropdownFilter
                  icon={Filter}
                  options={CATEGORIES}
                  selected={selectedCategory}
                  setSelected={(option) => handleSetCategory(option)}
                  placeholder="Category"
                />
              </div>
              <div className="mb-4">
                <DropdownFilter
                  icon={ArrowUpDown}
                  options={SORT_OPTIONS}
                  selected={selectedSortBy}
                  setSelected={(option) => handleSetSortBy(option)}
                  placeholder="Sort By"
                />
              </div>

              <div className="mb-4">
                <MultiSelectDropdown
                  options={SOURCES}
                  selectedValues={selectedSources}
                  onChange={(values) => handleSetSources(values)}
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
