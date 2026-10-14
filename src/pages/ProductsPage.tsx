import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/ui/SearchBar";
import { CategoryFilter } from "../components/ui/CategoryFilter";
import { ProductGrid } from "../components/product/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import { productCategories, type Category } from "../config/shop";

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useProducts();

  // Read search and category parameters from URL or component state
  const searchQuery = searchParams.get("search") || "";
  const rawCategoryParam = searchParams.get("category");

  // Validate that category query parameter matches known productCategories
  const selectedCategory: Category | null = useMemo(() => {
    if (!rawCategoryParam) return null;
    return productCategories.includes(rawCategoryParam as Category)
      ? (rawCategoryParam as Category)
      : null;
  }, [rawCategoryParam]);

  const handleSearchChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value.trim()) {
          next.set("search", value);
        } else {
          next.delete("search");
        }
        return next;
      },
      { replace: true }
    );
  };

  const handleCategoryChange = (category: Category | null) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (category) {
          next.set("category", category);
        } else {
          next.delete("category");
        }
        return next;
      },
      { replace: true }
    );
  };

  // Client-side filtering:
  // 1. Only show available products (isAvailable === true)
  // 2. Filter by selected category
  // 3. Filter by search query (case-insensitive name match)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.isAvailable) return false;

      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDescription = Boolean(
          product.description?.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ─── Header ─── */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
          Products
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          আমাদের দোকানের সমস্ত পণ্যের তালিকা দেখে নিন
        </p>
      </div>

      {/* ─── Filters & Search ─── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="পণ্য বা জিনিসের নাম খুঁজুন (Search by name)..."
            className="w-full sm:max-w-md"
          />

          {!loading && (
            <p className="text-xs sm:text-sm text-text-muted shrink-0">
              Showing{" "}
              <span className="font-semibold text-text-primary">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>

        <CategoryFilter
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {/* ─── Error Notification ─── */}
      {error && (
        <div className="p-4 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
          পণ্য লোড করতে সমস্যা হয়েছে: {error}
        </div>
      )}

      {/* ─── Product Grid ─── */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        emptyMessage={
          searchQuery.trim() || selectedCategory
            ? "আপনার খোঁজের সাথে কোনো পণ্য মেলেনি। অন্য কিছু লিখে খুঁজুন বা ফিল্টার পরিবর্তন করুন।"
            : "বর্তমানে কোনো পণ্য পাওয়া যায়নি।"
        }
      />
    </div>
  );
};

export default ProductsPage;
