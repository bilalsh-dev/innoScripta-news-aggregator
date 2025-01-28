import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui";
import { Button, Checkbox } from "@/components/ui";
import { Newspaper } from "lucide-react";
interface MultiSelectDropdownProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
}) => {
  const toggleOption = (value: string) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updatedValues);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full md:w-auto hover:bg-accent/50 transition-colors overflow-x-scroll overflow-y-hidden"
        >
          <Newspaper className="h-4 w-4" />
          {selectedValues.length > 0
            ? options
                .filter((opt) => selectedValues.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : placeholder}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => toggleOption(option.value)}
            className="cursor-pointer hover:bg-accent/50"
          >
            <Checkbox
              checked={selectedValues.includes(option.value)}
              className="mr-2"
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelectDropdown;
