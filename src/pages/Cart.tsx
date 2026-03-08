import { Trash2, ShoppingCart, ArrowLeft, ShoppingBag, Sparkles, Package, Shield, Truck, Minus, Plus } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          </div>
          <div className="container relative py-8 pb-10">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="gradient-accent p-3 rounded-xl icon-bounce shadow-lg">
                    <ShoppingBag className="h-6 w-6 text-accent-foreground" />
                  </div>
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center ring-2 ring-primary">{cart.length}</span>
                  )}
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-bold text-primary-foreground tracking-tight">Shopping Cart</h1>
                  <p className="text-primary-foreground/60 text-sm">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {cart.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-muted to-muted/50 mb-8 shadow-inner">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/60" />
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/20 animate-[spin_20s_linear_infinite]" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground text-sm mb-10 max-w-sm mx-auto leading-relaxed">Discover amazing products from top shops and add them to your cart!</p>
              <Button onClick={() => navigate("/")} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-12 font-heading font-bold text-base btn-shine relative overflow-hidden btn-glow-accent shadow-lg">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-card border border-border/50 rounded-2xl p-0 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-500 overflow-hidden animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Accent top line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex gap-5 p-5">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden ring-1 ring-border/30 group-hover:ring-accent/30 transition-all duration-300">
                          <img
                            src={item.image}
                            alt={item.product}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                          {item.shop}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading font-bold text-foreground text-lg leading-tight mb-1 group-hover:text-accent transition-colors duration-300">{item.product}</h3>
                          <p className="text-xs text-muted-foreground">Unit price: ₱{item.unitPrice.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-end justify-between mt-3">
                          {/* Quantity Display */}
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground mr-1">Qty:</span>
                            <span className="inline-flex items-center justify-center h-8 px-4 rounded-full bg-muted text-foreground font-heading font-bold text-sm">{item.quantity}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <p className="text-accent font-heading font-bold text-xl">₱{(item.unitPrice * item.quantity).toLocaleString()}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 h-9 w-9 rounded-full"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: Shield, label: "Secure Checkout", color: "text-green-500" },
                    { icon: Truck, label: "Fast Delivery", color: "text-blue-500" },
                    { icon: Package, label: "Quality Assured", color: "text-accent" },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border/30 text-center hover:border-accent/20 transition-colors duration-300">
                      <Icon className={`h-5 w-5 ${color}`} />
                      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border/50 rounded-2xl shadow-lg sticky top-6 overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
                  {/* Summary Header with Glow */}
                  <div className="relative px-6 py-5 border-b overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-accent/20 rounded-full blur-2xl" />
                    <h2 className="relative font-heading font-bold text-lg text-foreground flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Order Summary
                    </h2>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Item Breakdown */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center group/item">
                          <span className="text-muted-foreground truncate mr-3 text-sm group-hover/item:text-foreground transition-colors">{item.product} <span className="text-xs opacity-60">×{item.quantity}</span></span>
                          <span className="text-foreground font-medium text-sm whitespace-nowrap">₱{(item.unitPrice * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal & Shipping */}
                    <div className="border-t border-dashed pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground font-medium">₱{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className={`font-medium ${shipping === 0 ? 'text-green-500' : 'text-foreground'}`}>
                          {shipping === 0 ? 'FREE' : `₱${shipping}`}
                        </span>
                      </div>
                      {shipping > 0 && (
                        <p className="text-[11px] text-accent font-medium">Free shipping on orders over ₱2,000!</p>
                      )}
                    </div>

                    {/* Grand Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-heading font-bold text-foreground">Total</span>
                        <div className="text-right">
                          <span className="font-heading font-bold text-3xl text-accent">₱{grandTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-heading font-bold h-13 text-base btn-shine relative overflow-hidden btn-glow-accent shadow-lg mt-2 py-3.5">
                      Proceed to Checkout
                    </Button>
                    
                    <Button variant="ghost" onClick={() => navigate("/")} className="w-full text-muted-foreground hover:text-accent text-sm font-medium rounded-full">
                      ← Continue Shopping
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
