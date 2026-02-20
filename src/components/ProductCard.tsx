import { Star, Heart, ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/context/FavoritesContext";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  sold: number;
  image: string;
  shopUrl?: string;
}

interface ProductCardProps {
  product: Product;
  isFlashDeal?: boolean;
}

const ProductCard = ({ product, isFlashDeal = false }: ProductCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const wishlisted = isFavorite(product.id);

  const handleShopNow = () => {
    const url = product.shopUrl || "https://www.tiktok.com/shop";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div 
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={handleShopNow}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <ShoppingCart className="h-12 w-12 opacity-30" />
        </div>
        
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground font-bold">
            -{product.discount}%
          </Badge>
        )}
        
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
          className="absolute top-2 right-2 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              wishlisted ? "fill-accent text-accent" : "text-muted-foreground"
            }`} 
          />
        </button>
        
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-primary/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
          <Button className="w-full bg-accent hover:bg-accent-dark text-accent-foreground gap-2 rounded-full">
            <ExternalLink className="h-4 w-4" />
            Shop Now
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 text-sm mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-star text-star"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-accent">
            ₱{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₱{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {product.sold.toLocaleString()}+ sold
          </span>
          {isFlashDeal && (
            <div className="flex-1 ml-2">
              <div className="h-1.5 bg-accent/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${Math.min(80, (product.sold / 10000) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
