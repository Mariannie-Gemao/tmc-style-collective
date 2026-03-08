import { Trash2, ShoppingCart, ArrowLeft, ShoppingBag, Sparkles, Package, Shield, Truck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import PageLoader from "@/components/PageLoader";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = total > 2000 ? 0 : 99;
  const grandTotal = total + shipping;

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        {/* Floating Header */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/40">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full hover:bg-accent/10 hover:text-accent">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-accent" />
                <h1 className="font-heading text-lg font-bold text-foreground">My Cart</h1>
              </div>
            </div>
            <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="container">
            <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <ShoppingCart className="h-14 w-14 text-accent/40" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 animate-[spin_25s_linear_infinite]" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Nothing here yet</h2>
              <p className="text-muted-foreground text-sm mb-10 max-w-xs text-center leading-relaxed">Your cart is waiting to be filled with amazing finds.</p>
              <Button onClick={() => navigate("/")} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-12 font-heading font-bold btn-shine relative overflow-hidden shadow-lg">
                Explore Products
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="container py-6 lg:py-8">
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Cart Items — takes 3 cols */}
              <div className="lg:col-span-3 space-y-3">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in hover:border-accent/30 transition-all duration-500"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {/* Hover accent line */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    <div className="flex gap-4 p-4 sm:p-5">
                      {/* Image */}
                      <div className="relative flex-shrink-0 w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] rounded-xl overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.product}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-heading font-bold text-foreground text-[15px] sm:text-base leading-snug group-hover:text-accent transition-colors duration-300 truncate">
                              {item.product}
                            </h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="flex-shrink-0 h-8 w-8 rounded-full text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent/80 mt-0.5">{item.shop}</span>
                        </div>

                        <div className="flex items-end justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            ₱{item.unitPrice.toLocaleString()} × {item.quantity}
                          </span>
                          <span className="font-heading font-bold text-lg text-accent">
                            ₱{(item.unitPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar — takes 2 cols */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 space-y-4 animate-fade-in" style={{ animationDelay: '150ms' }}>
                  {/* Summary Card */}
                  <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border/40 bg-accent/[0.03]">
                      <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-accent" />
                        Summary
                      </h2>
                    </div>

                    <div className="p-6 space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground truncate mr-4">{item.product} <span className="opacity-50">×{item.quantity}</span></span>
                          <span className="text-foreground font-medium whitespace-nowrap">₱{(item.unitPrice * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}

                      <div className="border-t border-dashed border-border/60 pt-4 space-y-2.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="text-foreground">₱{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className={shipping === 0 ? 'text-green-500 font-semibold text-xs' : 'text-foreground'}>
                            {shipping === 0 ? 'FREE' : `₱${shipping}`}
                          </span>
                        </div>
                        {shipping > 0 && (
                          <p className="text-[11px] text-accent/80 bg-accent/5 rounded-lg px-3 py-1.5 text-center">
                            Spend ₱{(2000 - total).toLocaleString()} more for free shipping!
                          </p>
                        )}
                      </div>

                      <div className="border-t pt-4 flex justify-between items-baseline">
                        <span className="font-heading font-bold text-foreground">Total</span>
                        <span className="font-heading font-bold text-2xl text-accent">₱{grandTotal.toLocaleString()}</span>
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-heading font-bold h-12 text-[15px] btn-shine relative overflow-hidden btn-glow-accent shadow-md mt-1">
                        Checkout
                      </Button>

                      <button onClick={() => navigate("/")} className="w-full text-center text-sm text-muted-foreground hover:text-accent transition-colors py-1">
                        ← Continue Shopping
                      </button>
                    </div>
                  </div>

                  {/* Trust Row */}
                  <div className="flex items-center justify-center gap-6 py-3 text-muted-foreground/60">
                    {[
                      { icon: Shield, label: "Secure" },
                      { icon: Truck, label: "Fast Delivery" },
                      { icon: Package, label: "Quality" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-[11px]">
                        <Icon className="h-3.5 w-3.5" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLoader>
  );
};

export default Cart;
