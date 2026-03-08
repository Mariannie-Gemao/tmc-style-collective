import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle, Package, CreditCard, Truck, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageLoader from "@/components/PageLoader";

const faqs = [
  { q: "How do I place an order?", a: "Browse products, add items to your cart, and proceed to checkout. For TikTok Shop and Shopee products, you'll be redirected to the respective platform. For Special Products (global sourcing), fill out the inquiry form and our team will contact you." },
  { q: "How can I track my order?", a: "Go to My Account → My Purchase to view all your orders and their current status. You can also click 'Track Order' in the top navigation bar." },
  { q: "What payment methods are accepted?", a: "For TikTok Shop and Shopee products, common options include COD, GCash, bank transfer, and credit/debit cards. For sourcing orders, payment terms are arranged directly with our sourcing team." },
  { q: "How does global sourcing work?", a: "Navigate to Special Products, choose a category, and fill out the sourcing inquiry form. Our team will source products from verified manufacturers worldwide, handle quality inspection, and manage logistics for you." },
  { q: "How do I return or refund an item?", a: "Navigate to My Purchase, find the order, and check its status. Returns and refunds are processed through the original shopping platform (TikTok Shop or Shopee)." },
  { q: "Is my personal information secure?", a: "Yes, we take data security seriously. Your information is encrypted and never shared with third parties without your consent." },
  { q: "How do I add items to my favorites?", a: "Click the heart icon on any product card to save it to your favorites. Access your saved items from the heart icon in the navigation bar." },
];

const supportOptions = [
  { icon: MessageCircle, title: "Viber Chat", desc: "Chat with our support team via Viber", action: "Open Viber", iconBg: "bg-purple-500/15", iconColor: "text-purple-500", hoverGlow: "hover:shadow-purple-500/20" },
  { icon: Phone, title: "Call Us", desc: "+63 912 345 6789 (Mon-Sat, 9AM-6PM)", action: "Call Now", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", hoverGlow: "hover:shadow-emerald-500/20" },
  { icon: Mail, title: "Email Support", desc: "support@tmcshop.com — response within 24hrs", action: "Send Email", iconBg: "bg-violet-500/15", iconColor: "text-violet-500", hoverGlow: "hover:shadow-violet-500/20" },
];

const helpCategories = [
  { icon: Package, title: "Orders & Shipping", desc: "Track, manage, and resolve order issues" },
  { icon: CreditCard, title: "Payments & Billing", desc: "Payment methods, invoices, and transaction help" },
  { icon: Truck, title: "Delivery Information", desc: "Shipping times, fees, and delivery areas" },
  { icon: Globe, title: "Global Sourcing", desc: "Bulk orders, sourcing inquiries, and supplier info" },
  { icon: ShieldCheck, title: "Account & Security", desc: "Account settings, password, and privacy" },
  { icon: HelpCircle, title: "General Inquiries", desc: "Other questions and feedback" },
];

const Help = () => {
  const navigate = useNavigate();

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <div className="container py-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Help Center</h1>
              <p className="text-sm text-muted-foreground">How can we help you today?</p>
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {supportOptions.map((opt, i) => (
              <div
                key={opt.title}
                className={`bg-card rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${opt.hoverGlow} animate-fade-in border border-border/40`}
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
              >
                <div className={`inline-flex p-4 rounded-2xl ${opt.iconBg} mb-4 transition-transform duration-300 hover:scale-110`}>
                  <opt.icon className={`h-7 w-7 ${opt.iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-1">{opt.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{opt.desc}</p>
                <Button variant="outline" size="sm" className="rounded-full px-6 border-border/60 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200">
                  {opt.action}
                </Button>
              </div>
            ))}
          </div>

          {/* Help Categories */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Browse by Topic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {helpCategories.map((cat) => (
              <div key={cat.title} className="bg-card rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer group border border-border/40 hover:-translate-y-0.5">
                <cat.icon className="h-5 w-5 text-accent mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-sm text-foreground mb-1">{cat.title}</h4>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-card rounded-xl overflow-hidden group border border-border/40">
                <summary className="px-5 py-4 cursor-pointer font-medium text-foreground hover:bg-secondary/50 transition-colors flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  {faq.q}
                </summary>
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t pt-3 ml-6">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default Help;