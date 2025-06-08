import { Cookies } from "react-cookie";
import {
  AccountDefaultCookieSchema,
  type TAccountDefaultCookie,
} from "@/features/accounts/schema";
import { APP_COOKIE } from "@/lib/cookies/contants";

export function getDefaultAccountCookie(): TAccountDefaultCookie | null {
  const cookies = new Cookies();
  const accountDefaultCookie =
    cookies.get(APP_COOKIE.defaultSelectedAccount) || null;
  const result = AccountDefaultCookieSchema.safeParse(accountDefaultCookie);
  if (result.success) {
    return result.data;
  }
  return null;
}

export function setDefaultAccountCookie(data: unknown): void {
  const cookies = new Cookies();
  const result = AccountDefaultCookieSchema.safeParse(data);
  if (result.success) {
    cookies.set(APP_COOKIE.defaultSelectedAccount, result.data, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
  } else {
    console.error(
      "Invalid data for setting default account cookie:",
      result.error
    );
  }
}

export function removeDefaultAccountCookie(): void {
  const cookies = new Cookies();
  cookies.remove(APP_COOKIE.defaultSelectedAccount);
}
