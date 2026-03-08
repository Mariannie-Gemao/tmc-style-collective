import { Search, ShoppingCart, User, Menu, ChevronDown, Heart, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import tmcLogo from "@/assets/tmc-logo.png";
import { allProducts } from "@/data/products";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navGroups = [
  { label: "TikTok Products", path: "/tiktok-products" },
  { label: "Shopee Products", path: "/shopee-products" },
  { label: "Special Products", path: "/special-products" },
];

const tiktokShopeeCategories = ["Hardware", "Electronics", "Construction Materials", "Furniture", "Lighting", "Tools", "Industrial", "Home Supplies"];

const specialCategories = [
  { name: "Hardware", slug: "hardware" },
  { name: "Electronics", slug: "electronics" },
  { name: "Construction Materials", slug: "construction-materials" },
  { name: "Furniture", slug: "furniture" },
  { name: "Lighting", slug: "lighting" },
  { name: "Tools", slug: "tools" },
  { name: "Industrial", slug: "industrial" },
  { name: "Home Supplies", slug: "home-supplies" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { cartCount } = useCart();
  const { requireAuth, isAuthenticated, isAdmin, signOut } = useAuth();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 6);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  const handleProtectedNav = (path: string) => {
    if (requireAuth()) navigate(path);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/sign-in");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="gradient-primary text-primary-foreground">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="hidden md:flex items-center gap-4">
            <span>Free Shipping Nationwide</span>
            <span className="text-accent-light font-semibold">|</span>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button onClick={() => handleProtectedNav("/my-purchase")} className="hover:text-accent-light transition-colors">Track Order</button>
            <button onClick={() => navigate("/help")} className="hover:text-accent-light transition-colors">Help</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="container flex h-16 items-center gap-4 lg:gap-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>

          <button onClick={handleLogoClick} className="flex items-center gap-2 flex-shrink-0">
            <img src={tmcLogo} alt="TMC Shop" className="h-12 w-12 rounded-full object-cover" />
            <span className="font-heading font-bold text-xl text-primary">TMC Shop</span>
          </button>

          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="w-full pl-4 pr-12 h-11 rounded-full border-2 border-muted focus:border-accent transition-colors"
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 bg-accent hover:bg-accent-dark">
                <Search className="h-4 w-4 text-accent-foreground" />
              </Button>

              {showResults && searchQuery.trim() && (
                <div className="absolute top-full mt-1 w-full bg-card border rounded-xl shadow-lg max-h-72 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.map((product) => (
                        <button key={product.id} className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors flex items-center justify-between border-b last:border-b-0"
                          onMouseDown={() => { const url = product.shopUrl || "https://www.tiktok.com/shop"; window.open(url, "_blank", "noopener,noreferrer"); setShowResults(false); setSearchQuery(""); }}>
                          <div>
                            <p className="text-sm font-medium text-foreground">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                          <span className="text-xs text-accent font-semibold">₱{product.price.toLocaleString()}</span>
                        </button>
                      ))}
                      <button className="w-full text-center px-4 py-3 text-sm font-medium text-accent hover:bg-secondary transition-colors"
                        onMouseDown={() => { navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); setShowResults(false); }}>
                        See all results for "{searchQuery}"
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center text-muted-foreground text-sm">No products found for "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="relative hover:bg-accent/10 hover:text-accent transition-colors" onClick={() => handleProtectedNav("/my-favorites")}>
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center">{favorites.length}</span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="relative hover:bg-accent/10 hover:text-accent transition-colors" onClick={() => handleProtectedNav("/cart")}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center">{cartCount}</span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border shadow-lg z-50">
                <div className="px-2 py-1.5 text-sm font-bold text-foreground">My Account</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-foreground hover:!bg-accent hover:!text-accent-foreground" onClick={() => handleProtectedNav("/my-purchase")}>My Purchase</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-foreground hover:!bg-accent hover:!text-accent-foreground" onClick={() => handleProtectedNav("/my-profile")}>My Profile</DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-accent hover:!bg-accent hover:!text-accent-foreground gap-2" onClick={() => navigate("/admin")}>
                      <Shield className="h-4 w-4" /> Admin Dashboard
                    </DropdownMenuItem>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive hover:!bg-destructive hover:!text-destructive-foreground" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input type="search" placeholder="Search products..." value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full pl-4 pr-10 h-10 rounded-full" />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
            {showResults && searchQuery.trim() && (
              <div className="absolute top-full mt-1 w-full bg-card border rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <button key={product.id} className="w-full text-left px-4 py-3 hover:bg-secondary transition-colors border-b last:border-b-0"
                        onMouseDown={() => { const url = product.shopUrl || "https://www.tiktok.com/shop"; window.open(url, "_blank", "noopener,noreferrer"); setShowResults(false); setSearchQuery(""); }}>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-accent">₱{product.price.toLocaleString()}</p>
                      </button>
                    ))}
                    <button className="w-full text-center px-4 py-3 text-sm font-medium text-accent hover:bg-secondary"
                      onMouseDown={() => { navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); setShowResults(false); }}>
                      See all results
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-4 text-center text-muted-foreground text-sm">No products found</div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Category Navigation with Dropdowns */}
      <nav className="bg-card border-b hidden lg:block">
        <div className="container">
          <ul className="flex items-center gap-1">
            {navGroups.map((group) => (
              <li key={group.label} className="relative group">
                <button
                  onClick={() => navigate(group.path)}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 transition-colors rounded-lg"
                >
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-card border rounded-lg shadow-lg z-50 min-w-[200px]">
                  {group.label === "Special Products" ? (
                    specialCategories.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => navigate(`/special-products/${sub.slug}`)}
                        className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-accent transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {sub.name}
                      </button>
                    ))
                  ) : (
                    tiktokShopeeCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => navigate(`/category/${sub.toLowerCase().replace(/ /g, "-")}`)}
                        className="block w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-accent transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {sub}
                      </button>
                    ))
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(6.5rem)] z-40 bg-primary/30 backdrop-blur-sm animate-fade-in" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[calc(6.5rem)] left-0 right-0 z-50 bg-card border-b shadow-lg animate-fade-in max-h-[70vh] overflow-y-auto">
          <nav className="container py-4 space-y-2">
            {navGroups.map((group, groupIdx) => (
              <div key={group.label} className="animate-fade-in" style={{ animationDelay: `${groupIdx * 80}ms`, animationFillMode: 'both' }}>
                <button onClick={() => { navigate(group.path); setIsMenuOpen(false); }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-bold text-primary hover:bg-accent/10 rounded-xl transition-all duration-200 group">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5 ml-auto text-muted-foreground" />
                </button>
                <div className="ml-2 mt-1 space-y-0.5 border-l-2 border-accent/20 pl-2">
                  {group.label === "Special Products" ? (
                    specialCategories.map((sub, i) => (
                      <button key={sub.name} onClick={() => { navigate(`/special-products/${sub.slug}`); setIsMenuOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-xl transition-all duration-200 hover:translate-x-1 animate-fade-in"
                        style={{ animationDelay: `${groupIdx * 80 + (i + 1) * 40}ms`, animationFillMode: 'both' }}>
                        {sub.name}
                      </button>
                    ))
                  ) : (
                    tiktokShopeeCategories.map((sub, i) => (
                      <button key={sub} onClick={() => { navigate(`/category/${sub.toLowerCase().replace(/ /g, "-")}`); setIsMenuOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-xl transition-all duration-200 hover:translate-x-1 animate-fade-in"
                        style={{ animationDelay: `${groupIdx * 80 + (i + 1) * 40}ms`, animationFillMode: 'both' }}>
                        {sub}
                      </button>
                    ))
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
