import { supabase } from "@/lib/supabase/services";
import type { User } from "@supabase/supabase-js";

export async function getUserOrFail(): Promise<User> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    throw new Error("User not found or authentication error");
  }

  return user;
}
