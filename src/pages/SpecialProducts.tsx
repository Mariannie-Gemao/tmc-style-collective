import { ArrowLeft, Wrench, Cpu, HardHat, Sofa, Lightbulb, Hammer, Factory, Globe, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLoader from "@/components/PageLoader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const sourcingCategories = [
  { name: "Hardware", icon: Wrench, description: "Bolts, nuts, hinges, locks, fasteners, and all types of hardware supplies sourced from trusted global manufacturers." },
  { name: "Electronics", icon: Cpu, description: "Consumer electronics, components, circuit boards, sensors, and smart devices from certified factories." },
  { name: "Construction Materials", icon: HardHat, description: "Cement, steel bars, roofing, tiles, pipes, and bulk construction materials at competitive wholesale prices." },
  { name: "Furniture", icon: Sofa, description: "Office furniture, home furniture, custom designs, and bulk orders from leading furniture manufacturers." },
  { name: "Lighting", icon: Lightbulb, description: "LED lights, industrial lighting, solar-powered systems, decorative fixtures, and smart lighting solutions." },
  { name: "Tools", icon: Hammer, description: "Power tools, hand tools, professional-grade equipment, and complete toolkits for every trade." },
  { name: "Industrial", icon: Factory, description: "Heavy machinery parts, safety equipment, industrial chemicals, and factory supplies at scale." },
];

const sourcingCountries = [
  "🇨🇳 China", "🇮🇳 India", "🇻🇳 Vietnam", "🇹🇭 Thailand", "🇮🇩 Indonesia",
  "🇲🇾 Malaysia", "🇹🇼 Taiwan", "🇰🇷 South Korea", "🇯🇵 Japan", "🇩🇪 Germany",
  "🇺🇸 United States", "🇹🇷 Turkey",
];

const SpecialProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", category: "", country: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry Submitted!", description: "Our sourcing team will contact you within 24 hours." });
    setForm({ name: "", email: "", phone: "", company: "", category: "", country: "", message: "" });
  };

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Special Products — Sourcing</h1>
              <p className="text-sm text-muted-foreground">Global sourcing for bulk & custom orders</p>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-card rounded-xl p-6 mb-10 border shadow-sm">
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">TMC Global Sourcing</h2>
            <p className="text-muted-foreground">
              We connect you directly with verified manufacturers and suppliers worldwide. Whether you need bulk orders, custom specifications, or hard-to-find industrial items — our sourcing team handles procurement, quality inspection, and logistics so you don't have to.
            </p>
          </div>

          {/* Categories with Icons */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">Available Sourcing Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {sourcingCategories.map((cat) => (
              <div key={cat.name} className="bg-card border rounded-xl p-5 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-full bg-primary/10 text-primary">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">{cat.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>

          {/* Countries */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Sourcing Countries</h2>
          <p className="text-muted-foreground mb-4">We source products from the following countries:</p>
          <div className="flex flex-wrap gap-3 mb-12">
            {sourcingCountries.map((c) => (
              <span key={c} className="flex items-center gap-1.5 bg-card border rounded-full px-4 py-2 text-sm font-medium text-foreground">
                <Globe className="h-3.5 w-3.5 text-primary" />
                {c}
              </span>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">Contact Our Sourcing Team</h2>
              <p className="text-sm text-muted-foreground mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                    <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Juan Dela Cruz" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                    <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="juan@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Phone Number *</label>
                    <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+63 9XX XXX XXXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Company Name</label>
                    <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your Company" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Category of Interest *</label>
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select category</option>
                      {sourcingCategories.map((c) => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Preferred Sourcing Country</label>
                    <select
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select country</option>
                      {sourcingCountries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Message / Requirements *</label>
                  <Textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe the products you need, quantities, specifications..." rows={4} />
                </div>
                <Button type="submit" className="w-full gradient-accent text-accent-foreground gap-2">
                  <Send className="h-4 w-4" />
                  Submit Sourcing Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default SpecialProducts;
