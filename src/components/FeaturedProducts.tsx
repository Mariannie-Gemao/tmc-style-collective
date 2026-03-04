import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { featuredProducts } from "@/data/products";

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section id="featured-products" className="py-10 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="gradient-primary p-2 rounded-lg icon-bounce">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Trending on TikTok</h2>
              <p className="text-sm text-muted-foreground">Most popular products this week</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-glow-primary btn-shine"
            onClick={() => navigate("/all-products")}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button
            variant="outline"
            className="gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground btn-shine"
            onClick={() => navigate("/all-products")}
          >
            View All Products
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
