import React from "react";
import { Sparkles } from "lucide-react";
import { ProductGrid } from "../components/product/ProductGrid";
import { useNewArrivals } from "../hooks/useProducts";

export const NewArrivalsPage: React.FC = () => {
  const { products, loading, error } = useNewArrivals();

  // Filter only available items
  const availableNewArrivals = products.filter((p) => p.isAvailable);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ─── Header ─── */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm">
          <Sparkles className="w-5 h-5 text-primary-600" aria-hidden="true" />
          <span>নতুন সংগ্রহ / Latest Collection</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-text-primary tracking-tight">
          New Arrivals
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          আমাদের দোকানে সম্প্রতি যোগ করা নতুন পণ্যসমূহ দেখুন
        </p>
      </div>

      {/* ─── Error Notification ─── */}
      {error && (
        <div className="p-4 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
          পণ্য লোড করতে সমস্যা হয়েছে: {error}
        </div>
      )}

      {/* ─── Product Grid ─── */}
      <ProductGrid
        products={availableNewArrivals}
        loading={loading}
        emptyMessage="No new arrivals at the moment. Check back soon!"
      />
    </div>
  );
};

export default NewArrivalsPage;
