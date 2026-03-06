import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingCart, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRealtimeProducts } from "@/hooks/useRealtimeProducts";

const TiktokSection = () => {
  const navigate = useNavigate();
  const { products, loading } = useRealtimeProducts("tiktok");

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="gradient-accent p-2.5 rounded-lg icon-bounce">
              <ShoppingCart className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">TikTok Products</h2>
              <p className="text-sm text-muted-foreground">Trending items from our TikTok shop</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-shine btn-glow-primary"
            onClick={() => navigate("/tiktok-products")}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" className="gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-shine" onClick={() => navigate("/tiktok-products")}>
            View All TikTok Products <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TiktokSection;
