import dayjs from "dayjs";
import type { TTransaction } from "@/features/transactions/schema";

export interface ITransactionsGroupByDate {
  date: string;
  transactions: TTransaction[];
}

/**
 * Groups an array of transactions by their date
 * @param transactions Array of transactions to group
 * @returns Array of objects containing date and transactions for that date
 */
export function getGroupedTransactionsByDate(
  transactions: TTransaction[]
): ITransactionsGroupByDate[] {
  const groupedMap = transactions.reduce((acc, transaction) => {
    const date = dayjs(transaction.date).format("YYYY-MM-DD"); // Format date using dayjs

    if (!acc.has(date)) {
      acc.set(date, []);
    }

    acc.get(date)?.push(transaction);
    return acc;
  }, new Map<string, TTransaction[]>());

  const result = Array.from(groupedMap.entries()).map(
    ([date, transactions]) => ({
      date,
      transactions,
    })
  );

  // Sort by date in descending order (newest first)
  result.sort((a, b) => {
    const dateA = dayjs(a.date).valueOf(); // Using dayjs for consistent date parsing
    const dateB = dayjs(b.date).valueOf();
    return dateB - dateA;
  });

  return result;
}