import { ArrowLeft, Globe, ShoppingCart, Truck, ShieldCheck, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">About Us</h1>
              <p className="text-sm text-muted-foreground">Get to know TMC Shop</p>
            </div>
          </div>

          {/* Hero */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">TMC Shop</h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-2xl">
              Your trusted destination for trending products from TikTok Shop, Shopee, and our exclusive global sourcing catalog. We connect you to the best deals — all in one place.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card border border-border/40 rounded-xl p-6">
              <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make trending, quality products accessible to every Filipino by curating the best items from top online platforms and global suppliers — at unbeatable prices.
              </p>
            </div>
            <div className="bg-card border border-border/40 rounded-xl p-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the Philippines' leading affiliate shopping platform, bridging local consumers with global products through trusted sourcing and seamless online shopping.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">Why Choose TMC Shop?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: ShoppingCart, title: "Curated Products", desc: "Hand-picked trending items from TikTok & Shopee" },
              { icon: Globe, title: "Global Sourcing", desc: "Direct access to verified international manufacturers" },
              { icon: Truck, title: "Reliable Delivery", desc: "Fast and secure shipping nationwide" },
              { icon: ShieldCheck, title: "Trusted Quality", desc: "Quality-checked products you can rely on" },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border/40 rounded-xl p-5 text-center group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-3 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="bg-card border border-border/40 rounded-xl p-6 md:p-8 text-center">
            <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Our Team</h3>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              TMC Shop is run by a passionate team dedicated to helping Filipinos discover and shop the best products online. From sourcing to customer support, we've got you covered.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </PageLoader>
  );
};

export default AboutUs;