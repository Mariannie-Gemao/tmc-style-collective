import { ArrowLeft, Wrench, Cpu, HardHat, Sofa, Lightbulb, Hammer, Factory, Globe, Send, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const categoryData: Record<string, {
  name: string;
  icon: React.ElementType;
  description: string;
  details: string[];
  products: string[];
  countries: string[];
}> = {
  hardware: {
    name: "Hardware",
    icon: Wrench,
    description: "Bolts, nuts, hinges, locks, fasteners, and all types of hardware supplies sourced from trusted global manufacturers. We handle bulk procurement with strict quality control.",
    details: [
      "Stainless steel & galvanized bolts, nuts, washers",
      "Door hinges, locks, handles & fittings",
      "Anchors, rivets, screws & fasteners",
      "Cabinet hardware & drawer slides",
      "Custom OEM hardware manufacturing",
    ],
    products: ["Stainless Steel Bolts", "Galvanized Nuts & Washers", "Door Hinges Set", "Cabinet Drawer Slides", "Padlocks & Deadbolts", "Anchors & Rivets", "Screws Assortment Pack", "Custom OEM Hardware"],
    countries: ["🇨🇳 China", "🇮🇳 India", "🇹🇼 Taiwan", "🇰🇷 South Korea", "🇩🇪 Germany", "🇺🇸 United States"],
  },
  electronics: {
    name: "Electronics",
    icon: Cpu,
    description: "Consumer electronics, components, circuit boards, sensors, and smart devices from certified factories worldwide. All items pass rigorous testing and certification.",
    details: [
      "PCB boards, microcontrollers & sensors",
      "Smart home devices & IoT products",
      "LED displays, screens & monitors",
      "Batteries, chargers & power supplies",
      "Custom electronic assembly & design",
    ],
    products: ["PCB Circuit Boards", "Microcontrollers", "Smart Home Sensors", "LED Display Panels", "Power Supply Units", "Lithium Batteries", "USB Chargers", "Custom Electronic Assembly"],
    countries: ["🇨🇳 China", "🇹🇼 Taiwan", "🇰🇷 South Korea", "🇯🇵 Japan", "🇻🇳 Vietnam", "🇲🇾 Malaysia"],
  },
  "construction-materials": {
    name: "Construction Materials",
    icon: HardHat,
    description: "Cement, steel bars, roofing, tiles, pipes, and bulk construction materials at competitive wholesale prices. Direct from quarries and mills.",
    details: [
      "Portland cement & ready-mix concrete",
      "Steel reinforcement bars & structural steel",
      "Roofing sheets, tiles & waterproofing",
      "PVC pipes, fittings & plumbing supplies",
      "Sand, gravel & aggregate materials",
    ],
    products: ["Portland Cement (bags)", "Steel Reinforcement Bars", "Roofing Sheets", "Ceramic Floor Tiles", "PVC Pipes & Fittings", "Waterproofing Membrane", "Sand & Gravel", "Structural Steel Beams"],
    countries: ["🇨🇳 China", "🇮🇳 India", "🇻🇳 Vietnam", "🇹🇭 Thailand", "🇮🇩 Indonesia", "🇹🇷 Turkey"],
  },
  furniture: {
    name: "Furniture",
    icon: Sofa,
    description: "Office furniture, home furniture, custom designs, and bulk orders from leading furniture manufacturers. From concept to delivery.",
    details: [
      "Office desks, chairs & workstations",
      "Home living room & bedroom sets",
      "Custom design & OEM furniture",
      "Hotel & restaurant furniture packages",
      "Shelving, storage & display units",
    ],
    products: ["Ergonomic Office Chair", "Standing Desk", "Conference Table", "Sofa Set", "Bedroom Set", "Dining Table & Chairs", "Display Shelving Unit", "Custom OEM Furniture"],
    countries: ["🇨🇳 China", "🇻🇳 Vietnam", "🇮🇳 India", "🇮🇩 Indonesia", "🇲🇾 Malaysia", "🇹🇭 Thailand"],
  },
  lighting: {
    name: "Lighting",
    icon: Lightbulb,
    description: "LED lights, industrial lighting, solar-powered systems, decorative fixtures, and smart lighting solutions. Energy-efficient and certified products.",
    details: [
      "LED bulbs, tubes & panel lights",
      "Solar street lights & flood lights",
      "Industrial high-bay & warehouse lighting",
      "Decorative chandeliers & wall sconces",
      "Smart lighting controllers & dimmers",
    ],
    products: ["LED Bulbs (pack)", "LED Panel Lights", "Solar Street Light", "Solar Flood Light", "High-Bay Warehouse Light", "Decorative Chandelier", "Wall Sconce", "Smart Dimmer Switch"],
    countries: ["🇨🇳 China", "🇮🇳 India", "🇹🇼 Taiwan", "🇩🇪 Germany", "🇰🇷 South Korea", "🇯🇵 Japan"],
  },
  tools: {
    name: "Tools",
    icon: Hammer,
    description: "Power tools, hand tools, professional-grade equipment, and complete toolkits for every trade. Sourced from top-tier factories.",
    details: [
      "Cordless drills, grinders & saws",
      "Hand tools: wrenches, pliers, screwdrivers",
      "Measuring instruments & levels",
      "Welding machines & accessories",
      "Complete professional tool kits",
    ],
    products: ["Cordless Drill 21V", "Angle Grinder", "Circular Saw", "Wrench Set", "Pliers Set", "Laser Level", "Welding Machine", "Professional Tool Kit"],
    countries: ["🇨🇳 China", "🇩🇪 Germany", "🇯🇵 Japan", "🇺🇸 United States", "🇹🇼 Taiwan", "🇰🇷 South Korea"],
  },
  industrial: {
    name: "Industrial",
    icon: Factory,
    description: "Heavy machinery parts, safety equipment, industrial chemicals, and factory supplies at scale. Full compliance with safety standards.",
    details: [
      "Safety helmets, gloves & protective gear",
      "Industrial pumps, valves & compressors",
      "Conveyor belts & material handling",
      "Industrial chemicals & lubricants",
      "Factory automation & control systems",
    ],
    products: ["Safety Helmets", "Industrial Gloves (box)", "Air Compressor", "Industrial Pump", "Conveyor Belt Rollers", "Industrial Lubricant", "Safety Goggles", "Control Panel System"],
    countries: ["🇨🇳 China", "🇮🇳 India", "🇩🇪 Germany", "🇺🇸 United States", "🇯🇵 Japan", "🇹🇷 Turkey"],
  },
};

const SourcingCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", product: "", quantity: 1 });

  const category = slug ? categoryData[slug] : null;

  if (!category) {
    return (
      <PageLoader>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Category Not Found</h1>
            <Button onClick={() => navigate("/special-products")}>Back to Special Products</Button>
          </div>
        </div>
      </PageLoader>
    );
  }

  const IconComponent = category.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry Submitted!", description: `Our ${category.name} sourcing team will contact you within 24 hours.` });
    setForm({ name: "", email: "", phone: "", company: "", product: "", quantity: 1 });
  };

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/special-products")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="p-3 rounded-full bg-accent/10 text-accent">
              <IconComponent className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">{category.name} — Global Sourcing</h1>
              <p className="text-sm text-muted-foreground">Bulk & custom orders worldwide</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card rounded-xl p-6 mb-8 border shadow-sm">
            <h2 className="font-heading text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full bg-accent inline-block" />
              About {category.name} Sourcing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{category.description}</p>
            <ul className="space-y-2">
              {category.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div className="mb-8">
            <h2 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full bg-accent inline-block" />
              Available Sourcing Countries
            </h2>
            <div className="flex flex-wrap gap-3">
              {category.countries.map((c) => (
                <span key={c} className="flex items-center gap-1.5 bg-card border rounded-full px-4 py-2 text-sm font-medium text-foreground hover:border-accent transition-colors">
                  <Globe className="h-3.5 w-3.5 text-accent" />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 gradient-accent" />
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">Contact Us for {category.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">Fill out the form and our sourcing team will get back to you within 24 hours.</p>

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
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Product *</label>
                  <select
                    required
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a product</option>
                    {category.products.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Quantity *</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
                      className="h-10 w-10 rounded-md border border-input bg-background flex items-center justify-center hover:bg-accent/10 transition-colors"
                    >
                      <Minus className="h-4 w-4 text-foreground" />
                    </button>
                    <Input
                      type="number"
                      required
                      min={1}
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                      className="w-24 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, quantity: form.quantity + 1 })}
                      className="h-10 w-10 rounded-md border border-input bg-background flex items-center justify-center hover:bg-accent/10 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-foreground" />
                    </button>
                    <span className="text-sm text-muted-foreground">units</span>
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-accent text-accent-foreground gap-2">
                  <Send className="h-4 w-4" />
                  Submit {category.name} Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PageLoader>
  );
};

export default SourcingCategory;
