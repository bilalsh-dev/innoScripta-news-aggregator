import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from "@/components/ui";
import { Search, Calendar, Filter, Newspaper, X } from "lucide-react";
import { useTheme } from "@/components/theme";
import { useState } from "react";

type DropdownOption = string;

interface DropdownFilterProps {
  icon: React.ElementType;
  options: DropdownOption[];
  selected: DropdownOption;
  setSelected: (option: DropdownOption) => void;
  placeholder: string;
}

const DATE_OPTIONS: DropdownOption[] = ["Today", "Last 7 Days", "Last 30 Days"];
const CATEGORY_OPTIONS: DropdownOption[] = [
  "Politics",
  "Technology",
  "Business",
];
const SOURCE_OPTIONS: DropdownOption[] = [
  "ABC News",
  "Reuters",
  "The Guardian",
];

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  icon: Icon,
  options,
  selected,
  setSelected,
  placeholder,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="flex items-center gap-2 w-full md:w-auto hover:bg-accent/50 transition-colors"
      >
        <Icon className="h-4 w-4" />
        {selected || placeholder}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-48">
      {options.map((option) => (
        <DropdownMenuItem
          key={option}
          onClick={() => setSelected(option)}
          className="cursor-pointer hover:bg-accent/50"
        >
          {option}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const ArticleFilter: React.FC<object> = () => {
  const { isSidebarOpen, closeSidebar } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DropdownOption>("");
  const [selectedCategory, setSelectedCategory] = useState<DropdownOption>("");
  const [selectedSource, setSelectedSource] = useState<DropdownOption>("");

  const handleSearch = () => {
    console.log(
      "Searching for:",
      searchQuery,
      selectedDate,
      selectedCategory,
      selectedSource
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDate("");
    setSelectedCategory("");
    setSelectedSource("");
  };

  const isFilterActive =
    searchQuery || selectedDate || selectedCategory || selectedSource;

  return (
    <>
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-4xl mx-auto py-7">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full w-full bg-background hover:bg-accent/50 transition-colors"
          />
        </div>

        {/* Date Filter */}
        <DropdownFilter
          icon={Calendar}
          options={DATE_OPTIONS}
          selected={selectedDate}
          setSelected={setSelectedDate}
          placeholder="Date"
        />

        {/* Category Filter */}
        <DropdownFilter
          icon={Filter}
          options={CATEGORY_OPTIONS}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          placeholder="Category"
        />

        {/* Source Filter */}
        <DropdownFilter
          icon={Newspaper}
          options={SOURCE_OPTIONS}
          selected={selectedSource}
          setSelected={setSelectedSource}
          placeholder="Source"
        />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="rounded-full bg-primary hover:bg-primary/90 transition-colors"
        >
          Search
        </Button>

        {/* Reset Button (Conditional) */}
        {isFilterActive && (
          <Button
            variant="outline"
            onClick={resetFilters}
            className="hover:bg-accent/50 transition-colors"
          >
            Reset
          </Button>
        )}
      </div>

      {isSidebarOpen && (
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

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full w-full bg-background hover:bg-accent/50 transition-colors"
              />
            </div>

            {/* Date Filter */}
            <div className="mb-4">
              <DropdownFilter
                icon={Calendar}
                options={DATE_OPTIONS}
                selected={selectedDate}
                setSelected={setSelectedDate}
                placeholder="Date"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <DropdownFilter
                icon={Filter}
                options={CATEGORY_OPTIONS}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                placeholder="Category"
              />
            </div>

            {/* Source Filter */}
            <div className="mb-4">
              <DropdownFilter
                icon={Newspaper}
                options={SOURCE_OPTIONS}
                selected={selectedSource}
                setSelected={setSelectedSource}
                placeholder="Source"
              />
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="w-full mb-4 bg-primary hover:bg-primary/90 transition-colors"
            >
              Search
            </Button>

            {/* Reset Button (Conditional) */}
            {isFilterActive && (
              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full hover:bg-accent/50 transition-colors"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleFilter;
