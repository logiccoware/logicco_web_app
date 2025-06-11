import { supabase } from "@/lib/supabase/services";
import { SpendingApiService } from "@/features/spendings/api/services/SpendingApiService";

export const spendingApiService = new SpendingApiService(supabase);
