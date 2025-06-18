import { firebaseApp } from "@/lib/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";

export function useLogoutMutation() {
  return useMutation({
    mutationFn: async (_payload: null) => {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
    },
  });
}
