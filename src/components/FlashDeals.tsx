import { Clock, Flame } from "lucide-react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { flashDeals } from "@/data/products";

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <section id="flash-deals" className="py-10 bg-secondary/50">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="gradient-accent p-2 rounded-lg icon-bounce">
              <Flame className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Flash Deals</h2>
              <p className="text-sm text-muted-foreground">Limited time offers!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full animate-pulse-glow">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Ends in:</span>
            <div className="flex items-center gap-1 font-mono font-bold">
              <span className="bg-primary-foreground/20 px-2 py-1 rounded">{formatTime(timeLeft.hours)}</span>
              <span>:</span>
              <span className="bg-primary-foreground/20 px-2 py-1 rounded">{formatTime(timeLeft.minutes)}</span>
              <span>:</span>
              <span className="bg-primary-foreground/20 px-2 py-1 rounded">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashDeals.map((product) => (
            <ProductCard key={product.id} product={product} isFlashDeal />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
