import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { DateRangeValue } from "@/features/filters/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateRange(dateRange: string) {
  const now = moment();
  switch (dateRange) {
    case "today":
      return { from: now.startOf("day"), to: now.endOf("day") };
    case "yesterday":
      return {
        from: now.subtract(1, "day").startOf("day"),
        to: now.subtract(1, "day").endOf("day"),
      };
    case "lastWeek":
      return {
        from: now.subtract(1, "week").startOf("day"),
        to: now.endOf("day"),
      };
    case "lastMonth":
      return {
        from: now.subtract(1, "month").startOf("day"),
        to: now.endOf("day"),
      };
    case "lastYear":
      return {
        from: now.subtract(1, "year").startOf("day"),
        to: now.endOf("day"),
      };
    default:
      return { from: now.startOf("day"), to: now.endOf("day") };
  }
}

export function dateRangeLabel(value: DateRangeValue) {
  const labelMap: Record<DateRangeValue, string> = {
    today: "Today",
    yesterday: "Yesterday",
    lastWeek: "Last Week",
    lastMonth: "Last Month",
    lastYear: "Last Year",
  };
  return labelMap[value];
}
