import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowLeft, ShoppingBag, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/PageLoader";

const tabs = [
  { key: "all", label: "All" },
  { key: "to-pay", label: "To Pay" },
  { key: "to-ship", label: "To Ship" },
  { key: "to-receive", label: "To Receive" },
  { key: "completed", label: "Completed" },
  { key: "cancel", label: "Cancel" },
  { key: "refund", label: "Refund" },
];

const orders = [
  { id: "ORD-001", product: "Wireless Earbuds", shop: "TikTok Shop", status: "to-pay", price: 899, date: "2024-12-01", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=200&h=200&fit=crop" },
  { id: "ORD-002", product: "Smart Watch", shop: "Shopee", status: "to-ship", price: 1299, date: "2024-12-03", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" },
  { id: "ORD-003", product: "LED Ring Light", shop: "TikTok Shop", status: "to-receive", price: 499, date: "2024-12-05", image: "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=200&h=200&fit=crop" },
  { id: "ORD-004", product: "Bluetooth Speaker", shop: "TikTok Shop", status: "completed", price: 649, date: "2024-11-20", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop" },
  { id: "ORD-005", product: "USB-C Charger", shop: "Shopee", status: "completed", price: 349, date: "2024-11-15", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop" },
];

const MyPurchase = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filteredOrders = activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

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
                <h1 className="font-heading text-lg font-bold text-foreground">My Purchase</h1>
              </div>
            </div>
            <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 z-30 backdrop-blur-xl bg-background/80 border-b border-border/40">
          <div className="container overflow-x-auto -mx-0 px-4">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-3 text-sm font-medium transition-colors flex items-center gap-1.5 border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === tab.key
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container py-6 lg:py-8">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <Package className="h-14 w-14 text-accent/40" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 animate-[spin_25s_linear_infinite]" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">No orders found</h2>
              <p className="text-muted-foreground text-sm mb-10 max-w-xs text-center leading-relaxed">Start shopping to see your orders here.</p>
              <Button onClick={() => navigate("/")} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-12 font-heading font-bold btn-shine relative overflow-hidden shadow-lg">
                Explore Products
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Hover accent line */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  <div className="flex items-center gap-3 p-4 sm:p-5">
                    {/* Image */}
                    <div className="relative flex-shrink-0 w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-xl overflow-hidden bg-muted">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading font-bold text-foreground text-[15px] sm:text-base leading-snug group-hover:text-accent transition-colors duration-300 truncate">
                            {order.product}
                          </h3>
                          <span className={`flex-shrink-0 inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full capitalize ${
                            order.status === "completed"
                              ? "bg-green-500/10 text-green-600"
                              : order.status === "to-pay"
                              ? "bg-yellow-500/10 text-yellow-600"
                              : order.status === "to-ship"
                              ? "bg-blue-500/10 text-blue-600"
                              : order.status === "cancel"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-purple-500/10 text-purple-600"
                          }`}>
                            {order.status.replace("-", " ")}
                          </span>
                        </div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent/80 mt-0.5">{order.shop}</span>
                      </div>
                      <div className="flex items-end justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Order {order.id} · {order.date}</span>
                        <span className="font-heading font-bold text-lg text-accent">₱{order.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLoader>
  );
};

export default MyPurchase;
