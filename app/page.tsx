import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import ValueProposition from "@/components/home/ValueProposition";
import RecentCompanies from "@/components/home/RecentCompanies";
import Footer from "@/components/home/Footer";

/**
 * Home Page Component
 * 
 * This is the main landing page that showcases the FabricAqui platform.
 * It includes all major sections: navigation, hero, categories, value proposition,
 * recent companies, and footer.
 * 
 * The design follows a purple and orange color scheme defined in globals.css:
 * - Primary: Deep Purple (#3f0a70) - 20% usage
 * - Accent: Vibrant Orange (#fca311) - 10% usage
 * - Background: White/Light - 70% usage
 */
const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <ValueProposition />
        <RecentCompanies />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
