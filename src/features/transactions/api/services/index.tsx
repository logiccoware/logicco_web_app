import { TransactionApiService } from "@/features/transactions/api/services/TransactionApiService";
import { supabase } from "@/lib/supabase/services";

export const transactionApiService = new TransactionApiService(supabase);
