import { AccountApiService } from "@/features/accounts/api/services/AccountApiService";
import { firebaseApp } from "@/lib/firebase/client";

export const accountsApiService = new AccountApiService(firebaseApp);
