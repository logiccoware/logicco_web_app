import type { TAccountDefaultCookie } from "@/features/accounts/schema";

export interface IAppCookie {
  defaultSelectedAccount: TAccountDefaultCookie | null;
}
