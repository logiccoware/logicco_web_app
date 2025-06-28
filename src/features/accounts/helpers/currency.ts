import currencyJs from "currency.js";
import type { TCurrencyCode } from "@/features/accounts/schema";

const cad = (value: number) =>
  currencyJs(value, {
    symbol: "$",
    separator: ",",
    decimal: ".",
    fromCents: true,
  });

const usd = (value: number) =>
  currencyJs(value, {
    symbol: "$",
    separator: ",",
    decimal: ".",
    fromCents: true,
  });

const inr = (value: number) =>
  currencyJs(value, {
    symbol: "₹",
    separator: ",",
    decimal: ".",
    fromCents: true,
  });

export function currencyFactory(amount: number, currencyCode: TCurrencyCode) {
  switch (currencyCode) {
    case "CAD":
      return cad(amount);
    case "USD":
      return usd(amount);
    case "INR":
      return inr(amount);
    default:
      return cad(amount);
  }
}

export function formatAmount(amount: number, currencyCode: TCurrencyCode) {
  return currencyFactory(amount, currencyCode).format();
}
