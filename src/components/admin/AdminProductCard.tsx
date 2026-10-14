import React from "react";
import { Pencil, Trash2, Eye, EyeOff, Sparkles } from "lucide-react";
import type { Product } from "../../types";
import { formatPrice, formatDate } from "../../utils/formatters";

export interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggleAvailability: (product: Product) => void;
  onToggleNewArrival: (product: Product) => void;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onToggleAvailability,
  onToggleNewArrival,
}) => {
  return (
    <div className="product-card bg-surface-card rounded-xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-base flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <div className="relative product-image-container bg-border-light">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {/* Availability Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shadow-xs ${
                product.isAvailable
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {product.isAvailable ? "Available" : "Unavailable"}
            </span>

            {/* New Arrival Badge */}
            {product.isNewArrival && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-600" />
                New Arrival
              </span>
            )}
          </div>
        </div>

        {/* Content details */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block text-xs font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <h3 className="font-semibold text-text-primary text-base font-bengali mt-1 leading-snug line-clamp-1">
                {product.name}
              </h3>
            </div>
            <p className="text-base font-bold text-primary-600 shrink-0">
              {formatPrice(product.price)}
            </p>
          </div>

          {product.description && (
            <p className="text-xs text-text-secondary line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="text-xs text-text-muted pt-1">
            যোগ করা হয়েছে: {formatDate(product.createdAt)}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="p-3 pt-0 border-t border-border mt-2 grid grid-cols-4 gap-1.5 bg-surface/50">
        {/* Toggle Availability */}
        <button
          type="button"
          onClick={() => onToggleAvailability(product)}
          className={`flex items-center justify-center p-2 rounded-lg border transition-base cursor-pointer ${
            product.isAvailable
              ? "border-border hover:bg-surface text-text-secondary hover:text-text-primary"
              : "border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100"
          }`}
          title={product.isAvailable ? "Mark Unavailable" : "Mark Available"}
          aria-label={product.isAvailable ? "Mark Unavailable" : "Mark Available"}
        >
          {product.isAvailable ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>

        {/* Toggle New Arrival */}
        <button
          type="button"
          onClick={() => onToggleNewArrival(product)}
          className={`flex items-center justify-center p-2 rounded-lg border transition-base cursor-pointer ${
            product.isNewArrival
              ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
              : "border-border hover:bg-surface text-text-secondary hover:text-text-primary"
          }`}
          title={product.isNewArrival ? "Remove from New Arrivals" : "Mark as New Arrival"}
          aria-label={product.isNewArrival ? "Remove from New Arrivals" : "Mark as New Arrival"}
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Edit Button */}
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="flex items-center justify-center p-2 rounded-lg border border-border bg-surface-card hover:bg-surface text-text-primary transition-base cursor-pointer shadow-2xs"
          title="Edit Product"
          aria-label="Edit Product"
        >
          <Pencil className="w-4 h-4 text-primary-600" />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onDelete(product)}
          className="flex items-center justify-center p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-danger transition-base cursor-pointer"
          title="Delete Product"
          aria-label="Delete Product"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
