import { createContext, useContext, useState, type ReactNode } from "react";

interface CartItem {
  id: number;
  product: string;
  shop: string;
  unitPrice: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultCart: CartItem[] = [
  { id: 1, shop: "TikTok Shop", product: "Wireless Earbuds", unitPrice: 899, quantity: 1, image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=200&h=200&fit=crop" },
  { id: 2, shop: "Shopee", product: "Smart Watch", unitPrice: 1299, quantity: 2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { id: 3, shop: "Lazada", product: "LED Ring Light", unitPrice: 499, quantity: 1, image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=200&h=200&fit=crop" },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(defaultCart);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
