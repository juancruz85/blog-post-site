import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";

export default function HomePage() {
  return (
    <div className="wrap">
      <Header />
      <Hero />
      <main>
        <AboutSection />
        <ProjectsSection />
      </main>
    </div>
  );
}
