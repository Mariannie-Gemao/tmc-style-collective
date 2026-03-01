import { Wrench, Cpu, HardHat, Sofa, Lightbulb, Hammer, Factory, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Hardware", icon: Wrench, description: "Bolts, nuts, hinges & fasteners" },
  { name: "Electronics", icon: Cpu, description: "Components & smart devices" },
  { name: "Construction Materials", icon: HardHat, description: "Cement, steel & roofing" },
  { name: "Furniture", icon: Sofa, description: "Office & home furniture" },
  { name: "Lighting", icon: Lightbulb, description: "LED, solar & smart lighting" },
  { name: "Tools", icon: Hammer, description: "Power & hand tools" },
  { name: "Industrial", icon: Factory, description: "Machinery & safety equipment" },
];

const SpecialSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="text-primary font-bold text-lg">⭐</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Special Products</h2>
              <p className="text-sm text-muted-foreground">Global sourcing for bulk & custom orders</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="hidden sm:flex gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate("/special-products")}
          >
            Learn More
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate("/special-products")}
              className="bg-card border rounded-xl p-5 flex flex-col items-center gap-3 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <cat.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-sm text-center">{cat.name}</h3>
              <p className="text-xs text-muted-foreground text-center">{cat.description}</p>
            </button>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" className="gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate("/special-products")}>
            Learn More <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecialSection;
