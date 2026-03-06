import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

type DbProduct = {
  id: number;
  name: string;
  price: number;
  original_price: number | null;
  discount: number | null;
  rating: number | null;
  reviews: number | null;
  sold: number | null;
  image: string | null;
  shop_url: string | null;
  category: string | null;
  platform: string;
};

function mapToProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    discount: row.discount ?? undefined,
    rating: Number(row.rating ?? 4.5),
    reviews: row.reviews ?? 0,
    sold: row.sold ?? 0,
    image: row.image ?? "",
    shopUrl: row.shop_url ?? "",
    category: row.category ?? undefined,
    platform: row.platform as Product["platform"],
  };
}

export function useRealtimeProducts(platform?: "tiktok" | "shopee" | "special") {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    let query = supabase.from("products").select("*");
    if (platform) query = query.eq("platform", platform);
    const { data } = await query.order("id");
    if (data) setProducts((data as unknown as DbProduct[]).map(mapToProduct));
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel(`products-${platform ?? "all"}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "products",
        ...(platform ? { filter: `platform=eq.${platform}` } : {}),
      }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [platform]);

  return { products, loading };
}
