import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

type DropdownOption = string;

interface DropdownFilterProps {
  icon: React.ElementType;
  //   options: DropdownOption[];
  options: { label: string; value: string }[];
  selected: DropdownOption;
  setSelected: (option: DropdownOption) => void;
  placeholder: string;
}

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
          key={option.value}
          onClick={() => setSelected(option.value)}
          className="cursor-pointer hover:bg-accent/50"
        >
          {option.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default DropdownFilter;
