import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import FlashDeals from "@/components/FlashDeals";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <CategorySection />
        <FlashDeals />
        <FeaturedProducts />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
