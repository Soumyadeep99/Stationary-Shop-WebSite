import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  Pencil,
  Gift,
  GraduationCap,
  Palette,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react";
import { shopConfig, productCategories, type Category } from "../config/shop";
import { useNewArrivals } from "../hooks/useProducts";
import { ProductGrid } from "../components/product/ProductGrid";
import { telLink, whatsappLink } from "../utils/formatters";

const isPlaceholder = (val?: string): boolean => {
  if (!val) return true;
  const trimmed = val.trim();
  return trimmed.startsWith("[") && trimmed.endsWith("]");
};

const categoryIconMap: Record<Category, LucideIcon> = {
  Stationery: Pencil,
  Gifts: Gift,
  "School Supplies": GraduationCap,
  "Art & Craft": Palette,
  Other: MoreHorizontal,
};

export const HomePage: React.FC = () => {
  const { products: newArrivals, loading: newArrivalsLoading } = useNewArrivals();

  // Show up to 8 products for New Arrivals
  const displayedNewArrivals = newArrivals.slice(0, 8);

  const hasPhone = !isPlaceholder(shopConfig.phone);
  const hasWhatsapp = !isPlaceholder(shopConfig.whatsappNumber);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-surface py-16 sm:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-200">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{shopConfig.name}</span>
            </span>

            <h1 className="font-bengali text-3xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight">
              {shopConfig.tagline || "আপনার পছন্দের জিনিস, এক ঠিকানায়"}
            </h1>

            <p className="font-bengali text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              {shopConfig.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-base shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-surface-card border border-border text-text-primary font-medium hover:border-primary-500 hover:text-primary-700 transition-base shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── New Arrivals Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Fresh in Store</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              New Arrivals
            </h2>
          </div>
          {displayedNewArrivals.length > 0 && (
            <Link
              to="/new-arrivals"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-base"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        <ProductGrid
          products={displayedNewArrivals}
          loading={newArrivalsLoading}
          emptyMessage="নতুন কোনো পণ্য এই মুহূর্তে নেই। শীঘ্রই আবার দেখুন! (No new arrivals at the moment. Check back soon!)"
        />
      </section>

      {/* ─── Category Quick Links Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Browse by Category
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Find exactly what you are looking for across our collections
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {productCategories.map((category) => {
            const Icon = categoryIconMap[category] || MoreHorizontal;
            return (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="group flex flex-col items-center text-center p-6 bg-surface-card rounded-xl border border-border hover:border-primary-500 hover:shadow-md transition-base"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-base">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-text-primary group-hover:text-primary-700 transition-base">
                  {category}
                </span>
                <span className="text-xs text-text-muted mt-1 inline-flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-base" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-50 rounded-2xl border border-primary-200 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xs">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-900 tracking-tight">
            Looking for something specific?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            Need a particular book, gift set, or custom item? Get in touch with us directly and we will be happy to assist you.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {hasPhone && (
              <a
                href={telLink(shopConfig.phone)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-card border border-border text-text-primary font-medium hover:border-primary-500 hover:text-primary-700 shadow-2xs transition-base"
              >
                <Phone className="w-4 h-4 text-primary-600" aria-hidden="true" />
                <span>Call Us ({shopConfig.phone})</span>
              </a>
            )}
            {hasWhatsapp && (
              <a
                href={whatsappLink(
                  shopConfig.whatsappNumber,
                  "নমস্কার, আমি একটি জিনিস সম্পর্কে অনুসন্ধান করতে চাই।"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-sm transition-base"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
            {!hasPhone && !hasWhatsapp && (
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-sm transition-base"
              >
                <span>Visit Contact Page</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
