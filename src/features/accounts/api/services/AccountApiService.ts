import type { SupabaseClient } from "@supabase/supabase-js";
import {
  GetAccountsSchema,
  GetAccountSchema,
  type TGetAccount,
  type TGetAccounts,
} from "@/features/accounts/schema";
import { getUserOrFail } from "@/features/auth/api/helpers/getUserOrFail";
import type {
  IAccountCreatePayload,
  IAccountUpdatePayload,
} from "@/features/accounts/types";
import {
  setDefaultAccountCookie,
  getDefaultAccountCookie,
  removeDefaultAccountCookie,
} from "@/features/accounts/helpers/cookie";

export class AccountApiService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAccounts(): Promise<TGetAccounts> {
    const { data } = await this.supabase
      .from("accounts")
      .select("id,name,currency")
      .order("name");
    return GetAccountsSchema.parse({
      accounts: data ?? [],
    });
  }

  async createAccount({
    name,
    markDefault,
  }: IAccountCreatePayload): Promise<void> {
    const user = await getUserOrFail();

    const { error, data } = await this.supabase
      .from("accounts")
      .insert([
        {
          name,
          user_id: user.id,
        },
      ])
      .select("id,name,currency")
      .single();

    if (error) {
      throw new Error(`Failed to create account: ${error.message}`);
    }

    if (markDefault) {
      setDefaultAccountCookie(data);
    }
  }

  async getAccount(accountId: string): Promise<TGetAccount | null> {
    const user = await getUserOrFail();
    const { data, error } = await this.supabase
      .from("accounts")
      .select("id,name,currency")
      .eq("id", accountId)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error(`Failed to fetch account: ${error.message}`);
      return null;
    }

    return GetAccountSchema.parse({
      account: data,
    });
  }

  async updateAccount(
    accountId: string,
    { name, markDefault }: IAccountUpdatePayload
  ): Promise<void> {
    const user = await getUserOrFail();

    const { error, data } = await this.supabase
      .from("accounts")
      .update({ name, user_id: user?.id })
      .eq("id", accountId)
      .eq("user_id", user?.id)
      .select("id,name,currency")
      .single();

    if (error) {
      throw new Error(`Failed to update account: ${error.message}`);
    }

    const defaultAccountCookie = getDefaultAccountCookie();

    if (markDefault) {
      setDefaultAccountCookie(data);
    }

    if (defaultAccountCookie?.id === accountId && !markDefault) {
      removeDefaultAccountCookie();
    }
  }

  async deleteAccount(accountId: string): Promise<void> {
    const user = await getUserOrFail();
    const { error } = await this.supabase
      .from("accounts")
      .delete()
      .eq("id", accountId)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Failed to delete accounts: ${error.message}`);
    }

    const defaultAccountCookie = getDefaultAccountCookie();

    if (defaultAccountCookie?.id === accountId) {
      removeDefaultAccountCookie();
    }
  }
}
