import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  show?: boolean;
}

const navLinks = [
  { id: "about",   href: "#about" },
  { id: "menu",    href: "#menu" },
  { id: "gallery", href: "#gallery" },
  { id: "reviews", href: "#reviews" },
  { id: "contact", href: "#contact" },
];

export default function Navbar({ mobileMenuOpen, setMobileMenuOpen, show = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const { lang, setLang, t } = useLang();
  const navLabels = [t.nav.about, t.nav.menu, t.nav.gallery, t.nav.reviews, t.nav.visit];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "menu", "gallery", "reviews", "contact"];
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      } ${
        scrolled
          ? "bg-cream/85 backdrop-blur-xl border-b border-navy/10 shadow-[0_4px_30px_rgba(3,1,121,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/assets/logo-removebg-preview.png"
              alt="Royal Fish"
              className="h-14 md:h-16 w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold tracking-tight">
                <span className="text-ruby">Royal</span>{" "}
                <span className="text-navy">Fish</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-navy/45 -mt-0.5">
                Markthal · Rotterdam
              </div>
            </div>
          </a>

        {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-ruby" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {navLabels[i]}
                  <span
                    className={`absolute left-4 right-4 -bottom-px h-px bg-gradient-to-r from-transparent via-ruby to-transparent transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              );
            })}
            <a
              href="tel:+31000000000"
              className="ml-3 flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy/70 hover:text-ruby transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {t.nav.call}
            </a>

            {/* Language toggle */}
            <div className="ml-2 flex items-center rounded-full border border-navy/15 overflow-hidden text-[11px] font-semibold">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition-colors ${
                  lang === "en" ? "bg-navy text-cream" : "text-navy/55 hover:text-navy"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang("nl")}
                className={`px-3 py-1.5 transition-colors ${
                  lang === "nl" ? "bg-navy text-cream" : "text-navy/55 hover:text-navy"
                }`}
                aria-label="Schakel naar Nederlands"
              >
                NL
              </button>
            </div>

            <a
              href="#contact"
              className="ml-2 px-5 py-2.5 bg-ruby hover:bg-ruby-700 text-cream font-semibold text-sm rounded-full transition-all hover:-translate-y-0.5 shadow-[0_10px_25px_-8px_rgba(164,17,32,0.55)]"
            >
              {t.nav.directions}
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-navy/80 hover:text-navy"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-xl border-t border-navy/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-navy/80 hover:text-ruby hover:bg-navy/[0.03] rounded-lg transition-colors"
              >
                {navLabels[i]}
              </a>
            ))}
            {/* Mobile language toggle */}
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="text-xs text-navy/50 uppercase tracking-widest mr-1">Language</span>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  lang === "en" ? "bg-navy text-cream border-navy" : "border-navy/20 text-navy/55"
                }`}
              >EN</button>
              <button
                onClick={() => setLang("nl")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  lang === "nl" ? "bg-navy text-cream border-navy" : "border-navy/20 text-navy/55"
                }`}
              >NL</button>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-3 mx-4 px-5 py-3 bg-ruby text-cream font-semibold text-center rounded-full"
            >
              {t.nav.directions}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
