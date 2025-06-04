import { supabase } from "@/lib/supabase/services";
import { useMutation } from "@tanstack/react-query";

export function useLogoutMutation() {
  return useMutation({
    mutationFn: async (_payload: null) => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error("Logout failed");
      }
    },
  });
}
