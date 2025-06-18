import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type TGetCategoriesFlat,
  GetCategoriesFlatSchema,
  TreeViewBaseItemsSchema,
} from "@/features/categories/schema";
import type { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { getUserOrFail } from "@/features/auth/api/helpers/getUserOrFail";
import type {
  ICategoryCreatePayload,
  ICategoryUpdatePayload,
} from "@/features/categories/types";
import type { FirebaseApp } from "firebase/app";
import { getFirebaseUserOrFail } from "@/features/auth/api/helpers/getFirebaseUserOrFail";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export class CategoryApiService {
  constructor(private readonly firebaseApp: FirebaseApp) {}

  private getCategoriesCollectionRef() {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    return collection(db, "users", user.uid, "categories");
  }

  private getCategoryDocRef(categoryId: string) {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    return doc(db, "users", user.uid, "categories", categoryId);
  }

  async getTreeViewBaseItems(): Promise<TreeViewBaseItem[]> {
    const querySnapshot = await getDocs(
      query(this.getCategoriesCollectionRef(), orderBy("label"))
    );
    const categoriesTree = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    return TreeViewBaseItemsSchema.parse(categoriesTree);
  }

  async createCategory(
    { name }: ICategoryCreatePayload,
    parentCategoryId?: string
  ): Promise<string> {
    // adding subCategory
    if (parentCategoryId) {
      const parentRef = this.getCategoryDocRef(parentCategoryId);
      const newSubcategory = {
        id: nanoid(),
        label: name,
      };

      await updateDoc(parentRef, {
        children: arrayUnion(newSubcategory),
      });

      return newSubcategory.id;
    } else {
      // adding top-level category
      const newCategoryRef = await addDoc(this.getCategoriesCollectionRef(), {
        label: name,
        children: [],
        createdAt: serverTimestamp(),
      });

      return newCategoryRef.id;
    }
  }
}

// async updateCategory(
//   categoryId: string,
//   { name }: ICategoryUpdatePayload
// ): Promise<void> {
//   const user = await getUserOrFail();
//   const { error } = await this.supabase
//     .from("categories")
//     .update({ name })
//     .eq("id", categoryId)
//     .eq("user_id", user?.id);

//   if (error) {
//     throw new Error(`Failed to update category: ${error.message}`);
//   }
// }

// async deleteCategory(categoryId: string): Promise<void> {
//   const user = await getUserOrFail();
//   const { error } = await this.supabase
//     .from("categories")
//     .delete()
//     .eq("id", categoryId)
//     .eq("user_id", user?.id);

//   if (error) {
//     throw new Error(`Failed to delete category: ${error.message}`);
//   }
// }
