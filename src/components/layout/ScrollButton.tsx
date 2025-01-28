import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui";

export const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setIsVisible(scrolled > 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div className="relative">
      {isVisible && (
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-8 right-2  z-50 rounded-full p-8 shadow-lg transition-transform duration-300 hover:scale-110 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-10 w-10" />
        </Button>
      )}
    </div>
  );
};
