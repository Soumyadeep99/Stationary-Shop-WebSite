import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Loader2, AlertTriangle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { isFirebaseConfigured } from "../config/firebase";
import { shopConfig } from "../config/shop";

export const AdminLoginPage: React.FC = () => {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);

    if (!email.trim() || !password.trim()) {
      setValidationError("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate("/admin");
    } catch {
      // Error is stored in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-surface-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        {/* Firebase configuration warning */}
        {!isFirebaseConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-semibold block mb-0.5">Firebase Not Configured</strong>
              Please configure your Firebase credentials in your environment variables to enable admin authentication.
            </div>
          </div>
        )}

        {/* Shop Name Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text-primary font-bengali">
            {shopConfig.name}
          </h1>
          <p className="text-sm font-medium text-text-secondary mt-1">
            Admin Login
          </p>
        </div>

        {/* Error Feedback */}
        {(validationError || error) && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-danger text-sm font-medium">
            {validationError || error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              ইমেল (Email)
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationError) setValidationError(null);
                if (error) clearError();
              }}
              placeholder="admin@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary-500 transition-base"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              পাসওয়ার্ড (Password)
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationError) setValidationError(null);
                if (error) clearError();
              }}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary-500 transition-base"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !isFirebaseConfigured}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-base cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>লগইন হচ্ছে... (Logging in...)</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>লগইন করুন (Login)</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
