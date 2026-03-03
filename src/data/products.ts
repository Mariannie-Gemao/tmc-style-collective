export interface Product {
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
  category?: string;
  platform?: "tiktok" | "shopee" | "special";
}

export const productCategories = [
  "Hardware",
  "Electronics",
  "Construction Materials",
  "Furniture",
  "Lighting",
  "Tools",
  "Industrial",
  "Home Supplies",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export const categorySlugMap: Record<string, string> = {
  hardware: "Hardware",
  electronics: "Electronics",
  "construction-materials": "Construction Materials",
  furniture: "Furniture",
  lighting: "Lighting",
  tools: "Tools",
  industrial: "Industrial",
  "home-supplies": "Home Supplies",
};

export const tiktokProducts: Product[] = [
  { id: 1, name: "Wireless Bluetooth Earbuds Pro", price: 599, originalPrice: 1299, discount: 54, rating: 4.8, reviews: 2345, sold: 5000, image: "", category: "electronics", platform: "tiktok" },
  { id: 2, name: "Smart Watch Fitness Tracker", price: 899, originalPrice: 1999, discount: 55, rating: 4.7, reviews: 1890, sold: 3200, image: "", category: "electronics", platform: "tiktok" },
  { id: 3, name: "LED Ring Light with Stand", price: 399, originalPrice: 799, discount: 50, rating: 4.6, reviews: 987, sold: 2100, image: "", category: "lighting", platform: "tiktok" },
  { id: 4, name: "Cordless Power Drill 21V", price: 1899, originalPrice: 2999, discount: 37, rating: 4.7, reviews: 567, sold: 1200, image: "", category: "tools", platform: "tiktok" },
  { id: 5, name: "Smart LED Ceiling Light", price: 1299, originalPrice: 2499, discount: 48, rating: 4.8, reviews: 890, sold: 2100, image: "", category: "lighting", platform: "tiktok" },
  { id: 6, name: "Industrial Safety Helmet", price: 349, originalPrice: 699, discount: 50, rating: 4.5, reviews: 456, sold: 3400, image: "", category: "industrial", platform: "tiktok" },
  { id: 7, name: "Ergonomic Office Chair", price: 3499, originalPrice: 5999, discount: 42, rating: 4.9, reviews: 1234, sold: 800, image: "", category: "furniture", platform: "tiktok" },
  { id: 8, name: "Heavy Duty Door Hinge Set", price: 199, originalPrice: 399, discount: 50, rating: 4.6, reviews: 345, sold: 5600, image: "", category: "hardware", platform: "tiktok" },
  { id: 17, name: "Kitchen Organizer Rack", price: 299, originalPrice: 599, discount: 50, rating: 4.5, reviews: 678, sold: 4200, image: "", category: "home-supplies", platform: "tiktok" },
  { id: 18, name: "Stainless Steel Dish Rack", price: 449, originalPrice: 799, discount: 44, rating: 4.6, reviews: 432, sold: 3100, image: "", category: "home-supplies", platform: "tiktok" },
];

export const shopeeProducts: Product[] = [
  { id: 9, name: "Portable Power Bank 20000mAh", price: 499, originalPrice: 999, discount: 50, rating: 4.9, reviews: 4567, sold: 8900, image: "", category: "electronics", platform: "shopee" },
  { id: 10, name: "Cement Mixer 50L", price: 2499, originalPrice: 3999, discount: 38, rating: 4.5, reviews: 234, sold: 500, image: "", category: "construction-materials", platform: "shopee" },
  { id: 11, name: "Steel Reinforcement Bar Bundle", price: 1899, originalPrice: 2599, discount: 27, rating: 4.7, reviews: 189, sold: 950, image: "", category: "construction-materials", platform: "shopee" },
  { id: 12, name: "Gaming RGB Keyboard Mechanical", price: 1299, originalPrice: 2499, discount: 48, rating: 4.9, reviews: 6789, sold: 8900, image: "", category: "electronics", platform: "shopee" },
  { id: 13, name: "Standing Desk Adjustable", price: 4999, originalPrice: 7999, discount: 38, rating: 4.8, reviews: 567, sold: 340, image: "", category: "furniture", platform: "shopee" },
  { id: 14, name: "Solar Flood Light 100W", price: 899, originalPrice: 1599, discount: 44, rating: 4.6, reviews: 1234, sold: 4500, image: "", category: "lighting", platform: "shopee" },
  { id: 15, name: "Stainless Steel Bolt Set 200pcs", price: 299, originalPrice: 599, discount: 50, rating: 4.5, reviews: 890, sold: 7800, image: "", category: "hardware", platform: "shopee" },
  { id: 16, name: "Industrial Air Compressor", price: 5999, originalPrice: 8999, discount: 33, rating: 4.8, reviews: 345, sold: 120, image: "", category: "industrial", platform: "shopee" },
  { id: 19, name: "Bathroom Storage Cabinet", price: 1299, originalPrice: 2199, discount: 41, rating: 4.7, reviews: 567, sold: 2300, image: "", category: "home-supplies", platform: "shopee" },
  { id: 20, name: "Laundry Basket Set 3pcs", price: 399, originalPrice: 699, discount: 43, rating: 4.4, reviews: 345, sold: 5100, image: "", category: "home-supplies", platform: "shopee" },
];

export const flashDeals: Product[] = [
  tiktokProducts[0],
  tiktokProducts[1],
  shopeeProducts[0],
  shopeeProducts[3],
];

export const featuredProducts: Product[] = [
  tiktokProducts[2],
  tiktokProducts[3],
  shopeeProducts[1],
  shopeeProducts[4],
  tiktokProducts[6],
  shopeeProducts[5],
  tiktokProducts[4],
  shopeeProducts[6],
];

export const allProducts: Product[] = [...tiktokProducts, ...shopeeProducts];
