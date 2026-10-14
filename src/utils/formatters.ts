/**
 * Format a price in Indian Rupees.
 * Returns "Price on request" if no price is provided.
 */
export function formatPrice(price?: number): string {
  if (price === undefined || price === null) {
    return "Price on request";
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

/**
 * Format a Firestore Timestamp or Date into a human-readable date string.
 */
export function formatDate(
  date: { toDate: () => Date } | Date | undefined
): string {
  if (!date) return "";
  const d = date instanceof Date ? date : date.toDate();
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Generate a WhatsApp chat link.
 */
export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}

/**
 * Generate a tel: link for calling.
 */
export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}
