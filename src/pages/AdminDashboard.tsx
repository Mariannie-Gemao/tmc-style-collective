import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users, FileText, BarChart3, Search, Trash2, ArrowLeft,
  Package, Clock, CheckCircle, XCircle, Mail, Phone, Plus, Pencil, ExternalLink, Image as ImageIcon, Link2, X
} from "lucide-react";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface Inquiry {
  id: string;
  category: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  product: string;
  quantity: number;
  status: string;
  created_at: string;
}

interface DbProduct {
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
  created_at: string;
}

const PLATFORMS = ["tiktok", "shopee", "special"] as const;
const CATEGORIES = ["hardware", "electronics", "construction-materials", "furniture", "lighting", "tools", "industrial", "home-supplies"];

const emptyProduct: Omit<DbProduct, "id" | "created_at"> = {
  name: "",
  price: 0,
  original_price: null,
  discount: null,
  rating: 4.5,
  reviews: 0,
  sold: 0,
  image: "",
  shop_url: "",
  category: "electronics",
  platform: "tiktok",
};

const AdminDashboard = () => {
  const { isAdmin, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "inquiries" | "users">("overview");
  const [users, setUsers] = useState<Profile[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Product form state
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate("/");
    }
  }, [loading, isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, activeTab]);

  const fetchData = async () => {
    if (activeTab === "users" || activeTab === "overview") {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (data) setUsers(data);
    }
    if (activeTab === "inquiries" || activeTab === "overview") {
      const { data } = await supabase.from("sourcing_inquiries").select("*").order("created_at", { ascending: false });
      if (data) setInquiries(data as Inquiry[]);
    }
    if (activeTab === "products" || activeTab === "overview") {
      const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
      if (data) setProducts(data as unknown as DbProduct[]);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    await supabase.from("sourcing_inquiries").update({ status }).eq("id", id);
    toast({ title: `Inquiry marked as ${status}` });
    fetchData();
  };

  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm(emptyProduct);
    setShowProductForm(true);
  };

  const openEditProduct = (p: DbProduct) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      price: p.price,
      original_price: p.original_price,
      discount: p.discount,
      rating: p.rating,
      reviews: p.reviews,
      sold: p.sold,
      image: p.image,
      shop_url: p.shop_url,
      category: p.category,
      platform: p.platform,
    });
    setShowProductForm(true);
  };

  const saveProduct = async () => {
    if (!productForm.name || !productForm.price) {
      toast({ title: "Name and price are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name: productForm.name,
      price: Number(productForm.price),
      original_price: productForm.original_price ? Number(productForm.original_price) : null,
      discount: productForm.discount ? Number(productForm.discount) : null,
      rating: productForm.rating ? Number(productForm.rating) : 4.5,
      reviews: productForm.reviews ? Number(productForm.reviews) : 0,
      sold: productForm.sold ? Number(productForm.sold) : 0,
      image: productForm.image || "",
      shop_url: productForm.shop_url || "",
      category: productForm.category || null,
      platform: productForm.platform,
    };

    if (editingProduct) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingProduct.id);
      if (error) { toast({ title: "Error updating product", description: error.message, variant: "destructive" }); }
      else { toast({ title: "Product updated!" }); }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Error adding product", description: error.message, variant: "destructive" }); }
      else { toast({ title: "Product added!" }); }
    }
    setSaving(false);
    setShowProductForm(false);
    fetchData();
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Error deleting", description: error.message, variant: "destructive" });
    else toast({ title: "Product deleted" });
    fetchData();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return null;

  const stats = [
    { label: "Products", value: products.length, icon: Package, color: "text-blue-500" },
    { label: "Total Users", value: users.length, icon: Users, color: "text-primary" },
    { label: "Inquiries", value: inquiries.length, icon: FileText, color: "text-accent" },
    { label: "Pending", value: inquiries.filter(i => i.status === "pending").length, icon: Clock, color: "text-yellow-500" },
  ];

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: BarChart3 },
    { key: "products" as const, label: "Products", icon: Package },
    { key: "inquiries" as const, label: "Inquiries", icon: FileText },
    { key: "users" as const, label: "Users", icon: Users },
  ];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    (u.full_name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your TMC Shop</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              className={`gap-2 rounded-full ${activeTab === tab.key ? "bg-accent text-accent-foreground" : ""}`}
              onClick={() => { setActiveTab(tab.key); setSearchQuery(""); setShowProductForm(false); }}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="bg-card rounded-xl p-5 border shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Recent Inquiries</h3>
              {inquiries.slice(0, 5).length > 0 ? (
                <div className="space-y-3">
                  {inquiries.slice(0, 5).map(inq => (
                    <div key={inq.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">{inq.name}</p>
                        <p className="text-xs text-muted-foreground">{inq.category} — {inq.product} × {inq.quantity}</p>
                      </div>
                      <Badge variant={inq.status === "pending" ? "secondary" : inq.status === "completed" ? "default" : "destructive"}>
                        {inq.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No inquiries yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === "products" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 rounded-full" />
              </div>
              <Button onClick={openAddProduct} className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full btn-shine">
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="bg-card border rounded-2xl p-6 shadow-lg animate-fade-in relative">
                <button onClick={() => setShowProductForm(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
                <h3 className="font-heading text-lg font-bold text-foreground mb-5">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Product Name *</label>
                    <Input value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Wireless Bluetooth Earbuds Pro" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Platform *</label>
                    <Select value={productForm.platform} onValueChange={v => setProductForm(f => ({ ...f, platform: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PLATFORMS.map(p => <SelectItem key={p} value={p}>{p === "tiktok" ? "TikTok" : p === "shopee" ? "Shopee" : "Special"}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                    <Select value={productForm.category || ""} onValueChange={v => setProductForm(f => ({ ...f, category: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Price (₱) *</label>
                    <Input type="number" value={productForm.price || ""} onChange={e => setProductForm(f => ({ ...f, price: Number(e.target.value) }))} placeholder="599" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Original Price (₱)</label>
                    <Input type="number" value={productForm.original_price || ""} onChange={e => setProductForm(f => ({ ...f, original_price: e.target.value ? Number(e.target.value) : null }))} placeholder="1299" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Discount %</label>
                    <Input type="number" value={productForm.discount || ""} onChange={e => setProductForm(f => ({ ...f, discount: e.target.value ? Number(e.target.value) : null }))} placeholder="50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Rating</label>
                    <Input type="number" step="0.1" value={productForm.rating || ""} onChange={e => setProductForm(f => ({ ...f, rating: Number(e.target.value) }))} placeholder="4.5" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Reviews</label>
                    <Input type="number" value={productForm.reviews || ""} onChange={e => setProductForm(f => ({ ...f, reviews: Number(e.target.value) }))} placeholder="1234" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Units Sold</label>
                    <Input type="number" value={productForm.sold || ""} onChange={e => setProductForm(f => ({ ...f, sold: Number(e.target.value) }))} placeholder="5000" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><ImageIcon className="h-3 w-3" /> Image URL</label>
                    <Input value={productForm.image || ""} onChange={e => setProductForm(f => ({ ...f, image: e.target.value }))} placeholder="https://images.unsplash.com/..." />
                    {productForm.image && (
                      <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden bg-muted border">
                        <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><Link2 className="h-3 w-3" /> Affiliate Link (Shop URL)</label>
                    <Input value={productForm.shop_url || ""} onChange={e => setProductForm(f => ({ ...f, shop_url: e.target.value }))} placeholder="https://www.tiktok.com/shop/product/..." />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button onClick={saveProduct} disabled={saving} className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-bold btn-shine gap-2">
                    {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                  <Button variant="outline" onClick={() => setShowProductForm(false)} className="rounded-full">Cancel</Button>
                </div>
              </div>
            )}

            {/* Product List */}
            {filteredProducts.length > 0 ? (
              <div className="space-y-3">
                {filteredProducts.map(p => (
                  <div key={p.id} className="bg-card rounded-xl border p-4 shadow-sm flex gap-4 items-center animate-fade-in group hover:border-accent/30 transition-colors">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0 border">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground"><Package className="h-6 w-6 opacity-30" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">{p.name}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-[10px]">{p.platform}</Badge>
                        {p.category && <Badge variant="outline" className="text-[10px]">{p.category.replace(/-/g, " ")}</Badge>}
                        <span className="text-sm font-bold text-accent">₱{Number(p.price).toLocaleString()}</span>
                        {p.original_price && <span className="text-xs text-muted-foreground line-through">₱{Number(p.original_price).toLocaleString()}</span>}
                      </div>
                      {p.shop_url && (
                        <a href={p.shop_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-accent/70 hover:text-accent flex items-center gap-1 mt-1 truncate max-w-xs" onClick={e => e.stopPropagation()}>
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{p.shop_url}</span>
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-accent" onClick={() => openEditProduct(p)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive" onClick={() => deleteProduct(p.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery ? "No products match your search." : "No products yet. Add your first product!"}
              </div>
            )}
          </div>
        )}

        {/* Inquiries */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search inquiries..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 rounded-full" />
            </div>
            {filteredInquiries.length > 0 ? (
              <div className="space-y-4">
                {filteredInquiries.map(inq => (
                  <div key={inq.id} className="bg-card rounded-xl border p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{inq.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{inq.email}</span>
                          {inq.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{inq.phone}</span>}
                        </div>
                      </div>
                      <Badge variant={inq.status === "pending" ? "secondary" : inq.status === "completed" ? "default" : "destructive"}>
                        {inq.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
                      <div><span className="text-muted-foreground">Category:</span> <span className="font-medium text-foreground">{inq.category}</span></div>
                      <div><span className="text-muted-foreground">Product:</span> <span className="font-medium text-foreground">{inq.product}</span></div>
                      <div><span className="text-muted-foreground">Qty:</span> <span className="font-medium text-foreground">{inq.quantity}</span></div>
                      {inq.company && <div><span className="text-muted-foreground">Company:</span> <span className="font-medium text-foreground">{inq.company}</span></div>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1 text-green-600 border-green-200 hover:bg-green-50" onClick={() => updateInquiryStatus(inq.id, "completed")}>
                        <CheckCircle className="h-3 w-3" /> Complete
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-destructive border-destructive/20 hover:bg-destructive/5" onClick={() => updateInquiryStatus(inq.id, "cancelled")}>
                        <XCircle className="h-3 w-3" /> Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">No inquiries found.</div>
            )}
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 rounded-full" />
            </div>
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map(user => (
                  <div key={user.id} className="bg-card rounded-xl border p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.full_name || "Unnamed User"}</p>
                        <p className="text-xs text-muted-foreground">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">No users found.</div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
