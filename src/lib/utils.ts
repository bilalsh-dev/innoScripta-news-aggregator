import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getDateRange(dateRange: string) {
  const now = moment();

  switch (dateRange) {
    case "today":
      return { from: now.clone().startOf("day"), to: now.clone().endOf("day") };

    case "yesterday":
      return {
        from: now.clone().subtract(1, "day").startOf("day"),
        to: now.clone().subtract(1, "day").endOf("day"),
      };

    case "lastWeek":
      return {
        from: now.clone().subtract(1, "week").startOf("week"),
        to: now.clone().subtract(1, "week").endOf("week"),
      };

    case "lastMonth":
      return {
        from: now.clone().subtract(1, "month").startOf("month"),
        to: now.clone().subtract(1, "month").endOf("month"),
      };

    case "lastYear":
      return {
        from: now.clone().subtract(1, "year").startOf("year"),
        to: now.clone().subtract(1, "year").endOf("year"),
      };

    default:
      return { from: now.clone().startOf("day"), to: now.clone().endOf("day") };
  }
}

export type DateRangeValue =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastMonth"
  | "lastYear";

export function dateRangeLabel(value: DateRangeValue) {
  const labelMap: Record<DateRangeValue, string> = {
    today: "Today",
    yesterday: "Yesterday",
    lastWeek: "Last Week",
    lastMonth: "Last Month",
    lastYear: "Last Year",
  };

  return labelMap[value] || "Unknown";
}
