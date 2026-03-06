import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, BarChart3, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import tmcLogo from "@/assets/tmc-logo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="relative lg:flex-1 bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 p-8 lg:p-16 flex flex-col justify-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />

        <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-8 bg-accent rounded-full" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">TMC Shop</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Your One-Stop
            <span className="block text-accent">Shopping Hub.</span>
          </h1>

          <p className="text-muted-foreground text-base lg:text-lg mb-10 max-w-md">
            Access the best deals from TikTok Shop, Shopee, and our exclusive sourcing products — all in one place.
          </p>

          <div className="space-y-5">
            {[
              { icon: ShieldCheck, title: "Secure Shopping", desc: "Safe transactions with verified sellers and secure checkout." },
              { icon: BarChart3, title: "Best Price Guarantee", desc: "We compare prices across platforms to get you the best deal." },
              { icon: Users, title: "Global Sourcing", desc: "Source products worldwide with our specialized inquiry system." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="p-2.5 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating badges */}
          <div className="hidden lg:flex items-center gap-4 mt-12">
            <div className="bg-card rounded-xl px-4 py-2.5 shadow-md border flex items-center gap-2 animate-float">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <div>
                <p className="text-xs font-semibold text-foreground">Shop Active</p>
                <p className="text-[10px] text-muted-foreground">All services online</p>
              </div>
            </div>
            <div className="bg-card rounded-xl px-4 py-2.5 shadow-md border flex items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <div>
                <p className="text-xs font-semibold text-foreground">Secure Connection</p>
                <p className="text-[10px] text-muted-foreground">Encrypted & safe</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-muted-foreground mt-8 lg:mt-auto">© 2026 TMC SHOP · ALL RIGHTS RESERVED</p>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:w-[480px] xl:w-[520px] flex items-center justify-center p-6 sm:p-10 bg-card border-l">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center lg:items-start mb-8">
            <div className="flex items-center gap-3 mb-4">
              <img src={tmcLogo} alt="TMC Shop" className="h-12 w-12 rounded-full object-cover" />
              <span className="text-accent font-bold text-xs tracking-widest uppercase">TMC SHOP</span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground">Sign In</h2>
            <p className="text-sm text-muted-foreground mt-1">Welcome back! Sign in to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground tracking-wide uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl pl-10 border-2 focus:border-accent transition-colors" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground tracking-wide uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl pl-10 pr-10 border-2 focus:border-accent transition-colors" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-accent hover:bg-accent-dark text-accent-foreground font-bold text-base shadow-lg btn-shine btn-glow-accent">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-8 text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-accent font-semibold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
