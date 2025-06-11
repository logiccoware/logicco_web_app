import { useCallback } from "react";
import daysjs from "dayjs";

interface IProps {
  monthQueryParam?: string;
}

export function useMonthSwitcher({ monthQueryParam }: IProps) {
  const currentMonth = monthQueryParam
    ? daysjs(monthQueryParam)
    : daysjs(new Date());

  const getMonth = useCallback(
    (direction: "prev" | "next") => {
      const newMonth =
        direction === "prev"
          ? currentMonth.subtract(1, "month")
          : currentMonth.add(1, "month");

      const formattedDate = newMonth.startOf("month").format("YYYY-MM-DD");
      return formattedDate;
    },
    [currentMonth]
  );

  const monthLabel = currentMonth.format("MMMM YYYY").toString();

  return {
    monthLabel,
    getMonth,
  };
}
