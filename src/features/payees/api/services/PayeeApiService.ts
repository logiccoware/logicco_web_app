import type { SupabaseClient } from "@supabase/supabase-js";
import {
  GetPayeeSchema,
  GetPayeesSchema,
  type TGetPayee,
  type TGetPayees,
} from "@/features/payees/api/schema";
import { getUserOrFail } from "@/features/auth/api/helpers/getUserOrFail";
import type {
  IPayeeCreatePayload,
  IPayeeUpdatePayload,
} from "@/features/payees/types";

export class PayeeApiService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getPayees(): Promise<TGetPayees> {
    const { data } = await this.supabase
      .from("payees")
      .select("id,name")
      .order("name");
    return GetPayeesSchema.parse({
      payees: data ?? [],
    });
  }

  async createPayee({ name }: IPayeeCreatePayload): Promise<void> {
    const user = await getUserOrFail();
    const { error } = await this.supabase.from("payees").insert([
      {
        name,
        user_id: user.id,
      },
    ]);

    if (error) {
      throw new Error(`Failed to create payee: ${error.message}`);
    }
  }

  async getPayee(id: string): Promise<TGetPayee | null> {
    const user = await getUserOrFail();
    const { data, error } = await this.supabase
      .from("payees")
      .select("id,name")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error(`Failed to fetch payee: ${error.message}`);
      return null;
    }

    return GetPayeeSchema.parse({
      payee: data,
    });
  }

  async updatePayee(id: string, { name }: IPayeeUpdatePayload): Promise<void> {
    const user = await getUserOrFail();
    const { error } = await this.supabase
      .from("payees")
      .update({ name, user_id: user?.id })
      .eq("id", id)
      .eq("user_id", user?.id);

    if (error) {
      throw new Error(`Failed to update payee: ${error.message}`);
    }
  }

  async deletePayee(id: string): Promise<void> {
    const user = await getUserOrFail();
    const { error } = await this.supabase
      .from("payees")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Failed to delete payee: ${error.message}`);
    }
  }
}
