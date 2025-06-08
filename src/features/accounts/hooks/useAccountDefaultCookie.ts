import { useCookies } from "react-cookie";
import type { IAppCookie } from "@/lib/cookies/types";
import { APP_COOKIE } from "@/lib/cookies/contants";

export function useAccountDefaultCookie() {
  const [cookies] = useCookies<
    typeof APP_COOKIE.defaultSelectedAccount,
    IAppCookie
  >([APP_COOKIE.defaultSelectedAccount]);

  return {
    accountDefaultCookie: cookies[APP_COOKIE.defaultSelectedAccount] ?? null,
  };
}
