import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";
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
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-heading text-2xl font-bold text-foreground">My Purchase</h1>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto -mx-4 px-4 mb-6">
            <div className="flex gap-1 border-b min-w-max">
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

          {/* Orders */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-card border rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-accent font-medium mb-1">{order.shop}</p>
                      <h3 className="font-semibold text-foreground">{order.product}</h3>
                      <p className="text-sm text-muted-foreground">Order {order.id} · {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">₱{order.price.toLocaleString()}</p>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "to-pay"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "to-ship"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {order.status.replace("-", " ")}
                      </span>
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
