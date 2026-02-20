import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag, Heart, Truck, Eye, EyeOff } from "lucide-react";
import tmcLogo from "@/assets/tmc-logo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      {/* Form Card */}
      <div className="w-full max-w-sm mx-auto px-4 -mt-8 z-10">
        <div className="bg-card rounded-2xl p-8 shadow-xl border border-border">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={tmcLogo} alt="TMC Shop" className="h-16 w-16 rounded-full object-cover mb-3" />
            <h2 className="font-heading text-2xl font-bold text-foreground">Create Account</h2>
            <p className="text-sm text-muted-foreground mt-1">Join TMC Shop today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-lg"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-full bg-accent hover:bg-accent-dark text-accent-foreground font-semibold shadow-lg"
            >
              Sign Up
            </Button>
          </form>

          <div className="mt-5">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or continue with</span></div>
            </div>
            <div className="flex justify-center gap-3">
              <a href="#" className="h-10 w-10 rounded-full bg-foreground flex items-center justify-center text-card text-xs font-bold hover:opacity-80 transition-opacity">TT</a>
              <a href="#" className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold hover:opacity-80 transition-opacity">S</a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold hover:opacity-80 transition-opacity">L</a>
            </div>
            <p className="mt-5 text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-accent font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 3 Boxes Below */}
      <div className="flex gap-3 justify-center mt-6 z-10 px-4">
        <div className="flex flex-col items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 min-w-[90px]">
          <Tag className="h-5 w-5 text-primary-foreground" />
          <span className="text-primary-foreground text-[10px] font-medium text-center">Exclusive Discounts</span>
        </div>
        <div className="flex flex-col items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 min-w-[90px]">
          <Heart className="h-5 w-5 text-primary-foreground" />
          <span className="text-primary-foreground text-[10px] font-medium text-center">Personalized Picks</span>
        </div>
        <div className="flex flex-col items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-3 min-w-[90px]">
          <Truck className="h-5 w-5 text-primary-foreground" />
          <span className="text-primary-foreground text-[10px] font-medium text-center">Secure Checkout</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
