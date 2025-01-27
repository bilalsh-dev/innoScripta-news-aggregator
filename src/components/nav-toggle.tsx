import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";
import { Menu } from "lucide-react";
export function NavToggle() {
  const { toggleSidebar } = useTheme();

  return (
    <div className="flex md:hidden">
      <Button variant="ghost" size="icon" onClick={() => toggleSidebar()}>
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
}
