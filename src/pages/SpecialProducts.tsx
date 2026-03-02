import { ArrowLeft, Wrench, Cpu, HardHat, Sofa, Lightbulb, Hammer, Factory, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const sourcingCategories = [
  { name: "Hardware", slug: "hardware", icon: Wrench, description: "Bolts, nuts, hinges, locks, fasteners, and all types of hardware supplies sourced from trusted global manufacturers.", color: "bg-sourcing/10 text-sourcing" },
  { name: "Electronics", slug: "electronics", icon: Cpu, description: "Consumer electronics, components, circuit boards, sensors, and smart devices from certified factories.", color: "bg-highlight/10 text-highlight" },
  { name: "Construction Materials", slug: "construction-materials", icon: HardHat, description: "Cement, steel bars, roofing, tiles, pipes, and bulk construction materials at competitive wholesale prices.", color: "bg-sourcing/10 text-sourcing" },
  { name: "Furniture", slug: "furniture", icon: Sofa, description: "Office furniture, home furniture, custom designs, and bulk orders from leading furniture manufacturers.", color: "bg-highlight/10 text-highlight" },
  { name: "Lighting", slug: "lighting", icon: Lightbulb, description: "LED lights, industrial lighting, solar-powered systems, decorative fixtures, and smart lighting solutions.", color: "bg-sourcing/10 text-sourcing" },
  { name: "Tools", slug: "tools", icon: Hammer, description: "Power tools, hand tools, professional-grade equipment, and complete toolkits for every trade.", color: "bg-highlight/10 text-highlight" },
  { name: "Industrial", slug: "industrial", icon: Factory, description: "Heavy machinery parts, safety equipment, industrial chemicals, and factory supplies at scale.", color: "bg-sourcing/10 text-sourcing" },
];

const SpecialProducts = () => {
  const navigate = useNavigate();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Special Products — Global Sourcing</h1>
              <p className="text-sm text-muted-foreground">Select a category to get started</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-10 border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sourcing via-highlight to-sourcing" />
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">TMC Global Sourcing</h2>
            <p className="text-muted-foreground">
              We connect you directly with verified manufacturers and suppliers worldwide. Choose a category below and our team will handle procurement, quality inspection, and logistics.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sourcingCategories.map((cat) => (
              <div
                key={cat.name}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/special-products/${cat.slug}`)}
              >
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
                <div className="p-4">
                  <h3 className="font-medium text-foreground text-sm mb-1 group-hover:text-sourcing transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{cat.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs font-medium text-sourcing">
                    <span>Learn More</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </PageLoader>
  );
};

export default SpecialProducts;
