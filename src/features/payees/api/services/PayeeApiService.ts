import {
  GetPayeeSchema,
  GetPayeesSchema,
  PayeeEntitySchema,
  type TGetPayee,
  type TGetPayees,
} from "@/features/payees/api/schema";
// import { getUserOrFail } from "@/features/auth/api/helpers/getUserOrFail";
// import type {
//   IPayeeCreatePayload,
//   IPayeeUpdatePayload,
// } from "@/features/payees/types";
import type { FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  serverTimestamp,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirebaseUserOrFail } from "@/features/auth/api/helpers/getFirebaseUserOrFail";
import type {
  IPayeeCreatePayload,
  IPayeeUpdatePayload,
} from "@/features/payees/types";

export class PayeeApiService {
  constructor(private readonly firebaseApp: FirebaseApp) {}

  async getPayees(): Promise<TGetPayees> {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    const payeesColRef = collection(db, "users", user.uid, "payees");
    const q = query(payeesColRef, orderBy("name"));

    const querySnapshot = await getDocs(q);
    const payees = querySnapshot.docs.map((doc) =>
      PayeeEntitySchema.parse({ id: doc.id, ...doc.data() })
    );

    return GetPayeesSchema.parse({
      payees,
    });
  }

  async createPayee({ name }: IPayeeCreatePayload): Promise<void> {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    const payeesColRef = collection(db, "users", user.uid, "payees");

    await addDoc(payeesColRef, {
      name,
      createdAt: serverTimestamp(),
    });
  }

  async getPayee(id: string): Promise<TGetPayee> {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    const payeeDocRef = doc(db, "users", user.uid, "payees", id);

    const docSnap = await getDoc(payeeDocRef);

    if (docSnap.exists()) {
      return GetPayeeSchema.parse({
        payee: PayeeEntitySchema.parse({ id: docSnap.id, ...docSnap.data() }),
      });
    }

    throw new Error(`Payee with id ${id} not found.`);
  }

  async updatePayee(id: string, payload: IPayeeUpdatePayload): Promise<void> {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    const payeeDocRef = doc(db, "users", user.uid, "payees", id);

    await updateDoc(payeeDocRef, {
      name: payload.name,
    });
  }

  async deletePayee(id: string): Promise<void> {
    const user = getFirebaseUserOrFail(this.firebaseApp);
    const db = getFirestore(this.firebaseApp);
    const payeeDocRef = doc(db, "users", user.uid, "payees", id);

    await deleteDoc(payeeDocRef);
  }
}
