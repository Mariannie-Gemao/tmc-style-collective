import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { flashDeals, featuredProducts } from "@/data/products";

const products = [
  { id: 1, name: "Wireless Bluetooth Earbuds", price: "₱899", description: "Premium sound quality with noise cancellation", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1920&h=1080&fit=crop", shopUrl: "" },
  { id: 2, name: "Smart Fitness Watch", price: "₱1,299", description: "Track your health and stay connected", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&h=1080&fit=crop", shopUrl: "" },
  { id: 3, name: "Portable LED Ring Light", price: "₱499", description: "Perfect lighting for content creators", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1920&h=1080&fit=crop", shopUrl: "" },
  { id: 4, name: "Mini Bluetooth Speaker", price: "₱649", description: "Powerful bass in a compact design", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1920&h=1080&fit=crop", shopUrl: "" },
  { id: 5, name: "USB-C Fast Charger", price: "₱349", description: "65W rapid charging for all devices", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1920&h=1080&fit=crop", shopUrl: "" },
];

const HeroBanner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    const autoplay = setInterval(() => { emblaApi.scrollNext(); }, 5000);
    return () => { clearInterval(autoplay); emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const currentProduct = products[selectedIndex];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewProduct = () => {
    // Find a matching product from the data and open its shop URL
    const allItems = [...flashDeals, ...featuredProducts];
    const match = allItems.find((p) => p.name.toLowerCase().includes(currentProduct.name.toLowerCase().split(" ")[0]));
    const url = match?.shopUrl || currentProduct.shopUrl || "https://www.tiktok.com/shop";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[70vh] overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_100%] min-w-0 h-full relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30" />
      
      {/* Content */}
      <div className="container relative h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
          <div className="space-y-6 text-center lg:text-left text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent-light text-sm font-medium animate-bounce-subtle">
              <Sparkles className="h-4 w-4" />
              Trending Products Online
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover
              <span className="block text-accent-light">Best Deals</span>
              From Top Shops
            </h1>
            
            <p className="text-base md:text-lg text-primary-foreground/80 max-w-md mx-auto lg:mx-0">
              Shop the most viral products from TikTok Shop, Lazada, Shopee & more. 
              Quality items at unbeatable prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-dark text-accent-foreground font-semibold px-6 md:px-8 rounded-full group"
                onClick={() => scrollToSection("featured-products")}
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 rounded-full"
                onClick={() => scrollToSection("flash-deals")}
              >
                View Deals
              </Button>
            </div>
          </div>
          
          {/* Product Info Card */}
          <div className="hidden lg:flex justify-end">
            <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/20 max-w-sm transition-all duration-500">
              <p className="text-primary-foreground/60 text-sm mb-1">Featured Product</p>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">{currentProduct.name}</h3>
              <p className="text-primary-foreground/70 mb-4">{currentProduct.description}</p>
              <p className="text-3xl font-bold text-accent-light mb-4">{currentProduct.price}</p>
              <Button
                className="w-full bg-accent hover:bg-accent-dark text-accent-foreground rounded-full"
                onClick={handleViewProduct}
              >
                View Product
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button onClick={scrollPrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm hover:bg-accent text-primary-foreground hover:text-accent-foreground transition-colors">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={scrollNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm hover:bg-accent text-primary-foreground hover:text-accent-foreground transition-colors">
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-8 bg-accent" : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
