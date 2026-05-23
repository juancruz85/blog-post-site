import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import HoursSection from "../components/HoursSection";
import RestaurantList from "../components/RestaurantList";

export default function HomePage() {
  return (
    <div className="wrap">
      <Header />
      <Hero />
      <main>
        <AboutSection />
        <HoursSection />
        <RestaurantList endpoint="/api/restaurants" title="Restaurants" />
      </main>
    </div>
  );
}
