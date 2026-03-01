import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { shopeeProducts } from "@/data/products";

const ShopeeSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-secondary/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="gradient-primary p-2 rounded-lg">
              <span className="text-primary-foreground font-bold text-lg">🛒</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Shopee Products</h2>
              <p className="text-sm text-muted-foreground">Best deals from our Shopee store</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate("/shopee-products")}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {shopeeProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" className="gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate("/shopee-products")}>
            View All Shopee Products <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShopeeSection;
