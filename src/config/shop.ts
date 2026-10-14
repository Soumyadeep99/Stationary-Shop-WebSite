/**
 * Shop configuration — edit this file with your shop's real details.
 * Replace all [PLACEHOLDER] values with actual information.
 */
export const shopConfig = {
  /** Shop name in Bengali */
  name: "অন্নপূর্ণা উপহার ভাণ্ডার",

  /** Hero tagline */
  tagline: "আপনার পছন্দের জিনিস, এক ঠিকানায়",

  /** Short description for the homepage */
  description:
    "স্টেশনারি, গিফট আইটেম, স্কুলের জিনিসপত্র এবং আরও অনেক কিছু — সব এক জায়গায় পাবেন।",

  /** Shop owner's name */
  ownerName: "[OWNER_NAME]",

  /** Contact phone number (used for Call Now button) */
  phone: "[PHONE_NUMBER]",

  /** WhatsApp number with country code, e.g. "919876543210" */
  whatsappNumber: "[WHATSAPP_NUMBER]",

  /** Full shop address */
  address: "[SHOP_ADDRESS]",

  /** Google Maps URL for the shop location */
  googleMapsUrl: "[GOOGLE_MAPS_URL]",
} as const;

/** Product categories — the owner can select from these when adding products */
export const productCategories = [
  "Stationery",
  "Gifts",
  "School Supplies",
  "Art & Craft",
  "Other",
] as const;

export type Category = (typeof productCategories)[number];
