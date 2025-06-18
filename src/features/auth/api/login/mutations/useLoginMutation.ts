import { firebaseApp } from "@/lib/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface ILoginMutationArgs {
  payload: {
    email: string;
    password: string;
  };
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async ({
      payload: { email, password },
    }: ILoginMutationArgs) => {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
    },
  });
}
