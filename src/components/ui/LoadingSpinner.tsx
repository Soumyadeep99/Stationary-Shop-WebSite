import React from "react";
import { Loader2 } from "lucide-react";

export interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className="w-8 h-8 text-primary-600 animate-spin"
        aria-hidden="true"
      />
      {message && (
        <p className="mt-3 text-sm text-text-secondary font-medium font-bengali">
          {message}
        </p>
      )}
      <span className="sr-only">{message || "Loading..."}</span>
    </div>
  );
};

export default LoadingSpinner;
