import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import PageLoader from "@/components/PageLoader";

const allProducts = [
  { id: 1, name: "Wireless Bluetooth Earbuds Pro", price: 599, originalPrice: 1299, discount: 54, rating: 4.8, reviews: 2345, sold: 5000, image: "", category: "electronics" },
  { id: 2, name: "Smart Watch Fitness Tracker", price: 899, originalPrice: 1999, discount: 55, rating: 4.7, reviews: 1890, sold: 3200, image: "", category: "electronics" },
  { id: 3, name: "Portable Power Bank 20000mAh", price: 499, originalPrice: 999, discount: 50, rating: 4.9, reviews: 4567, sold: 8900, image: "", category: "electronics" },
  { id: 4, name: "LED Ring Light with Stand", price: 399, originalPrice: 799, discount: 50, rating: 4.6, reviews: 987, sold: 2100, image: "", category: "electronics" },
  { id: 5, name: "Cement Mixer 50L", price: 2499, originalPrice: 3999, discount: 38, rating: 4.5, reviews: 234, sold: 500, image: "", category: "construction-supplies" },
  { id: 6, name: "Power Drill Set", price: 1899, originalPrice: 2999, discount: 37, rating: 4.7, reviews: 567, sold: 1200, image: "", category: "construction-supplies" },
  { id: 7, name: "Korean Skincare Set 10pcs", price: 799, originalPrice: 1599, discount: 50, rating: 4.9, reviews: 5678, sold: 12000, image: "", category: "beauty" },
  { id: 8, name: "Electric Facial Massager", price: 599, originalPrice: 1199, discount: 50, rating: 4.6, reviews: 1234, sold: 3400, image: "", category: "beauty" },
  { id: 9, name: "Minimalist Crossbody Bag", price: 299, originalPrice: 599, discount: 50, rating: 4.5, reviews: 890, sold: 2300, image: "", category: "fashion" },
  { id: 10, name: "Aesthetic Cloud LED Lamp", price: 349, originalPrice: 699, discount: 50, rating: 4.7, reviews: 2345, sold: 5600, image: "", category: "home-living" },
  { id: 11, name: "Portable Blender USB Rechargeable", price: 449, originalPrice: 899, discount: 50, rating: 4.8, reviews: 4567, sold: 9800, image: "", category: "home-living" },
  { id: 12, name: "Yoga Mat Premium", price: 699, originalPrice: 1299, discount: 46, rating: 4.8, reviews: 1234, sold: 3400, image: "", category: "sports" },
];

const categoryNames: Record<string, string> = {
  all: "All Categories",
  electronics: "Electronics",
  "construction-supplies": "Construction Supplies",
  fashion: "Fashion",
  beauty: "Beauty",
  "home-living": "Home & Living",
  sports: "Sports",
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const products = slug === "all" ? allProducts : allProducts.filter((p) => p.category === slug);
  const title = categoryNames[slug || "all"] || "Products";

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
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
