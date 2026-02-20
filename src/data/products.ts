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
}

export const flashDeals: Product[] = [
  { id: 1, name: "Wireless Bluetooth Earbuds Pro", price: 599, originalPrice: 1299, discount: 54, rating: 4.8, reviews: 2345, sold: 5000, image: "", category: "electronics" },
  { id: 2, name: "Smart Watch Fitness Tracker", price: 899, originalPrice: 1999, discount: 55, rating: 4.7, reviews: 1890, sold: 3200, image: "", category: "electronics" },
  { id: 3, name: "Portable Power Bank 20000mAh", price: 499, originalPrice: 999, discount: 50, rating: 4.9, reviews: 4567, sold: 8900, image: "", category: "electronics" },
  { id: 4, name: "LED Ring Light with Stand", price: 399, originalPrice: 799, discount: 50, rating: 4.6, reviews: 987, sold: 2100, image: "", category: "electronics" },
];

export const featuredProducts: Product[] = [
  { id: 5, name: "Viral TikTok Mini Projector HD", price: 1899, originalPrice: 3599, discount: 47, rating: 4.8, reviews: 3456, sold: 7800, image: "", category: "electronics" },
  { id: 6, name: "Korean Skincare Set 10pcs", price: 799, originalPrice: 1599, discount: 50, rating: 4.9, reviews: 5678, sold: 12000, image: "", category: "beauty" },
  { id: 7, name: "Aesthetic Cloud LED Lamp", price: 349, originalPrice: 699, discount: 50, rating: 4.7, reviews: 2345, sold: 5600, image: "", category: "home-living" },
  { id: 8, name: "Electric Facial Massager", price: 599, originalPrice: 1199, discount: 50, rating: 4.6, reviews: 1234, sold: 3400, image: "", category: "beauty" },
  { id: 9, name: "Portable Blender USB Rechargeable", price: 449, originalPrice: 899, discount: 50, rating: 4.8, reviews: 4567, sold: 9800, image: "", category: "home-living" },
  { id: 10, name: "Minimalist Crossbody Bag", price: 299, originalPrice: 599, discount: 50, rating: 4.5, reviews: 890, sold: 2300, image: "", category: "fashion" },
  { id: 11, name: "Gaming RGB Keyboard Mechanical", price: 1299, originalPrice: 2499, discount: 48, rating: 4.9, reviews: 6789, sold: 8900, image: "", category: "electronics" },
  { id: 12, name: "Insulated Water Bottle 1L", price: 199, originalPrice: 399, discount: 50, rating: 4.7, reviews: 3456, sold: 15000, image: "", category: "sports" },
];

export const allProducts: Product[] = [...flashDeals, ...featuredProducts];
