import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Save, Eye, EyeOff, ArrowLeft, Shield, UserCircle, KeyRound, Sparkles } from "lucide-react";
import PageLoader from "@/components/PageLoader";

const MyProfile = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    if (user) {
      setEmail(user.email || "");
      supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data?.full_name) setFullName(data.full_name);
          else setFullName(user.user_metadata?.full_name || "");
        });
    }
  }, [user, isAuthenticated, authLoading, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user!.id);

      if (profileError) throw profileError;

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          toast({ title: "Passwords don't match", variant: "destructive" });
          setSaving(false);
          return;
        }
        if (newPassword.length < 6) {
          toast({ title: "Password must be at least 6 characters", variant: "destructive" });
          setSaving(false);
          return;
        }
        const { error: pwError } = await supabase.auth.updateUser({ password: newPassword });
        if (pwError) throw pwError;
      }

      toast({ title: "Profile updated successfully!" });
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  if (authLoading) return null;

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        {/* Floating Header */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/40">
          <div className="container flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full hover:bg-accent/10 hover:text-accent">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5">
                <UserCircle className="h-5 w-5 text-accent" />
                <h1 className="font-heading text-lg font-bold text-foreground">My Profile</h1>
              </div>
            </div>
            <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">Account</span>
          </div>
        </div>

        <div className="container max-w-xl py-6 lg:py-8 px-4">
          {/* Profile Info Card */}
          <div
            className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md"
            style={{ animationDelay: '0ms' }}
          >
            {/* Hover accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="px-6 py-4 border-b border-border/40 bg-accent/[0.03]">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Personal Information
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your account details</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground tracking-wide uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="h-12 rounded-xl pl-10 border-2 border-border/60 focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground tracking-wide uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={email}
                    disabled
                    className="h-12 rounded-xl pl-10 border-2 bg-muted text-muted-foreground cursor-not-allowed"
                  />
                </div>
                <p className="text-[11px] text-accent/80 bg-accent/5 rounded-lg px-3 py-1.5">
                  Email address cannot be changed
                </p>
              </div>
            </div>
          </div>

          {/* Password Card */}
          <div
            className="group relative bg-card rounded-2xl border border-border/40 overflow-hidden animate-fade-in transition-all duration-500 hover:border-accent/30 hover:shadow-md mt-4"
            style={{ animationDelay: '100ms' }}
          >
            {/* Hover accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="px-6 py-4 border-b border-border/40 bg-accent/[0.03]">
              <h2 className="font-heading font-bold text-foreground flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-accent" />
                Change Password
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Update your account password</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="h-12 rounded-xl pl-10 pr-10 border-2 border-border/60 focus:border-accent transition-colors"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="h-12 rounded-xl pl-10 border-2 border-border/60 focus:border-accent transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="animate-fade-in mt-6" style={{ animationDelay: '200ms' }}>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-heading font-bold h-12 text-[15px] btn-shine relative overflow-hidden btn-glow-accent shadow-lg disabled:opacity-40 disabled:cursor-not-allowed gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>

            <button onClick={() => navigate("/")} className="w-full text-center text-sm text-muted-foreground hover:text-accent transition-colors py-3 mt-1">
              ← Back to Home
            </button>
          </div>

          {/* Trust Row */}
          <div className="flex items-center justify-center gap-6 py-3 text-muted-foreground/60 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {[
              { icon: Shield, label: "Secure" },
              { icon: Lock, label: "Encrypted" },
              { icon: UserCircle, label: "Private" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[11px]">
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default MyProfile;
