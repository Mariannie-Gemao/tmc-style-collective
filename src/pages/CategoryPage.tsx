import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import PageLoader from "@/components/PageLoader";
import { allProducts, categorySlugMap } from "@/data/products";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const categoryName = categorySlugMap[slug || ""] || "Products";
  const categoryKey = slug || "";
  const products = allProducts.filter((p) => p.category === categoryKey);

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-2xl font-bold text-foreground">{categoryName}</h1>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLoader>
  );
};

export default CategoryPage;
