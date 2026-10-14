import { Timestamp } from "firebase/firestore";
import type { Category } from "../config/shop";

export type { Category };

export interface Product {
  id: string;
  name: string;
  category: Category;
  price?: number;
  description?: string;
  imageUrl: string;
  imagePath: string; // Firebase Storage path — needed for deletion
  isAvailable: boolean;
  isNewArrival: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** Data required to create or update a product (excludes auto-generated fields) */
export interface ProductFormData {
  name: string;
  category: Category;
  price?: number;
  description?: string;
  isAvailable: boolean;
  isNewArrival: boolean;
}
