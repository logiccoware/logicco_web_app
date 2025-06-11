import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export interface IGetRangeBetweenFromMonthResult {
  startOfMonth: string;
  endOfMonth: string;
}

export function getRangeBetweenFromMonth(
  month?: string
): IGetRangeBetweenFromMonthResult {
  const tz = "America/Winnipeg";
  const base = month ? dayjs.tz(month, tz) : dayjs().tz(tz);
  const startOfMonth = base
    .startOf("month")
    .utc()
    .format("YYYY-MM-DD HH:mm:ss[Z]");
  const endOfMonth = base.endOf("month").utc().format("YYYY-MM-DD HH:mm:ss[Z]");

  return {
    startOfMonth,
    endOfMonth,
  };
}
