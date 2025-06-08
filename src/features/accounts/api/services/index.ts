import { AccountApiService } from "@/features/accounts/api/services/AccountApiService";
import { supabase } from "@/lib/supabase/services";

export const accountsApiService = new AccountApiService(supabase);
