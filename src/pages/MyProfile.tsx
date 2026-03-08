import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Mail, Lock, Save, Eye, EyeOff, ArrowLeft } from "lucide-react";

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
      // Fetch profile name
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
      // Update profile name
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user!.id);

      if (profileError) throw profileError;

      // Update password if provided
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-xl py-8 px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your account details</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground tracking-wide uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="h-12 rounded-xl pl-10 border-2 focus:border-accent transition-colors"
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
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="border-t pt-4 space-y-4">
              <p className="text-xs font-semibold text-foreground tracking-wide uppercase">Change Password</p>

              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="h-12 rounded-xl pl-10 pr-10 border-2 focus:border-accent transition-colors"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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
                    className="h-12 rounded-xl pl-10 border-2 focus:border-accent transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full h-12 rounded-xl bg-accent hover:bg-accent-dark text-accent-foreground font-bold text-base shadow-lg btn-shine btn-glow-accent gap-2">
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
