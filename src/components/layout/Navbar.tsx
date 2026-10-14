import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Store } from "lucide-react";
import { shopConfig } from "../../config/shop";

interface NavItem {
  name: string;
  to: string;
}

const navItems: NavItem[] = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "New Arrivals", to: "/new-arrivals" },
  { name: "Contact", to: "/contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-card border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Shop brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 text-text-primary hover:text-primary-600 transition-base"
          >
            <div className="p-1.5 rounded-lg bg-primary-50 text-primary-600">
              <Store className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-bengali text-lg sm:text-xl font-bold tracking-tight text-primary-900">
              {shopConfig.name}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-base ${
                    isActive
                      ? "text-primary-600 bg-primary-50 font-semibold"
                      : "text-text-secondary hover:text-text-primary hover:bg-border-light"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-border-light focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-surface-card px-4 pt-2 pb-4 space-y-1 shadow-md">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-base ${
                  isActive
                    ? "text-primary-600 bg-primary-50 font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-border-light"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
