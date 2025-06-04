import { PayeeApiService } from "@/features/payees/api/services/PayeeApiService";
import { supabase } from "@/lib/supabase/services";

export const payeeApiService = new PayeeApiService(supabase);
