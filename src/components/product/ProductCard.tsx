import React, { useState } from "react";
import { Package } from "lucide-react";
import type { Product } from "../../types";
import { formatPrice } from "../../utils/formatters";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = Boolean(product.imageUrl && !imageError);

  return (
    <div
      className={`product-card group relative flex flex-col bg-surface-card rounded-xl border border-border overflow-hidden transition-base hover:shadow-md ${className}`}
    >
      {/* Image container */}
      <div className="product-image-container relative bg-border-light w-full">
        {hasImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
            <Package className="w-12 h-12 stroke-[1.5]" aria-hidden="true" />
            <span className="text-xs mt-1 text-text-secondary">ছবি নেই (No image)</span>
          </div>
        )}

        {/* New Arrival Badge */}
        {product.isNewArrival && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-success text-white shadow-xs">
              New
            </span>
          </div>
        )}

        {/* Unavailable overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 z-20 bg-surface-dark/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-md bg-surface-card/90 text-text-primary text-xs font-bold uppercase tracking-wider shadow-sm">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category badge */}
          <div className="mb-1.5">
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
              {product.category}
            </span>
          </div>

          {/* Product name */}
          <h3 className="text-sm sm:text-base font-medium text-text-primary line-clamp-2 leading-snug group-hover:text-primary-700 transition-base">
            {product.name}
          </h3>

          {/* Description if available */}
          {product.description && (
            <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price display */}
        <div className="pt-2 border-t border-border-light flex items-center justify-between">
          <span className="text-sm sm:text-base font-semibold text-text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
