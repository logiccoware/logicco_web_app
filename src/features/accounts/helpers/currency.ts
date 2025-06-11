import currency from "currency.js";
import type { TCurrencyCode } from "@/features/accounts/schema";

const cad = (value: number) =>
  currency(value / 100, { symbol: "$", separator: ",", decimal: "." });

const usd = (value: number) =>
  currency(value / 100, { symbol: "$", separator: ",", decimal: "." });

const inr = (value: number) =>
  currency(value / 100, { symbol: "₹", separator: ",", decimal: "." });

export function formatCurrency(amount: number, currencyCode: TCurrencyCode) {
  switch (currencyCode) {
    case "CAD":
      return cad(amount).format();
    case "USD":
      return usd(amount).format();
    case "INR":
      return inr(amount).format();
    default:
      return currency(amount / 100).format(); // Fallback to default formatting
  }
}
