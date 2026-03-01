import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import TiktokSection from "@/components/TiktokSection";
import ShopeeSection from "@/components/ShopeeSection";
import SpecialSection from "@/components/SpecialSection";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <CategorySection />
        <TiktokSection />
        <ShopeeSection />
        <SpecialSection />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
