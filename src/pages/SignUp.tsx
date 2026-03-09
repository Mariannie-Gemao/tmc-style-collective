import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, UserPlus, User, ShieldCheck, BarChart3, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name }, emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please check your email to verify your account." });
      navigate("/sign-in");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden">
      {/* Background product images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "4s" }} />
        
        {/* Row 1 - Top edge */}
        <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop" alt="" className="absolute top-[3%] left-[3%] w-28 h-28 lg:w-36 lg:h-36 object-cover rounded-2xl opacity-[0.09] rotate-[-10deg] animate-float" style={{ animationDelay: "0s" }} />
        <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop" alt="" className="absolute top-[5%] left-[25%] w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-3xl opacity-[0.07] rotate-[6deg] animate-float" style={{ animationDelay: "1s" }} />
        <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop" alt="" className="absolute top-[2%] right-[25%] w-20 h-20 lg:w-28 lg:h-28 object-cover rounded-xl opacity-[0.06] rotate-[14deg] animate-float" style={{ animationDelay: "2s" }} />
        <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop" alt="" className="absolute top-[8%] right-[5%] w-26 h-26 lg:w-34 lg:h-34 object-cover rounded-2xl opacity-[0.08] rotate-[-5deg] animate-float" style={{ animationDelay: "3s" }} />

        {/* Row 2 - Upper middle */}
        <img src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop" alt="" className="absolute top-[28%] left-[2%] w-24 h-24 lg:w-30 lg:h-30 object-cover rounded-xl opacity-[0.06] rotate-[12deg] animate-float" style={{ animationDelay: "4s" }} />
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" alt="" className="absolute top-[32%] left-[22%] w-20 h-20 lg:w-28 lg:h-28 object-cover rounded-2xl opacity-[0.05] rotate-[-8deg] animate-float" style={{ animationDelay: "1.5s" }} />
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop" alt="" className="absolute top-[30%] right-[18%] w-22 h-22 lg:w-32 lg:h-32 object-cover rounded-3xl opacity-[0.07] rotate-[18deg] animate-float" style={{ animationDelay: "3.5s" }} />

        {/* Row 3 - Center */}
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" alt="" className="absolute top-[48%] left-[8%] w-22 h-22 lg:w-30 lg:h-30 object-cover rounded-xl opacity-[0.05] rotate-[22deg] animate-float" style={{ animationDelay: "2.5s" }} />
        <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop" alt="" className="absolute top-[50%] left-[35%] w-20 h-20 lg:w-28 lg:h-28 object-cover rounded-2xl opacity-[0.04] rotate-[-15deg] animate-float" style={{ animationDelay: "4.5s" }} />
        <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop" alt="" className="absolute top-[45%] right-[6%] w-24 h-24 lg:w-34 lg:h-34 object-cover rounded-3xl opacity-[0.06] rotate-[8deg] animate-float" style={{ animationDelay: "0.5s" }} />

        {/* Row 4 - Lower middle */}
        <img src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=300&h=300&fit=crop" alt="" className="absolute bottom-[22%] left-[5%] w-26 h-26 lg:w-36 lg:h-36 object-cover rounded-2xl opacity-[0.08] rotate-[-12deg] animate-float" style={{ animationDelay: "2s" }} />
        <img src="https://images.unsplash.com/photo-1587467512961-120760940571?w=300&h=300&fit=crop" alt="" className="absolute bottom-[25%] right-[22%] w-20 h-20 lg:w-28 lg:h-28 object-cover rounded-xl opacity-[0.05] rotate-[16deg] animate-float" style={{ animationDelay: "3.5s" }} />

        {/* Row 5 - Bottom edge */}
        <img src="https://images.unsplash.com/photo-1434056886845-dbe89f0b9571?w=300&h=300&fit=crop" alt="" className="absolute bottom-[4%] left-[12%] w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-3xl opacity-[0.07] rotate-[10deg] animate-float" style={{ animationDelay: "1s" }} />
        <img src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=300&fit=crop" alt="" className="absolute bottom-[6%] left-[38%] w-20 h-20 lg:w-26 lg:h-26 object-cover rounded-xl opacity-[0.05] rotate-[-20deg] animate-float" style={{ animationDelay: "5s" }} />
        <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop" alt="" className="absolute bottom-[3%] right-[8%] w-28 h-28 lg:w-36 lg:h-36 object-cover rounded-2xl opacity-[0.08] rotate-[7deg] animate-float" style={{ animationDelay: "2.5s" }} />
      </div>

      {/* Left Panel - Branding (hidden on mobile/tablet) */}
      <div className="relative lg:flex-1 p-8 lg:p-16 hidden lg:flex flex-col justify-center z-10">
        <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-1 w-8 bg-accent rounded-full" />
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">TMC Shop</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Join TMC Shop
            <span className="block text-accent">Start Shopping.</span>
          </h1>

          <p className="text-white/70 text-base lg:text-lg mb-10 max-w-md">
            Create your account and unlock exclusive deals, favorites, cart management, and global sourcing inquiries.
          </p>

          <div className="space-y-5">
            {[
              { icon: ShieldCheck, title: "Secure Shopping", desc: "Safe transactions with verified sellers and secure checkout." },
              { icon: BarChart3, title: "Best Price Guarantee", desc: "We compare prices across platforms to get you the best deal." },
              { icon: Users, title: "Global Sourcing", desc: "Source products worldwide with our specialized inquiry system." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="p-2.5 rounded-xl bg-white/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        <p className="relative z-10 text-xs text-white/40 mt-8 lg:mt-auto">© 2026 TMC SHOP · ALL RIGHTS RESERVED</p>
      </div>

      {/* Right Panel - Glassmorphism Form */}
      <div className="flex-1 lg:w-[480px] xl:w-[520px] lg:flex-none flex items-center justify-center p-6 sm:p-10 min-h-screen lg:min-h-0 z-10">
        <div className="w-full max-w-sm">
          <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10 overflow-hidden">
            {/* Light sweep effect */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: "3s" }} />
            <div className="flex flex-col items-center mb-8">
              <h2 className="font-heading text-2xl font-bold text-white">Create Account</h2>
              <p className="text-sm text-white/60 mt-1">Join us and start shopping today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 tracking-wide uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl pl-10 border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/30 focus:border-accent focus:ring-accent/30 transition-all" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 tracking-wide uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-xl pl-10 border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/30 focus:border-accent focus:ring-accent/30 transition-all" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 tracking-wide uppercase">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl pl-10 pr-10 border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/30 focus:border-accent focus:ring-accent/30 transition-all" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-accent hover:bg-accent-dark text-accent-foreground font-bold text-base shadow-lg shadow-accent/30 btn-shine transition-all duration-300 hover:shadow-accent/50 hover:scale-[1.02] gap-2">
                <UserPlus className="h-4 w-4" />
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-8 text-sm text-white/50 text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-accent font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
