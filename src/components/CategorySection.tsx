import { Smartphone, Shirt, Home, Sparkles, Dumbbell, HardHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: Smartphone, color: "bg-blue-100 text-blue-600", slug: "electronics" },
  { name: "Construction Supplies", icon: HardHat, color: "bg-yellow-100 text-yellow-600", slug: "construction-supplies" },
  { name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600", slug: "fashion" },
  { name: "Beauty", icon: Sparkles, color: "bg-purple-100 text-purple-600", slug: "beauty" },
  { name: "Home & Living", icon: Home, color: "bg-green-100 text-green-600", slug: "home-living" },
  { name: "Sports", icon: Dumbbell, color: "bg-orange-100 text-orange-600", slug: "sports" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate(`/category/${category.slug}`)}
              className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`p-3 rounded-full ${category.color} group-hover:scale-110 transition-transform`}>
                <category.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-foreground text-center line-clamp-2">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
