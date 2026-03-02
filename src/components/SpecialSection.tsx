import { Wrench, Cpu, HardHat, Sofa, Lightbulb, Hammer, Factory, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Hardware", slug: "hardware", icon: Wrench, description: "Bolts, nuts, hinges & fasteners", color: "bg-sourcing/10 text-sourcing" },
  { name: "Electronics", slug: "electronics", icon: Cpu, description: "Components & smart devices", color: "bg-highlight/10 text-highlight" },
  { name: "Construction Materials", slug: "construction-materials", icon: HardHat, description: "Cement, steel & roofing", color: "bg-sourcing/10 text-sourcing" },
  { name: "Furniture", slug: "furniture", icon: Sofa, description: "Office & home furniture", color: "bg-highlight/10 text-highlight" },
  { name: "Lighting", slug: "lighting", icon: Lightbulb, description: "LED, solar & smart lighting", color: "bg-sourcing/10 text-sourcing" },
  { name: "Tools", slug: "tools", icon: Hammer, description: "Power & hand tools", color: "bg-highlight/10 text-highlight" },
  { name: "Industrial", slug: "industrial", icon: Factory, description: "Machinery & safety equipment", color: "bg-sourcing/10 text-sourcing" },
];

const SpecialSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="gradient-sourcing p-2 rounded-lg">
              <span className="text-sourcing-foreground font-bold text-lg">⭐</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Special Products</h2>
              <p className="text-sm text-muted-foreground">Global sourcing for bulk & custom orders</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 rounded-full border-sourcing text-sourcing hover:bg-sourcing hover:text-sourcing-foreground"
            onClick={() => navigate("/special-products")}
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/special-products/${cat.slug}`)}
            >
              {/* Icon area matching product image */}
              <div className="relative aspect-square bg-secondary overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-sourcing/5 to-highlight/10" />
                <div className={`p-5 rounded-full ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className="h-12 w-12" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-sourcing/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                  <Button className="w-full bg-sourcing hover:bg-sourcing-dark text-sourcing-foreground gap-2 rounded-full">
                    <ExternalLink className="h-4 w-4" />
                    Shop Now
                  </Button>
                </div>
              </div>
              {/* Content */}
              <div className="p-4">
                <h3 className="font-medium text-foreground text-sm mb-1 group-hover:text-sourcing transition-colors">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-sourcing">
                  <span>Global Sourcing</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" className="gap-2 rounded-full border-sourcing text-sourcing hover:bg-sourcing hover:text-sourcing-foreground" onClick={() => navigate("/special-products")}>
            View All Special Products <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecialSection;
