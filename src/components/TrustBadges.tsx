import { Globe, Package, BadgeCheck, Handshake } from "lucide-react";

const badges = [
  {
    icon: Globe,
    title: "Global Sourcing",
    description: "Direct from manufacturers",
  },
  {
    icon: Package,
    title: "Bulk Orders",
    description: "Wholesale pricing available",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assured",
    description: "Verified suppliers only",
  },
  {
    icon: Handshake,
    title: "Trusted Partner",
    description: "Reliable trade solutions",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-10 bg-card border-y overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <div
              key={badge.title}
              className="flex items-center gap-4 group animate-fade-in"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
            >
              <div className="gradient-primary p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <badge.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
