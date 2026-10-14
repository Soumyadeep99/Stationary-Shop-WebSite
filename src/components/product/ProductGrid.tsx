import React from "react";
import { Package } from "lucide-react";
import type { Product } from "../../types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { EmptyState } from "../ui/EmptyState";
import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  products: Product[];
  loading: boolean;
  emptyMessage?: string;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  emptyMessage = "কোনো পণ্য পাওয়া যায়নি (No products found)",
  className = "",
}) => {
  if (loading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <LoadingSpinner message="পণ্য লোড হচ্ছে... (Loading products...)" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-8">
        <EmptyState
          icon={Package}
          title="কোনো পণ্য নেই"
          description={emptyMessage}
        />
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
