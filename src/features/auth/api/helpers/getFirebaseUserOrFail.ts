import type { FirebaseApp } from "firebase/app";
import { getAuth, type User } from "firebase/auth";

export function getFirebaseUserOrFail(firebaseApp: FirebaseApp): User {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not found or authentication error");
  }
  return user;
}
