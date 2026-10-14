import React from "react";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { shopConfig } from "../../config/shop";
import { telLink, whatsappLink } from "../../utils/formatters";

function isConfigValuePresent(value?: string): boolean {
  return Boolean(value && !value.trim().startsWith("["));
}

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const hasPhone = isConfigValuePresent(shopConfig.phone);
  const hasWhatsapp = isConfigValuePresent(shopConfig.whatsappNumber);
  const hasAddress = isConfigValuePresent(shopConfig.address);
  const hasOwner = isConfigValuePresent(shopConfig.ownerName);
  const hasGoogleMaps = isConfigValuePresent(shopConfig.googleMapsUrl);

  return (
    <footer className="bg-border-light text-text-primary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Column 1: Shop details & branding */}
          <div className="space-y-3">
            <h2 className="font-bengali text-xl font-bold text-primary-900 tracking-tight">
              {shopConfig.name}
            </h2>
            {shopConfig.tagline && (
              <p className="font-bengali text-sm text-text-secondary leading-relaxed">
                {shopConfig.tagline}
              </p>
            )}
            {hasOwner && (
              <p className="text-xs text-text-muted">
                স্বত্বাধিকারী / Owner: <span className="font-medium text-text-secondary">{shopConfig.ownerName}</span>
              </p>
            )}
          </div>

          {/* Column 2: Address & location */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-800">
              ঠিকানা ও যোগাযোগ / Contact & Address
            </h3>
            {hasAddress && (
              <div className="flex items-start gap-2.5 text-sm text-text-secondary">
                <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">{shopConfig.address}</p>
              </div>
            )}
            {hasGoogleMaps && (
              <div className="pt-1">
                <a
                  href={shopConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-700 underline underline-offset-2 transition-base"
                >
                  গুগল ম্যাপে দেখুন (View on Google Maps)
                </a>
              </div>
            )}
          </div>

          {/* Column 3: Quick Action buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-800">
              যোগাযোগ করুন / Get in Touch
            </h3>
            <p className="text-sm text-text-secondary">
              যেকোনো জিজ্ঞাসা বা অর্ডারের জন্য সরাসরি যোগাযোগ করুন।
            </p>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 pt-1">
              {hasPhone && (
                <a
                  href={telLink(shopConfig.phone)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-card border border-border text-text-primary text-sm font-medium hover:border-primary-500 hover:text-primary-600 shadow-2xs transition-base"
                >
                  <Phone className="w-4 h-4 text-primary-600" aria-hidden="true" />
                  <span>Call Now ({shopConfig.phone})</span>
                </a>
              )}
              {hasWhatsapp && (
                <a
                  href={whatsappLink(shopConfig.whatsappNumber, "নমস্কার, আমি আপনার দোকান থেকে কিছু জিনিস সম্পর্কে জানতে চাই।")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 shadow-2xs transition-base"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Chat</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-text-secondary gap-2">
          <p className="font-bengali">
            © {currentYear} {shopConfig.name}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-text-muted">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
