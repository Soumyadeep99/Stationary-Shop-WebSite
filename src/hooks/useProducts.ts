import { useState, useEffect, useCallback } from "react";
import type { Product, Category } from "../types";
import {
  getProducts,
  getNewArrivals,
  getProductsByCategory,
} from "../services/productService";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/** Fetch all products. */
export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, loading, error, refresh: fetch };
}

/** Fetch only new arrivals. */
export function useNewArrivals(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNewArrivals();
      setProducts(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load new arrivals.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, loading, error, refresh: fetch };
}

/** Fetch products by category. */
export function useProductsByCategory(
  category: Category | null
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (category) {
        const data = await getProductsByCategory(category);
        setProducts(data);
      } else {
        const data = await getProducts();
        // Only show available products on customer side
        setProducts(data.filter((p) => p.isAvailable));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { products, loading, error, refresh: fetch };
}
