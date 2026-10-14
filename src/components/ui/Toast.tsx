import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  children: ReactNode;
}

const TOAST_DURATION_MS = 4000;

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, TOAST_DURATION_MS);
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string) => showToast(message, "success"),
    [showToast]
  );
  const error = useCallback(
    (message: string) => showToast(message, "error"),
    [showToast]
  );
  const info = useCallback(
    (message: string) => showToast(message, "info"),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}
      {/* Toast floating container positioned at top of screen, centered */}
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4"
        aria-live="assertive"
      >
        {toasts.map((toast) => {
          let typeClasses = "";
          let IconComponent = Info;

          if (toast.type === "success") {
            typeClasses = "bg-green-50 text-green-900 border-green-200";
            IconComponent = CheckCircle;
          } else if (toast.type === "error") {
            typeClasses = "bg-red-50 text-red-900 border-red-200";
            IconComponent = XCircle;
          } else {
            typeClasses = "bg-blue-50 text-blue-900 border-blue-200";
            IconComponent = Info;
          }

          return (
            <div
              key={toast.id}
              className={`toast-enter pointer-events-auto flex items-center justify-between w-full p-3.5 rounded-lg border shadow-md text-sm transition-base ${typeClasses}`}
              role="alert"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <IconComponent
                  className={`w-5 h-5 shrink-0 ${
                    toast.type === "success"
                      ? "text-success"
                      : toast.type === "error"
                      ? "text-danger"
                      : "text-blue-500"
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate leading-snug">{toast.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 transition-base cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
