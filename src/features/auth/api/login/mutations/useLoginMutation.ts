import { InvalidLoginCredentialsError } from "@/features/auth/exceptions/InvalidLoginCredentialsError";
import { supabase } from "@/lib/supabase/services";
import { useMutation } from "@tanstack/react-query";

interface ILoginMutationArgs {
  payload: {
    email: string;
    password: string;
  };
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async ({ payload }: ILoginMutationArgs) => {
      const { error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        throw new InvalidLoginCredentialsError();
      }
    },
  });
}
