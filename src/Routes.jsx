import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductCatalog from './pages/product-catalog';
import ProductDetailPage from './pages/product-detail-page';
import WhatsAppCheckout from './pages/whats-app-checkout';
import BeautyCenter from './pages/beauty-center';
import AdminPanel from './pages/admin';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BeautyCenter />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/whats-app-checkout" element={<WhatsAppCheckout />} />
        <Route path="/beauty-center" element={<BeautyCenter />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
