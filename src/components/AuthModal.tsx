import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, UserPlus } from "lucide-react";


const AuthModal = () => {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-md text-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-accent/10 p-3 rounded-full">
            <ShieldCheck className="h-8 w-8 text-accent" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">Account Required</h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Please sign in or create an account to continue shopping, add favorites, and manage your cart.
          </p>
          <div className="flex flex-col gap-3 w-full mt-2">
            <Button
              className="w-full bg-accent hover:bg-accent-dark text-accent-foreground rounded-full h-11 font-semibold"
              onClick={() => { setShowAuthModal(false); navigate("/sign-in"); }}
            >
              Sign In
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-full h-11 font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2"
              onClick={() => { setShowAuthModal(false); navigate("/sign-up"); }}
            >
              <UserPlus className="h-4 w-4" />
              Create Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
