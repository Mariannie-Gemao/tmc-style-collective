import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import ProductCard from "@/components/ProductCard";
import PageLoader from "@/components/PageLoader";

const MyFavorites = () => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-2xl font-bold text-foreground">My Favorites</h1>
          </div>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>No favorites yet. Start adding products you love!</p>
            </div>
          )}
        </div>
      </div>
    </PageLoader>
  );
};

export default MyFavorites;
