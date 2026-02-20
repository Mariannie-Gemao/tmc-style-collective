import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";
import PageLoader from "@/components/PageLoader";

const AllProducts = () => {
  const navigate = useNavigate();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-2xl font-bold text-foreground">All Products</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default AllProducts;
