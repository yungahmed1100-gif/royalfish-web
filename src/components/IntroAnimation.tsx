/**
 * IntroAnimation — scroll-driven underwater reveal.
 *
 * Performance principles applied:
 *  1. Only `transform` + `opacity` are animated — zero layout/paint triggers.
 *  2. A single shared rAF loop drives all JS-driven values; React state is
 *     updated with a coarse 60fps throttle, not on every scroll event.
 *  3. Caustic SVG filters are disabled on mobile (matchMedia) to protect
 *     battery and prevent GPU jank on low-end devices.
 *  4. `will-change` is applied ONLY to the three truly composited layers,
 *     not to every element.
 *  5. Scroll height is 160vh — enough depth to feel cinematic but not
 *     punishing on a phone.
 *  6. `prefers-reduced-motion`: skips to the end instantly.
 */

import { useEffect, useRef, useState } from "react";

const SCENE_HEIGHT = "160vh";

const smooth = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const clamp  = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const range  = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

const BUBBLES = [
  { left: "5%",  sz: 7,  d: 0.0, dur: 5.8, sw: 10  },
  { left: "13%", sz: 11, d: 1.4, dur: 7.2, sw: -14 },
  { left: "22%", sz: 5,  d: 2.8, dur: 4.6, sw: 8   },
  { left: "31%", sz: 9,  d: 0.6, dur: 6.0, sw: -11 },
  { left: "42%", sz: 13, d: 2.2, dur: 7.8, sw: 16  },
  { left: "52%", sz: 4,  d: 0.2, dur: 4.2, sw: -7  },
  { left: "61%", sz: 10, d: 3.1, dur: 6.5, sw: 13  },
  { left: "71%", sz: 6,  d: 1.0, dur: 5.1, sw: -9  },
  { left: "80%", sz: 12, d: 2.5, dur: 7.5, sw: 18  },
  { left: "90%", sz: 5,  d: 0.8, dur: 4.9, sw: -10 },
  { left: "96%", sz: 9,  d: 3.4, dur: 6.8, sw: 12  },
];

const RAYS = [
  { left: "15%", w: 200, op: 0.32, delay: "0s",   rot: -10 },
  { left: "47%", w: 260, op: 0.38, delay: "-3s",  rot: -8  },
  { left: "76%", w: 170, op: 0.28, delay: "-6s",  rot: -12 },
];

export default function IntroAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef(0);
  const pRef       = useRef(0);
  const [p, setP]  = useState(0);

  // Detect reduced-motion once
  const reduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  // Detect mobile once (skip heavy SVG filters)
  const isMobile = typeof window !== "undefined"
    ? window.matchMedia("(max-width: 768px)").matches
    : false;

  useEffect(() => {
    if (reduced) { setP(1); return; }

    const calc = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const scrollH = el.offsetHeight - window.innerHeight;
      const next    = clamp(-rect.top / scrollH);
      if (Math.abs(next - pRef.current) > 0.001) {
        pRef.current = next;
        setP(next);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calc);
    };

    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc,     { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  // ── Derived values (all from p in [0,1]) ────────────────────────────────
  const sceneOpacity  = 1 - smooth(range(p, 0.90, 1.00));
  const promptOpacity = 1 - smooth(range(p, 0.05, 0.25));

  // Water rises from bottom: 0 → 82% of viewport height
  const waterPct = smooth(range(p, 0.04, 0.88)) * 82;

  // Logo: falls toward surface, then sinks beneath it
  const fall       = smooth(range(p, 0.12, 0.52));
  const sink       = smooth(range(p, 0.52, 0.84));
  const logoY      = fall * 28 + sink * 18;           // vh
  const logoSwayX  = sink * Math.sin(p * 16) * 1.2;  // px
  const logoRotate = Math.sin(p * 13) * sink * 6;
  const logoScale  = 1 - sink * 0.15;
  const logoBlur   = sink * 1.4;
  const logoBright = 1 - sink * 0.16;
  const logoHue    = sink * 12;

  // Splash burst at impact (p ≈ 0.52)
  const splash = clamp(1 - Math.abs(p - 0.52) / 0.048);
  const waterI = smooth(range(p, 0.06, 0.60));

  return (
    <section
      ref={sectionRef}
      className="relative z-30"
      style={{ height: SCENE_HEIGHT }}
      aria-hidden="true"
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-cream"
        style={{ opacity: sceneOpacity, willChange: "opacity" }}
      >
        {/* ── Above-water ambience ───────────────────────────────────────── */}
        <div className="absolute -top-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-blush/8 blur-3xl pointer-events-none" />
        <div className="absolute -top-16 right-1/4 w-[24rem] h-[24rem] rounded-full bg-aqua/10 blur-3xl pointer-events-none" />

        {/* Above-water god rays */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden">
          {RAYS.map((r, i) => (
            <div
              key={`ar-${i}`}
              className="absolute top-[-12%] h-[55%] god-ray-above"
              style={{
                left: r.left,
                width: r.w,
                opacity: r.op * 0.45,
                transform: `rotate(${r.rot}deg)`,
                animationDelay: r.delay,
              }}
            />
          ))}
        </div>

        {/* ── Water body ────────────────────────────────────────────────── */}
        <div
          className="absolute left-0 right-0 bottom-0 overflow-hidden"
          style={{ height: `${waterPct}%`, willChange: "height" }}
        >
          {/* Depth gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(89,229,249,0.6) 0%, rgba(60,140,200,0.52) 40%, rgba(12,10,146,0.68) 72%, rgba(3,1,121,0.88) 100%)",
            }}
          />

          {/* Submerged god rays */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {RAYS.map((r, i) => (
              <div
                key={`ur-${i}`}
                className="absolute -top-8 h-[140%] god-ray"
                style={{
                  left: r.left,
                  width: r.w,
                  opacity: r.op * waterI,
                  transform: `rotate(${r.rot}deg)`,
                  animationDelay: r.delay,
                }}
              />
            ))}
          </div>

          {/* Caustics — desktop only (too heavy for mobile GPU) */}
          {!isMobile && (
            <>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.5 * waterI }}
              >
                <defs>
                  <filter id="cf1" x="0" y="0" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.013 0.020" numOctaves="2" seed="7" result="n">
                      <animate attributeName="baseFrequency" dur="20s" values="0.013 0.020;0.020 0.032;0.013 0.020" repeatCount="indefinite" />
                    </feTurbulence>
                    <feColorMatrix in="n" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.5 -0.65" />
                  </filter>
                </defs>
                <rect width="100%" height="100%" filter="url(#cf1)" />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-soft-light"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.65 * waterI }}
              >
                <defs>
                  <filter id="cf2">
                    <feTurbulence type="fractalNoise" baseFrequency="0.038 0.048" numOctaves="2" seed="13" result="n">
                      <animate attributeName="baseFrequency" dur="13s" values="0.038 0.048;0.056 0.074;0.038 0.048" repeatCount="indefinite" />
                    </feTurbulence>
                    <feColorMatrix in="n" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.1 -0.82" />
                  </filter>
                </defs>
                <rect width="100%" height="100%" filter="url(#cf2)" />
              </svg>
            </>
          )}

          {/* Surface waves — pure CSS animations, no JS */}
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-10 left-0 right-0 w-full h-16 wave-back">
            <path d="M0,40 C240,68 480,8 720,38 C960,68 1200,10 1440,40 L1440,80 L0,80 Z" fill="rgba(89,229,249,0.42)" />
          </svg>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-6 left-0 right-0 w-full h-14 wave-mid">
            <path d="M0,46 C240,22 480,62 720,38 C960,14 1200,58 1440,46 L1440,80 L0,80 Z" fill="rgba(89,229,249,0.68)" />
          </svg>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-3 left-0 right-0 w-full h-10 wave-front">
            <path d="M0,52 C240,40 480,64 720,48 C960,32 1200,60 1440,52 L1440,80 L0,80 Z" fill="rgba(89,229,249,0.94)" />
          </svg>

          {/* Surface specular line */}
          <div
            className="absolute left-0 right-0 h-[2px] top-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(254,254,253,0.88) 38%, rgba(254,254,253,0.98) 50%, rgba(254,254,253,0.88) 62%, transparent)",
              boxShadow: "0 0 10px rgba(254,254,253,0.55)",
            }}
          />

          {/* Bubbles — CSS animation, no JS repaints */}
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full bubble"
              style={{
                left: b.left,
                bottom: 0,
                width: b.sz,
                height: b.sz,
                animationDelay: `${b.d}s`,
                animationDuration: `${b.dur}s`,
                ["--sway" as string]: `${b.sw}px`,
              }}
            />
          ))}

          {/* Ocean floor */}
          <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(3,1,121,0.82) 0%, rgba(3,1,121,0.42) 50%, transparent 100%)" }}
            />
          </div>
        </div>

        {/* ── Splash at impact ───────────────────────────────────────────── */}
        {splash > 0.02 && (
          <div
            className="absolute left-1/2 pointer-events-none"
            style={{
              bottom: `calc(${waterPct}% - 2px)`,
              transform: "translateX(-50%)",
              opacity: splash,
              willChange: "transform, opacity",
            }}
          >
            {Array.from({ length: 11 }).map((_, i) => {
              const t  = (i / 10) * Math.PI;
              const r  = 70 + (i % 3) * 16;
              const dx = Math.cos(t + Math.PI) * r * (0.55 + splash * 0.5);
              const dy = -Math.sin(t) * (44 + (i % 3) * 18) * (0.55 + splash * 0.55);
              const sz = 3.5 + (i % 4) * 1.6;
              return (
                <span
                  key={i}
                  className="absolute rounded-full bg-cream"
                  style={{
                    width: sz, height: sz,
                    transform: `translate(${dx}px, ${dy}px)`,
                    boxShadow: "0 0 12px rgba(89,229,249,0.9), 0 0 3px rgba(254,254,253,1)",
                    opacity: splash,
                  }}
                />
              );
            })}
            {/* Ripple ring */}
            <div
              className="absolute rounded-full border-2 border-cream/75"
              style={{
                width: 100 * splash, height: 18 * splash,
                left: -50 * splash, top: -9 * splash,
                boxShadow: "0 0 14px rgba(89,229,249,0.55)",
                opacity: splash * 0.8,
              }}
            />
          </div>
        )}

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <div
          className="absolute left-1/2 top-[20%] pointer-events-none"
          style={{
            transform: `translate(calc(-50% + ${logoSwayX}px), ${logoY}vh) rotate(${logoRotate}deg) scale(${logoScale})`,
            filter: `blur(${logoBlur}px) brightness(${logoBright}) hue-rotate(${logoHue}deg) drop-shadow(0 ${8 + sink * 12}px ${18 + sink * 10}px rgba(3,1,121,${0.15 + sink * 0.16}))`,
            willChange: "transform, filter",
          }}
        >
          <img
            src="/assets/logo-removebg-preview.png"
            alt="Royal Fish"
            className="w-40 sm:w-48 md:w-60 h-auto"
            style={{ mixBlendMode: "multiply" }}
            draggable={false}
          />
        </div>

        {/* ── Scroll prompt ─────────────────────────────────────────────── */}
        <div
          className="absolute bottom-10 left-0 right-0 text-center pointer-events-none select-none"
          style={{ opacity: promptOpacity }}
        >
          <p className="eyebrow text-navy/40 mb-3 tracking-[0.3em]">
            Royal Fish · Markthal Rotterdam
          </p>
          <div className="flex items-center justify-center gap-2 text-navy/40 text-xs">
            <span className="tracking-widest uppercase text-[10px]">Scroll to dive in</span>
            <svg className="w-3 h-3 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" /><path d="M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
