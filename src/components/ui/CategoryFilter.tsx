import React from "react";
import { productCategories, type Category } from "../../config/shop";

export interface CategoryFilterProps {
  selected: Category | null;
  onChange: (category: Category | null) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selected,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth ${className}`}
      role="tablist"
      aria-label="Filter by category"
    >
      {/* "All" category pill */}
      <button
        type="button"
        role="tab"
        aria-selected={selected === null}
        onClick={() => onChange(null)}
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-base cursor-pointer ${
          selected === null
            ? "bg-primary-600 text-white shadow-xs"
            : "bg-border-light text-text-secondary hover:text-text-primary hover:bg-border"
        }`}
      >
        All
      </button>

      {/* Individual category pills */}
      {productCategories.map((category) => {
        const isSelected = selected === category;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(category)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-base cursor-pointer ${
              isSelected
                ? "bg-primary-600 text-white shadow-xs"
                : "bg-border-light text-text-secondary hover:text-text-primary hover:bg-border"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
