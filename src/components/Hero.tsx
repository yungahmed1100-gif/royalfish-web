import { useEffect, useState } from "react";
import { ChevronDown, MapPin, Navigation, Star } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";


export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="home"
      aria-label="Royal Fish — Fresh Dutch Seafood in Rotterdam"
      className="relative min-h-[100svh] flex items-center overflow-hidden grain bg-cream"
    >
      {/* Background photo — sits behind everything, no parallax transform to avoid top gap */}
      <div className="absolute inset-0">
        <img
          src="/assets/herobg.jpg"
          alt=""
          role="presentation"
          fetchPriority="high"
          className="w-full h-full object-cover object-[center_85%]"
        />
        {/* Overlay washes */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-cream/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
      </div>

      {/* Parallax colour blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
      >
        <div className="absolute -top-24 -right-24 w-[34rem] h-[34rem] rounded-full bg-aqua/25 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] rounded-full bg-blush/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[22rem] h-[22rem] rounded-full bg-ruby/8 blur-3xl" />
      </div>

      {/* Vertical editorial line */}
      <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ruby/25 to-transparent pointer-events-none" />
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] uppercase tracking-[0.4em] text-navy/35 whitespace-nowrap pointer-events-none">
        Est · Rotterdam Markthal
      </div>

      {/* Right-edge sticker */}
      <div className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3 animate-float-soft">
        <div className="ticket w-28 h-28 rounded-full flex items-center justify-center -rotate-6">
          <div className="text-center">
            <div className="text-[9px] uppercase tracking-[0.2em] text-ruby/80">{t.hero.today}</div>
            <div className="font-display text-ruby text-xl leading-none mt-1">{t.hero.fresh}</div>
            <div className="font-display italic text-navy text-sm">{t.hero.catch}</div>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-navy/60">
          <span className="relative w-1.5 h-1.5 rounded-full bg-aqua pulse-dot" />
          {t.hero.openNow}
        </span>
      </div>

      {/* Content — vertically centred, padded to clear the navbar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-3xl">
          <div className="reveal flex items-center gap-3 mb-6">
            <span className="eyebrow text-ruby">{t.hero.eyebrow}</span>
          </div>

          <h1 className="reveal reveal-delay-1 font-display font-medium text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.025em] mb-6 text-navy">
            <span className="block">{t.hero.h1a} <span className="font-display italic text-ruby">{t.hero.h1b}</span></span>
            <span className="block">{t.hero.h1c} <span className="text-splash">{t.hero.h1d}</span></span>
            <span className="block">{t.hero.h1e}</span>
            <span className="block font-display italic text-aqua-splash">{t.hero.h1f}</span>
          </h1>

          <p className="reveal reveal-delay-2 text-base sm:text-lg text-navy/70 leading-relaxed mb-10 max-w-xl">
            {t.hero.desc}
          </p>

          {/* Trust line */}
          <div className="reveal reveal-delay-2 flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-ruby text-ruby" />
                ))}
                <Star className="w-4 h-4 fill-ruby/25 text-ruby" />
              </div>
              <span className="text-navy font-semibold">4.1</span>
              <span className="text-navy/55">· {t.hero.rating}</span>
            </div>
            <span className="hidden sm:block text-navy/20">·</span>
            <span className="text-navy/65">{t.hero.price}</span>
            <span className="hidden sm:block text-navy/20">·</span>
            <span className="text-navy/65">{t.hero.services}</span>
          </div>

          {/* CTAs */}
          <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-4">
            <a href="#menu" className="group inline-flex items-center gap-2 px-7 py-4 btn-primary">
              {t.hero.menuCta}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Markthal+Rotterdam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 text-navy font-medium rounded-full border border-navy/15 hover:bg-navy/5 hover:border-navy/30 transition-all"
            >
              <Navigation className="w-4 h-4" />
              {t.hero.dirCta}
            </a>
            <a href="#about" className="inline-flex items-center gap-2 text-sm text-navy/60 hover:text-ruby transition-colors">
              <MapPin className="w-3.5 h-3.5" />
              {t.hero.floorCta}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-navy/35 hover:text-ruby transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
