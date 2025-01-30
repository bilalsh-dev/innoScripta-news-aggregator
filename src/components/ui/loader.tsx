import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "md", className }) => {
  const sizeClasses = {
    sm: "w-4 h-4 ",
    md: "w-6 h-6 ",
    lg: "w-8 h-8 ",
  };
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full animate-ping",
          "bg-primary/30 dark:bg-primary/20"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 rounded-full border-4 border-t-primary border-b-primary border-l-transparent border-r-transparent",
          "animate-spin-slow"
        )}
      />

      <div
        className={cn(
          "absolute w-1/3 h-1/3 rounded-full bg-primary dark:bg-primary-light animate-pulse"
        )}
      />
    </div>
  );
};
