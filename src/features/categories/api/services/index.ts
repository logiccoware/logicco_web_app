import { CategoryApiService } from "@/features/categories/api/services/CategoryApiService";
import { firebaseApp } from "@/lib/firebase/client";

export const categoryApiService = new CategoryApiService(firebaseApp);
