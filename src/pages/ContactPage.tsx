import React from "react";
import { Phone, MapPin, MessageCircle, ExternalLink, User } from "lucide-react";
import { shopConfig } from "../config/shop";
import { telLink, whatsappLink } from "../utils/formatters";

const isPlaceholder = (val?: string): boolean => {
  if (!val) return true;
  const trimmed = val.trim();
  return trimmed.startsWith("[") && trimmed.endsWith("]");
};

export const ContactPage: React.FC = () => {
  const hasOwner = !isPlaceholder(shopConfig.ownerName);
  const hasAddress = !isPlaceholder(shopConfig.address);
  const hasPhone = !isPlaceholder(shopConfig.phone);
  const hasWhatsapp = !isPlaceholder(shopConfig.whatsappNumber);
  const hasGoogleMaps = !isPlaceholder(shopConfig.googleMapsUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* ─── Page Title Header ─── */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-text-secondary">
            আমাদের দোকানে সরাসরি আসুন অথবা ফোনে যোগাযোগ করুন
          </p>
        </div>

        {/* ─── Shop Info Card ─── */}
        <div className="bg-surface-card rounded-2xl border border-border shadow-xs overflow-hidden">
          {/* Card Top Accent */}
          <div className="h-2 bg-primary-600 w-full" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Shop name in Bengali */}
            <div className="text-center sm:text-left border-b border-border-light pb-6 space-y-1">
              <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-primary-900">
                {shopConfig.name}
              </h2>
              {shopConfig.tagline && (
                <p className="font-bengali text-sm text-text-secondary">
                  {shopConfig.tagline}
                </p>
              )}
            </div>

            {/* Information List */}
            <div className="space-y-4">
              {/* Owner Name */}
              {hasOwner && (
                <div className="flex items-start gap-3.5 text-text-primary">
                  <div className="p-2 rounded-lg bg-primary-50 text-primary-600 shrink-0 mt-0.5">
                    <User className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                      স্বত্বাধিকারী / Owner
                    </span>
                    <span className="text-base font-medium text-text-primary">
                      {shopConfig.ownerName}
                    </span>
                  </div>
                </div>
              )}

              {/* Address */}
              {hasAddress && (
                <div className="flex items-start gap-3.5 text-text-primary">
                  <div className="p-2 rounded-lg bg-primary-50 text-primary-600 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                      ঠিকানা / Address
                    </span>
                    <p className="text-sm sm:text-base font-medium text-text-primary leading-relaxed">
                      {shopConfig.address}
                    </p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {hasPhone && (
                <div className="flex items-start gap-3.5 text-text-primary">
                  <div className="p-2 rounded-lg bg-primary-50 text-primary-600 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                      ফোন নম্বর / Phone
                    </span>
                    <span className="text-base font-medium text-text-primary">
                      {shopConfig.phone}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ─── Action Buttons ─── */}
            {(hasPhone || hasWhatsapp || hasGoogleMaps) && (
              <div className="pt-6 border-t border-border-light flex flex-col sm:flex-row flex-wrap gap-3">
                {/* Call Now Button */}
                {hasPhone && (
                  <a
                    href={telLink(shopConfig.phone)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-card border border-border text-text-primary font-medium hover:border-primary-500 hover:text-primary-700 shadow-2xs transition-base"
                  >
                    <Phone className="w-4 h-4 text-primary-600" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                )}

                {/* WhatsApp Button */}
                {hasWhatsapp && (
                  <a
                    href={whatsappLink(
                      shopConfig.whatsappNumber,
                      "নমস্কার, আমি আপনার দোকান সম্পর্কে জানতে আগ্রহী।"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-sm transition-base"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {/* View on Maps Button */}
                {hasGoogleMaps && (
                  <a
                    href={shopConfig.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-border-light text-text-primary font-medium hover:bg-border transition-base"
                  >
                    <ExternalLink className="w-4 h-4 text-text-secondary" aria-hidden="true" />
                    <span>View on Maps</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── Help / Notice Note ─── */}
        <div className="p-4 rounded-xl bg-border-light text-center text-xs text-text-secondary">
          দোকান খোলার সময় বা কোনো নির্দিষ্ট পণ্যের মজুত জানতে আমাদের সরাসরি কল বা হোয়াটসঅ্যাপে মেসেজ করুন।
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
