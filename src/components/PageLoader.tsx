import { useState, useEffect, ReactNode } from "react";
import tmcLogo from "@/assets/tmc-logo.png";

const PageLoader = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 animate-fade-in">
        <img src={tmcLogo} alt="TMC Shop" className="h-16 w-16 rounded-full object-cover animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-muted-foreground text-sm font-medium">Loading...</p>
      </div>
    );
  }

  return <div className="animate-fade-in">{children}</div>;
};

export default PageLoader;
