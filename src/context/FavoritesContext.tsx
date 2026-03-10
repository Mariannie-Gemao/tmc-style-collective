import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

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

interface FavoritesContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: Product) => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorites from DB when user logs in
  useEffect(() => {
    if (!isAuthenticated || !user) {
      setFavorites([]);
      return;
    }

    const loadFavorites = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("product_id, products(*)")
          .eq("user_id", user.id);

        if (error) throw error;

        const products: Product[] = (data || [])
          .filter((row: any) => row.products)
          .map((row: any) => ({
            id: row.products.id,
            name: row.products.name,
            price: row.products.price,
            originalPrice: row.products.original_price ?? undefined,
            discount: row.products.discount ?? undefined,
            rating: row.products.rating ?? 0,
            reviews: row.products.reviews ?? 0,
            sold: row.products.sold ?? 0,
            image: row.products.image ?? "",
            shopUrl: row.products.shop_url ?? undefined,
          }));

        setFavorites(products);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
      setLoading(false);
    };

    loadFavorites();
  }, [user, isAuthenticated]);

  const addFavorite = useCallback(
    async (product: Product) => {
      if (!user) return;
      // Optimistic update
      setFavorites((prev) => {
        if (prev.find((p) => p.id === product.id)) return prev;
        return [...prev, product];
      });

      const { error } = await supabase
        .from("favorites")
        .insert({ user_id: user.id, product_id: product.id });

      if (error) {
        console.error("Failed to add favorite:", error);
        // Rollback
        setFavorites((prev) => prev.filter((p) => p.id !== product.id));
      }
    },
    [user]
  );

  const removeFavorite = useCallback(
    async (id: number) => {
      if (!user) return;
      // Optimistic update
      const previous = favorites;
      setFavorites((prev) => prev.filter((p) => p.id !== id));

      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      if (error) {
        console.error("Failed to remove favorite:", error);
        setFavorites(previous);
      }
    },
    [user, favorites]
  );

  const isFavorite = useCallback(
    (id: number) => favorites.some((p) => p.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (product: Product) => {
      if (isFavorite(product.id)) {
        removeFavorite(product.id);
      } else {
        addFavorite(product);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
