import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Plus, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../hooks/useProducts";
import { deleteProduct, updateProduct } from "../services/productService";
import { deleteProductImage } from "../services/storageService";
import { useToast } from "../components/ui/Toast";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { AdminProductList } from "../components/admin/AdminProductList";
import { ProductForm } from "../components/admin/ProductForm";
import type { Product } from "../types";

export const AdminDashboard: React.FC = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const { products, loading: productsLoading, refresh } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // If auth is still checking, show loading spinner
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="যাচাই করা হচ্ছে... (Authenticating...)" />
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে (Failed to logout)");
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingProduct(null);
    await refresh();
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;

    setIsDeleting(true);
    try {
      await deleteProduct(deletingProduct.id);
      if (deletingProduct.imagePath) {
        try {
          await deleteProductImage(deletingProduct.imagePath);
        } catch (imgErr) {
          console.error("Failed to delete product image from storage:", imgErr);
        }
      }
      toast.success("পণ্যটি মুছে ফেলা হয়েছে (Product deleted successfully)");
      setDeletingProduct(null);
      await refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete product.";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    try {
      await updateProduct(product.id, { isAvailable: !product.isAvailable });
      toast.success(
        product.isAvailable
          ? "পণ্য অনুপলব্ধ করা হয়েছে (Marked unavailable)"
          : "পণ্য উপলব্ধ করা হয়েছে (Marked available)"
      );
      await refresh();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to update availability.";
      toast.error(msg);
    }
  };

  const handleToggleNewArrival = async (product: Product) => {
    try {
      await updateProduct(product.id, { isNewArrival: !product.isNewArrival });
      toast.success(
        product.isNewArrival
          ? "নতুন পণ্যের তালিকা থেকে সরানো হয়েছে (Removed from new arrivals)"
          : "নতুন পণ্য হিসেবে চিহ্নিত করা হয়েছে (Marked as new arrival)"
      );
      await refresh();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to update new arrival status.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              দোকানের পণ্য তালিকা ও পরিচালনা করুন (Manage store products)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddProduct}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-base cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন পণ্য যোগ (Add Product)</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-border bg-surface-card hover:bg-surface text-text-secondary hover:text-text-primary font-medium text-sm transition-base cursor-pointer shadow-2xs"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">লগআউট (Logout)</span>
            </button>
          </div>
        </div>

        {/* Product Management List */}
        <div>
          <AdminProductList
            products={products}
            loading={productsLoading}
            onEdit={handleEditProduct}
            onDelete={(prod) => setDeletingProduct(prod)}
            onToggleAvailability={handleToggleAvailability}
            onToggleNewArrival={handleToggleNewArrival}
          />
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct || undefined}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dark/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="w-full max-w-md bg-surface-card rounded-2xl border border-border p-6 shadow-xl space-y-4">
            <h3
              id="delete-dialog-title"
              className="text-lg font-bold text-text-primary font-bengali"
            >
              পণ্য মুছে ফেলা (Delete Product)
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Delete <strong className="text-text-primary">{deletingProduct.name}</strong>? This cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 rounded-lg border border-border bg-surface-card hover:bg-surface text-text-primary text-sm font-medium transition-base cursor-pointer disabled:opacity-50"
              >
                বাতিল (Cancel)
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-base cursor-pointer shadow-sm disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>মুছে ফেলা হচ্ছে...</span>
                  </>
                ) : (
                  <span>মুছে ফেলুন (Delete)</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
