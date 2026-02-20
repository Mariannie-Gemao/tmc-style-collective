import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
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
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-accent" />
              <h1 className="text-2xl font-heading font-bold text-foreground">Shopping Cart</h1>
            </div>
            <span className="text-muted-foreground">({cart.length} items)</span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart!</p>
              <Button onClick={() => navigate("/")} className="bg-accent hover:bg-accent-dark text-accent-foreground rounded-full px-8">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-card border rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <img src={item.image} alt={item.product} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-accent mb-1">{item.shop}</p>
                      <h3 className="font-semibold text-foreground text-lg truncate">{item.product}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Unit Price: <span className="text-foreground font-medium">₱{item.unitPrice.toLocaleString()}</span></span>
                        <span>Qty: <span className="text-foreground font-medium">{item.quantity}</span></span>
                      </div>
                      <p className="mt-2 text-accent font-bold text-lg">₱{(item.unitPrice * item.quantity).toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="self-start text-destructive hover:bg-destructive/10" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-8">
                  <h2 className="font-heading font-bold text-lg text-foreground mb-4">Order Summary</h2>
                  <div className="space-y-3 text-sm">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-muted-foreground truncate mr-2">{item.product} x{item.quantity}</span>
                        <span className="text-foreground font-medium">₱{(item.unitPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-xl text-accent">₱{total.toLocaleString()}</span>
                  </div>
                  <Button className="w-full mt-4 bg-accent hover:bg-accent-dark text-accent-foreground rounded-full font-semibold h-12 text-base">
                    Proceed to Checkout
                  </Button>
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
