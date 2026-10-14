import React, { useState } from "react";
import { X, Loader2, Save } from "lucide-react";
import type { Product, ProductFormData } from "../../types";
import { productCategories, type Category } from "../../config/shop";
import { addProduct, updateProduct } from "../../services/productService";
import { uploadProductImage, deleteProductImage } from "../../services/storageService";
import { ImageUploader } from "./ImageUploader";
import { useToast } from "../ui/Toast";

export interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onClose,
  onSuccess,
}) => {
  const toast = useToast();
  const isEditing = Boolean(product);

  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState<Category>(
    product?.category || productCategories[0]
  );
  const [price, setPrice] = useState<string>(
    product?.price !== undefined && product?.price !== null ? String(product.price) : ""
  );
  const [description, setDescription] = useState(product?.description || "");
  const [isAvailable, setIsAvailable] = useState<boolean>(
    product ? product.isAvailable : true
  );
  const [isNewArrival, setIsNewArrival] = useState<boolean>(
    product ? product.isNewArrival : false
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageRemoved, setImageRemoved] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    image?: string;
    price?: string;
    general?: string;
  }>({});

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setImageRemoved(false);
    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const handleImageRemove = () => {
    setSelectedFile(null);
    setImageRemoved(true);
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "পণ্যের নাম আবশ্যক (Product name is required)";
    }

    if (price.trim() !== "") {
      const numPrice = Number(price);
      if (isNaN(numPrice) || numPrice < 0) {
        newErrors.price = "সঠিক মূল্য লিখুন (Please enter a valid positive price)";
      }
    }

    // New product must have an image
    if (!isEditing && !selectedFile) {
      newErrors.image = "একটি ছবি নির্বাচন করুন (Image is required for new product)";
    }

    // Editing: if existing image was removed and no new file selected
    if (isEditing && imageRemoved && !selectedFile) {
      newErrors.image = "একটি ছবি প্রয়োজন (Image is required)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const numericPrice = price.trim() !== "" ? Number(price) : undefined;
      const formData: ProductFormData = {
        name: name.trim(),
        category,
        price: numericPrice,
        description: description.trim() || undefined,
        isAvailable,
        isNewArrival,
      };

      if (!isEditing) {
        if (!selectedFile) {
          throw new Error("Image file is missing.");
        }
        const { url, path } = await uploadProductImage(selectedFile);
        await addProduct(formData, url, path);
        toast.success("পণ্য সফলভাবে যুক্ত করা হয়েছে (Product added successfully)");
      } else if (product) {
        let updateData: Partial<ProductFormData> & {
          imageUrl?: string;
          imagePath?: string;
        } = { ...formData };

        if (selectedFile) {
          const { url, path } = await uploadProductImage(selectedFile);
          updateData.imageUrl = url;
          updateData.imagePath = path;

          // Delete previous image if available
          if (product.imagePath) {
            try {
              await deleteProductImage(product.imagePath);
            } catch (delErr) {
              console.error("Failed to delete previous image:", delErr);
            }
          }
        }

        await updateProduct(product.id, updateData);
        toast.success("পণ্য আপডেট করা হয়েছে (Product updated successfully)");
      }

      onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save product.";
      setErrors((prev) => ({ ...prev, general: msg }));
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const currentImg = imageRemoved ? undefined : product?.imageUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-dark/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
    >
      <div className="relative w-full max-w-xl my-8 bg-surface-card rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
          <h2
            id="product-form-title"
            className="text-lg font-bold text-text-primary font-bengali"
          >
            {isEditing ? "পণ্য এডিট করুন (Edit Product)" : "নতুন পণ্য যোগ করুন (Add New Product)"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-border-light transition-base cursor-pointer disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {errors.general && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg font-medium">
              {errors.general}
            </div>
          )}

          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              পণ্যের ছবি (Product Image) <span className="text-danger">*</span>
            </label>
            <ImageUploader
              currentImageUrl={currentImg}
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
            />
            {errors.image && (
              <p className="mt-1.5 text-xs text-danger font-medium">{errors.image}</p>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              পণ্যের নাম (Product Name) <span className="text-danger">*</span>
            </label>
            <input
              id="product-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="যেমন: ডায়েরি, পেন সেট, ব্যাগ..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary-500 transition-base"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-danger font-medium">{errors.name}</p>
            )}
          </div>

          {/* Category & Price in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label
                htmlFor="product-category"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                বিভাগ (Category) <span className="text-danger">*</span>
              </label>
              <select
                id="product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary-500 transition-base"
              >
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="product-price"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                মূল্য (Price in ₹)
              </label>
              <input
                id="product-price"
                type="number"
                min="0"
                step="any"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }));
                }}
                placeholder="ঐচ্ছিক (Optional)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary-500 transition-base"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-danger font-medium">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="product-description"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              বিবরণ (Description)
            </label>
            <textarea
              id="product-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="পণ্যের বিস্তারিত বিবরণ লিখুন..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary-500 transition-base resize-none"
            />
          </div>

          {/* Checkboxes / Toggles */}
          <div className="pt-2 border-t border-border space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 border-border focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-text-primary">
                উপলব্ধ আছে (Available in stock)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 border-border focus:ring-primary-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-text-primary">
                নতুন পণ্য (Mark as New Arrival)
              </span>
            </label>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-lg border border-border bg-surface-card hover:bg-surface text-text-primary text-sm font-medium transition-base cursor-pointer disabled:opacity-50"
            >
              বাতিল (Cancel)
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-base cursor-pointer shadow-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>সংরক্ষণ হচ্ছে... (Saving...)</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditing ? "আপডেট করুন (Update)" : "সংরক্ষণ করুন (Save)"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
