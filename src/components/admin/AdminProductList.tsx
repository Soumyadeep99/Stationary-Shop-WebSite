import React from "react";
import { Package } from "lucide-react";
import type { Product } from "../../types";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { EmptyState } from "../ui/EmptyState";
import { AdminProductCard } from "./AdminProductCard";

export interface AdminProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggleAvailability: (product: Product) => void;
  onToggleNewArrival: (product: Product) => void;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({
  products,
  loading,
  onEdit,
  onDelete,
  onToggleAvailability,
  onToggleNewArrival,
}) => {
  if (loading) {
    return (
      <div className="py-16">
        <LoadingSpinner message="পণ্য লোড হচ্ছে... (Loading products...)" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="কোনো পণ্য পাওয়া যায়নি (No products yet)"
        description="No products yet. Add your first product!"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <AdminProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleAvailability={onToggleAvailability}
          onToggleNewArrival={onToggleNewArrival}
        />
      ))}
    </div>
  );
};

export default AdminProductList;
