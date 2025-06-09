import { CategoryApiService } from "@/features/categories/api/services/CategoryApiService";
import { supabase } from "@/lib/supabase/services";

export const categoryApiService = new CategoryApiService(supabase);
