import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import StickyCTA from "./components/StickyCTA";
import TrustStrip from "./components/TrustStrip";
import Rotterdam from "./components/Rotterdam";
import IntroAnimation from "./components/IntroAnimation";
import { useReveal } from "./hooks/useReveal";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  useReveal();

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIntroDone(window.scrollY > window.innerHeight * 1.85);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-cream text-navy font-sans relative">
        <Navbar
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          show={introDone}
        />
        <IntroAnimation />
        <main className="relative z-20">
          <Hero />
          <TrustStrip />
          <About />
          <Rotterdam />
          <Menu />
          <Gallery />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <StickyCTA show={introDone} />
      </div>
    </LanguageProvider>
  );
}
