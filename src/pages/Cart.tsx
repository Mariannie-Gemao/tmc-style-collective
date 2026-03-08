import { Trash2, ShoppingCart, ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import PageLoader from "@/components/PageLoader";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <PageLoader>
      <div className="min-h-screen bg-secondary/30">
        {/* Header Bar */}
        <div className="bg-card border-b sticky top-0 z-40">
          <div className="container flex items-center gap-3 h-14">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <ShoppingBag className="h-5 w-5 text-accent" />
            <h1 className="font-heading text-lg font-bold text-foreground tracking-tight">Shopping Cart</h1>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        <div className="container py-6">
          {cart.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">Looks like you haven't added anything yet. Start exploring our products!</p>
              <Button onClick={() => navigate("/")} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 h-11 font-semibold btn-shine relative overflow-hidden">
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-card border rounded-2xl p-4 sm:p-5 flex gap-4 shadow-sm hover:shadow-md transition-all duration-300 group"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.product}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full mb-1.5">{item.shop}</span>
                          <h3 className="font-heading font-bold text-foreground text-base sm:text-lg leading-tight truncate">{item.product}</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0 h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>₱{item.unitPrice.toLocaleString()} × {item.quantity}</span>
                        </div>
                        <p className="text-accent font-heading font-bold text-lg">₱{(item.unitPrice * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border rounded-2xl shadow-sm sticky top-20 overflow-hidden">
                  <div className="bg-accent/5 px-6 py-4 border-b">
                    <h2 className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-accent" />
                      Order Summary
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 text-sm">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <span className="text-muted-foreground truncate mr-3 text-xs">{item.product} ×{item.quantity}</span>
                          <span className="text-foreground font-medium text-xs whitespace-nowrap">₱{(item.unitPrice * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-5 pt-4 flex justify-between items-center">
                      <span className="font-heading font-bold text-foreground text-sm">Total</span>
                      <span className="font-heading font-bold text-2xl text-accent">₱{total.toLocaleString()}</span>
                    </div>
                    <Button className="w-full mt-5 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-heading font-bold h-12 text-base btn-shine relative overflow-hidden btn-glow-accent">
                      Proceed to Checkout
                    </Button>
                    <Button variant="ghost" onClick={() => navigate("/")} className="w-full mt-2 text-muted-foreground hover:text-foreground text-sm font-medium">
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLoader>
  );
};

export default Cart;
