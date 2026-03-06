import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import PageLoader from "@/components/PageLoader";
import { useNavigate } from "react-router-dom";
import { productCategories } from "@/data/products";
import { useRealtimeProducts } from "@/hooks/useRealtimeProducts";

const TiktokProducts = () => {
  const navigate = useNavigate();
  const { products, loading } = useRealtimeProducts("tiktok");

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">TikTok Products</h1>
              <p className="text-sm text-muted-foreground">Browse our TikTok shop collection</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
          ) : (
            productCategories.map((cat) => {
              const items = products.filter(
                (p) => p.category === cat.toLowerCase().replace(/ /g, "-")
              );
              if (items.length === 0) return null;
              return (
                <div key={cat} className="mb-10">
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-4 border-b pb-2">
                    {cat}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </PageLoader>
  );
};

export default TiktokProducts;
