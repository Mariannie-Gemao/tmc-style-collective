import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPurchase from "./pages/MyPurchase";
import MyFavorites from "./pages/MyFavorites";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import AllProducts from "./pages/AllProducts";
import SearchResults from "./pages/SearchResults";
import Help from "./pages/Help";
import TiktokProducts from "./pages/TiktokProducts";
import ShopeeProducts from "./pages/ShopeeProducts";
import SpecialProducts from "./pages/SpecialProducts";
import SourcingCategory from "./pages/SourcingCategory";
import AdminDashboard from "./pages/AdminDashboard";
import MyProfile from "./pages/MyProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthModal />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/my-purchase" element={<MyPurchase />} />
                <Route path="/my-favorites" element={<MyFavorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/tiktok-products" element={<TiktokProducts />} />
                <Route path="/shopee-products" element={<ShopeeProducts />} />
                <Route path="/special-products" element={<SpecialProducts />} />
                <Route path="/special-products/:slug" element={<SourcingCategory />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/help" element={<Help />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
