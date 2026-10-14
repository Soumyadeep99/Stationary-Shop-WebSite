import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./components/ui/Toast";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboard } from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Customer-facing pages with Navbar + Footer */}
            <Route
              path="/"
              element={
                <CustomerLayout>
                  <HomePage />
                </CustomerLayout>
              }
            />
            <Route
              path="/products"
              element={
                <CustomerLayout>
                  <ProductsPage />
                </CustomerLayout>
              }
            />
            <Route
              path="/new-arrivals"
              element={
                <CustomerLayout>
                  <NewArrivalsPage />
                </CustomerLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <CustomerLayout>
                  <ContactPage />
                </CustomerLayout>
              }
            />

            {/* Admin pages — no Navbar/Footer */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

/** Wraps customer pages with Navbar and Footer */
function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
