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
  ShoppingCart, Users, FileText, BarChart3, Search, Eye, Trash2, ArrowLeft,
  Package, Globe, Clock, CheckCircle, XCircle, Mail, Phone
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

const AdminDashboard = () => {
  const { isAdmin, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "inquiries" | "users">("overview");
  const [users, setUsers] = useState<Profile[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate("/");
    }
  }, [loading, isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
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
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    await supabase.from("sourcing_inquiries").update({ status }).eq("id", id);
    toast({ title: `Inquiry marked as ${status}` });
    fetchData();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return null;

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "text-primary" },
    { label: "Inquiries", value: inquiries.length, icon: FileText, color: "text-accent" },
    { label: "Pending", value: inquiries.filter(i => i.status === "pending").length, icon: Clock, color: "text-yellow-500" },
    { label: "Completed", value: inquiries.filter(i => i.status === "completed").length, icon: CheckCircle, color: "text-green-500" },
  ];

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: BarChart3 },
    { key: "inquiries" as const, label: "Inquiries", icon: FileText },
    { key: "users" as const, label: "Users", icon: Users },
  ];

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
              onClick={() => { setActiveTab(tab.key); setSearchQuery(""); }}
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
