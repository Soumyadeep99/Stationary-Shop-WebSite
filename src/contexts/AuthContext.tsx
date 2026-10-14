import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../config/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    if (!isFirebaseConfigured) {
      setError("Firebase is not configured. Please set up environment variables.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password")) {
        setError("Incorrect email or password.");
      } else if (message.includes("auth/user-not-found")) {
        setError("No account found with this email.");
      } else if (message.includes("auth/too-many-requests")) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(message);
      }
      throw err;
    }
  };

  const logout = async () => {
    if (!isFirebaseConfigured) return;
    await signOut(auth);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
