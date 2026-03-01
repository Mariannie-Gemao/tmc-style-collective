import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { tiktokProducts } from "@/data/products";

const TiktokSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="gradient-accent p-2 rounded-lg">
              <span className="text-accent-foreground font-bold text-lg">🎵</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">TikTok Products</h2>
              <p className="text-sm text-muted-foreground">Trending items from our TikTok shop</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate("/tiktok-products")}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tiktokProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" className="gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate("/tiktok-products")}>
            View All TikTok Products <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TiktokSection;
