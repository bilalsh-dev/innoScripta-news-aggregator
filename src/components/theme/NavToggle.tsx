import { Button } from "@/components/ui";
import { useTheme } from "@/components/theme";
import { Menu } from "lucide-react";
export default function NavToggle() {
  const { toggleSidebar } = useTheme();

  return (
    <div className="flex md:hidden">
      <Button variant="ghost" size="icon" onClick={() => toggleSidebar()}>
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
}
