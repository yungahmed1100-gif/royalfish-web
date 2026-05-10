import { MapPin, ArrowUp, Navigation, Phone } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative bg-navy text-cream overflow-hidden pb-24 md:pb-0">
      {/* Big watermark wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-0 right-0 text-center font-display italic text-[clamp(5rem,18vw,16rem)] text-cream/[0.04] leading-none whitespace-nowrap select-none"
      >
        Royal Fish
      </div>

      {/* color blob accents */}
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-blush/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-aqua/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* CTA banner */}
        <div className="rounded-3xl bg-cream/[0.06] border border-cream/15 backdrop-blur-sm p-8 md:p-12 mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-blush/30 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-aqua/20 blur-3xl" />
          <div className="relative">
            <div className="eyebrow text-aqua mb-2">{t.footer.hungerEyebrow}</div>
            <h3 className="font-display text-2xl md:text-3xl text-cream max-w-md leading-snug">
              {t.footer.hungerHeading} <span className="font-display italic text-blush">{t.footer.hungerHighlight}</span>
            </h3>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Markthal+Rotterdam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-navy font-bold rounded-full hover:bg-aqua hover:-translate-y-0.5 transition-all shadow-[0_15px_40px_-12px_rgba(254,254,253,0.5)]"
            >
              <Navigation className="w-4 h-4" />
              {t.footer.directions}
            </a>
            <a
              href="tel:+31000000000"
              className="inline-flex items-center gap-2 px-6 py-3 border border-cream/30 text-cream rounded-full hover:bg-cream/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              {t.footer.call}
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-5 group">
              <img
                src="/assets/logo-removebg-preview.png"
                alt="Royal Fish"
                className="h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
              <div>
                <div className="font-display text-lg">
                  <span className="text-blush">Royal</span>{" "}
                  <span className="text-cream">Fish</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-cream/40 -mt-0.5">
                  Markthal · Rotterdam
                </div>
              </div>
            </a>
            <p className="text-cream/55 text-sm leading-relaxed">
              Fresh Dutch seafood from the Markthal — herring, kibbeling, oysters, and the
              day's best catch. Served the way it should be.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Site navigation">
            <h3 className="eyebrow text-cream/80 mb-4">{t.footer.explore}</h3>
            <ul className="space-y-2.5">
              {["About", "Menu", "Gallery", "Reviews", "Visit"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase() === "visit" ? "contact" : link.toLowerCase()}`}
                    className="text-cream/55 hover:text-aqua text-sm transition-colors link-underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="eyebrow text-cream/80 mb-4">{t.footer.findUs}</h3>
            <div className="space-y-3 text-sm text-cream/55">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-blush" />
                <p>
                  Dominee Jan Scharpstraat 298<br />
                  3011 GX Rotterdam<br />
                  <span className="text-aqua">Floor G · Market Hall</span>
                </p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="eyebrow text-cream/80 mb-4">{t.footer.hours}</h3>
            <ul className="space-y-2 text-sm text-cream/55">
              <li className="flex justify-between gap-2"><span>Mon–Thu</span><span className="text-cream/90">10–20</span></li>
              <li className="flex justify-between gap-2"><span>Fri–Sat</span><span className="text-cream/90">10–21</span></li>
              <li className="flex justify-between gap-2"><span>Sunday</span><span className="text-cream/90">12–18</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/35 text-xs">
            © {new Date().getFullYear()} Royal Fish · {t.footer.copyright}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-cream/45 hover:text-aqua text-xs transition-colors group"
          >
            {t.footer.backToTop}
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
