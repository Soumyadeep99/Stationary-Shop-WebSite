import React from "react";
import { Search, X } from "lucide-react";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search products...",
  className = "",
}) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
        <Search className="w-5 h-5" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-sm bg-surface-card text-text-primary placeholder:text-text-muted rounded-full border border-border hover:border-text-muted/60 focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-base shadow-2xs"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted hover:text-text-primary transition-base cursor-pointer"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
