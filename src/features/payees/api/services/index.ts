import { PayeeApiService } from "@/features/payees/api/services/PayeeApiService";
import { firebaseApp } from "@/lib/firebase/client";

export const payeeApiService = new PayeeApiService(firebaseApp);
