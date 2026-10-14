import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";
import type { Product, ProductFormData, Category } from "../types";

const COLLECTION = "products";

/** Fetch all products, ordered by creation date (newest first). */
export async function getProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured) return [];

  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as Product
  );
}

/** Fetch only products marked as new arrivals. */
export async function getNewArrivals(): Promise<Product[]> {
  if (!isFirebaseConfigured) return [];

  const q = query(
    collection(db, COLLECTION),
    where("isNewArrival", "==", true),
    where("isAvailable", "==", true),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as Product
  );
}

/** Fetch products by category. */
export async function getProductsByCategory(
  category: Category
): Promise<Product[]> {
  if (!isFirebaseConfigured) return [];

  const q = query(
    collection(db, COLLECTION),
    where("category", "==", category),
    where("isAvailable", "==", true),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as Product
  );
}

/** Add a new product to Firestore. */
export async function addProduct(
  data: ProductFormData,
  imageUrl: string,
  imagePath: string
): Promise<string> {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  const now = Timestamp.now();
  const docRef = await addDoc(collection(db, COLLECTION),
    {
      ...Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      ),
      imageUrl,
      imagePath,
      createdAt: now,
      updatedAt: now,
    }
  );
  return docRef.id;
}

/** Update an existing product. */
export async function updateProduct(
  id: string,
  data: Partial<ProductFormData> & { imageUrl?: string; imagePath?: string }
): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  const docRef = doc(db, COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

/** Delete a product from Firestore. */
export async function deleteProduct(id: string): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }

  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}
