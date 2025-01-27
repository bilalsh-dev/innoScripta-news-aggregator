import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { NavToggle } from "../nav-toggle";

const Navbar: React.FC = () => {
  return (
    <Card className="bg-card py-4 px-6 border-0 flex items-center justify-between rounded-none shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent animate-gradient">
          The InnoScripta Post
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <NavToggle />
      </div>
    </Card>
  );
};

export default Navbar;
