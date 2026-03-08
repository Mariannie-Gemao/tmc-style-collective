import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle, Package, CreditCard, Truck, ShieldCheck, Globe, ChevronRight, Headphones, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  { q: "How do I place an order?", a: "Browse products, add items to your cart, and proceed to checkout. For TikTok Shop and Shopee products, you'll be redirected to the respective platform. For Special Products (global sourcing), fill out the inquiry form and our team will contact you." },
  { q: "How can I track my order?", a: "Go to My Account → My Purchase to view all your orders and their current status. You can also click 'Track Order' in the top navigation bar." },
  { q: "What payment methods are accepted?", a: "For TikTok Shop and Shopee products, common options include COD, GCash, bank transfer, and credit/debit cards. For sourcing orders, payment terms are arranged directly with our sourcing team." },
  { q: "How does global sourcing work?", a: "Navigate to Special Products, choose a category, and fill out the sourcing inquiry form. Our team will source products from verified manufacturers worldwide, handle quality inspection, and manage logistics for you." },
  { q: "How do I return or refund an item?", a: "Navigate to My Purchase, find the order, and check its status. Returns and refunds are processed through the original shopping platform (TikTok Shop or Shopee)." },
  { q: "Is my personal information secure?", a: "Yes, we take data security seriously. Your information is encrypted and never shared with third parties without your consent." },
  { q: "How do I add items to my favorites?", a: "Click the heart icon on any product card to save it to your favorites. Access your saved items from the heart icon in the navigation bar." },
];

const supportChannels = [
  {
    icon: MessageCircle,
    title: "Viber Chat",
    desc: "Chat with our support team via Viber",
    action: "Open Viber",
    gradient: "from-purple-500 to-violet-600",
    lightBg: "bg-purple-50 dark:bg-purple-500/10",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Phone,
    title: "Call Us",
    desc: "+63 912 345 6789 (Mon–Sat, 9AM–6PM)",
    action: "Call Now",
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50 dark:bg-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "support@tmcshop.com — response within 24hrs",
    action: "Send Email",
    gradient: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50 dark:bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400",
  },
];

const helpTopics = [
  { icon: Package, title: "Orders & Shipping", desc: "Track, manage, and resolve order issues" },
  { icon: CreditCard, title: "Payments & Billing", desc: "Payment methods, invoices, and transactions" },
  { icon: Truck, title: "Delivery Info", desc: "Shipping times, fees, and delivery areas" },
  { icon: Globe, title: "Global Sourcing", desc: "Bulk orders and supplier inquiries" },
  { icon: ShieldCheck, title: "Account & Security", desc: "Account settings, password, and privacy" },
  { icon: HelpCircle, title: "General Inquiries", desc: "Other questions and feedback" },
];

const Help = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageLoader>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="container relative text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent-light text-sm font-medium mb-6 animate-fade-in">
              <Headphones className="h-4 w-4" />
              We're here to help
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
              How can we help you?
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8 animate-fade-in" style={{ animationDelay: '160ms', animationFillMode: 'both' }}>
              Search our help center or browse topics below
            </p>
            <div className="relative max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
              <Input
                placeholder="Search for help..."
                className="w-full h-12 pl-5 pr-12 rounded-full bg-primary-foreground/10 backdrop-blur-md border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/15 focus:border-accent"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-foreground/50" />
            </div>
          </div>
        </section>

        <div className="container max-w-5xl py-10 space-y-14">

          {/* Support Channels */}
          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">Contact Support</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {supportChannels.map((ch, i) => (
                <div
                  key={ch.title}
                  className="relative bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group animate-fade-in"
                  style={{ animationDelay: `${i * 100 + 300}ms`, animationFillMode: 'both' }}
                >
                  {/* Gradient top strip */}
                  <div className={`h-1 w-full bg-gradient-to-r ${ch.gradient}`} />
                  <div className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-2xl ${ch.lightBg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <ch.icon className={`h-7 w-7 ${ch.textColor}`} />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{ch.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{ch.desc}</p>
                    <Button
                      className={`rounded-full px-6 bg-gradient-to-r ${ch.gradient} text-white border-0 hover:opacity-90 transition-opacity btn-shine`}
                    >
                      {ch.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Help Topics */}
          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">Browse by Topic</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {helpTopics.map((topic, i) => (
                <div
                  key={topic.title}
                  className="bg-card rounded-xl p-5 border border-border/40 hover:border-accent/30 cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${i * 60 + 400}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300 flex-shrink-0">
                      <topic.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-foreground mb-0.5 group-hover:text-accent transition-colors">{topic.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{topic.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="font-heading text-xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`bg-card rounded-xl border transition-all duration-300 animate-fade-in ${isOpen ? 'border-accent/30 shadow-md' : 'border-border/40 hover:border-border'}`}
                    style={{ animationDelay: `${i * 50 + 500}ms`, animationFillMode: 'both' }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left"
                    >
                      <div className={`p-1.5 rounded-lg transition-colors duration-200 flex-shrink-0 ${isOpen ? 'bg-accent text-accent-foreground' : 'bg-accent/10 text-accent'}`}>
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-foreground text-sm flex-1">{faq.q}</span>
                      <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-5 pb-4 pl-14 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 border border-border/30">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Still need help?</h3>
            <p className="text-sm text-muted-foreground mb-5">Our support team is available Mon–Sat, 9AM–6PM</p>
            <div className="flex items-center justify-center gap-3">
              <Button className="rounded-full bg-accent hover:bg-accent-dark text-accent-foreground px-6 btn-shine">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with us
              </Button>
              <Button variant="outline" className="rounded-full px-6 border-border hover:border-accent hover:text-accent" onClick={() => navigate("/")}>
                Back to Shop
              </Button>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </PageLoader>
  );
};

export default Help;