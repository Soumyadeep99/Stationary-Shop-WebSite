
import { resizeImage } from "../utils/imageUtils";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a product image to Cloudinary.
 */
export async function uploadProductImage(
  file: File
): Promise<{ url: string; path: string }> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured. Check your .env file.");
  }

  const resized = await resizeImage(file);

  const formData = new FormData();
  formData.append("file", resized, file.name);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "products");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData: { error?: { message?: string } } =
      await response.json();
    throw new Error(
      errorData.error?.message || "Image upload failed."
    );
  }

  const data: { secure_url: string; public_id: string } =
    await response.json();

  return {
    url: data.secure_url,
    path: data.public_id,
  };
}

/**
 * Cloudinary deletion requires a trusted server.
 * Do not expose Cloudinary API secrets in frontend code.
 */
export async function deleteProductImage(
  _path: string
): Promise<void> {
  throw new Error(
    "Image deletion must be implemented through a secure backend."
  );
}
