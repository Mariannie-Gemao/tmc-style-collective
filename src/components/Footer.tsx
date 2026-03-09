import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  { label: "About Us", path: "/about" },
  { label: "TikTok Products", scrollTo: "tiktok-products" },
  { label: "Shopee Products", scrollTo: "shopee-products" },
  { label: "Special Products", scrollTo: "special-products" },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleQuickLink = (link: typeof quickLinks[number]) => {
    if (link.path) {
      navigate(link.path);
      return;
    }
    // If on homepage, scroll directly; otherwise navigate home then scroll
    if (window.location.pathname === "/") {
      const el = document.getElementById(link.scrollTo!);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(link.scrollTo!);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <span className="font-heading font-bold text-xl mb-4 block">TMC Shop</span>
            <p className="text-primary-foreground/70 mb-4">
              Your one-stop shop for trending products from TikTok, Shopee, and global sourcing — quality items at unbeatable prices.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleQuickLink(link)}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="h-5 w-5 text-accent" />
                support@tmcshop.com
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="h-5 w-5 text-accent" />
                +63 912 345 6789
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                Manila, Philippines
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <MessageCircle className="h-5 w-5 text-accent" />
                Viber Chat
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-10 flex items-center justify-center text-sm text-primary-foreground/60">
          <p>© 2026 TMC SHOP · ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;