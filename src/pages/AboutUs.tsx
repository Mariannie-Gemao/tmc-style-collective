import { Globe, ShoppingCart, Truck, ShieldCheck, Users, Target, ArrowLeft, Sparkles, Star, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "5K+", label: "Products Listed" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

const whyChoose = [
  { icon: ShoppingCart, title: "Curated Products", desc: "Hand-picked trending items from TikTok & Shopee" },
  { icon: Globe, title: "Global Sourcing", desc: "Direct access to verified international manufacturers" },
  { icon: Truck, title: "Reliable Delivery", desc: "Fast and secure shipping nationwide" },
  { icon: ShieldCheck, title: "Trusted Quality", desc: "Quality-checked products you can rely on" },
];

const values = [
  { icon: Heart, title: "Customer First", desc: "Every decision starts with what's best for our customers." },
  { icon: Star, title: "Excellence", desc: "We never settle — only the best products make the cut." },
  { icon: TrendingUp, title: "Innovation", desc: "Constantly evolving to bring you the latest trends and deals." },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Floating Sub-header */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/40">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="rounded-full hover:bg-accent/10 hover:text-accent">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-accent" />
                <h1 className="font-heading text-lg font-bold text-foreground">About Us</h1>
              </div>
            </div>
            <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">TMC Shop</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
          <div className="container max-w-4xl py-16 md:py-24 relative">
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Welcome to TMC Shop
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Your Trusted Destination for
                <span className="text-accent block mt-1">Trending Products</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                We connect you to the best deals from TikTok Shop, Shopee, and our exclusive global sourcing catalog — all in one place.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="group relative bg-card rounded-2xl border border-border/40 p-5 text-center animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md overflow-hidden"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <p className="font-heading text-3xl font-bold text-accent mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container max-w-4xl pb-16 space-y-12">
          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Target, title: "Our Mission", color: "accent", desc: "To make trending, quality products accessible to every Filipino by curating the best items from top online platforms and global suppliers — at unbeatable prices." },
              { icon: Globe, title: "Our Vision", color: "accent", desc: "To become the Philippines' leading affiliate shopping platform, bridging local consumers with global products through trusted sourcing and seamless online shopping." },
            ].map((item, i) => (
              <div
                key={item.title}
                className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="px-6 py-4 border-b border-border/40 bg-accent/[0.03]">
                  <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-accent" />
                    {item.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div>
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-bold text-foreground">Why Choose TMC Shop?</h2>
              <p className="text-sm text-muted-foreground mt-1">What sets us apart from the rest</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyChoose.map((item, i) => (
                <div
                  key={item.title}
                  className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden p-6 text-center animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Values */}
          <div>
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="font-heading text-2xl font-bold text-foreground">Our Values</h2>
              <p className="text-sm text-muted-foreground mt-1">The principles that drive everything we do</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {values.map((item, i) => (
                <div
                  key={item.title}
                  className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="p-6 text-center">
                    <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-heading font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team CTA */}
          <div className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="p-8 md:p-12 text-center">
              <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-accent mb-5 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">Our Team</h3>
              <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed text-sm mb-6">
                TMC Shop is run by a passionate team dedicated to helping Filipinos discover and shop the best products online. From sourcing to customer support, we've got you covered.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 h-12 font-heading font-bold btn-shine relative overflow-hidden shadow-lg"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageLoader>
  );
};

export default AboutUs;
