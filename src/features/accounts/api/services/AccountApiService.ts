import {
  GetAccountsSchema,
  GetAccountSchema,
  type TGetAccount,
  type TGetAccounts,
} from "@/features/accounts/schema";
import type {
  IAccountCreatePayload,
  IAccountUpdatePayload,
} from "@/features/accounts/types";
import {
  setDefaultAccountCookie,
  getDefaultAccountCookie,
  removeDefaultAccountCookie,
} from "@/features/accounts/helpers/cookie";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getFirebaseUserOrFail } from "@/features/auth/api/helpers/getFirebaseUserOrFail";
import type { FirebaseApp } from "firebase/app";

export class AccountApiService {
  constructor(private readonly firebaseApp: FirebaseApp) {}

  private getAccountsCollectionRef() {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    return collection(db, "users", user.uid, "accounts");
  }

  private getAccountDocRef(accountId: string) {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    return doc(db, "users", user.uid, "accounts", accountId);
  }

  async getAccounts(): Promise<TGetAccounts> {
    const accountsColRef = this.getAccountsCollectionRef();
    const q = query(accountsColRef, orderBy("name"));

    const querySnapshot = await getDocs(q);
    const accounts = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return GetAccountsSchema.parse({ accounts });
  }

  async createAccount({ name, markDefault, currency }: IAccountCreatePayload) {
    const accountsColRef = this.getAccountsCollectionRef();
    const docRef = await addDoc(accountsColRef, {
      name,
      currency,
      createdAt: serverTimestamp(),
    });

    const docSnap = await getDoc(docRef);

    if (markDefault) {
      setDefaultAccountCookie({ id: docRef.id, ...docSnap.data() });
    }
  }

  async getAccount(accountId: string): Promise<TGetAccount> {
    const accountDocRef = this.getAccountDocRef(accountId);

    const docSnap = await getDoc(accountDocRef);

    if (docSnap.exists()) {
      return GetAccountSchema.parse({
        account: {
          id: docSnap.id,
          ...docSnap.data(),
        },
      });
    }

    throw new Error(`Account with ID ${accountId} not found`);
  }

  async updateAccount(
    accountId: string,
    { name, markDefault, currency }: IAccountUpdatePayload
  ): Promise<void> {
    const accountDocRef = this.getAccountDocRef(accountId);

    await updateDoc(accountDocRef, {
      name,
      currency,
    });

    const defaultAccountCookie = getDefaultAccountCookie();

    if (markDefault) {
      const updatedSnap = await getDoc(accountDocRef);
      setDefaultAccountCookie({ id: accountId, ...updatedSnap.data() });
    }

    if (defaultAccountCookie?.id === accountId && !markDefault) {
      removeDefaultAccountCookie();
    }
  }
  async deleteAccount(accountId: string): Promise<void> {
    const accountDocRef = this.getAccountDocRef(accountId);

    await deleteDoc(accountDocRef);

    const defaultAccountCookie = getDefaultAccountCookie();
    if (defaultAccountCookie?.id === accountId) {
      removeDefaultAccountCookie();
    }
  }
}
