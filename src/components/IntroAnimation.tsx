import { useEffect, useRef, useState } from "react";

const SCENE_HEIGHT = "240vh";

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

// Bubble field — varied sizes, columns spanning full width, organic timing
const bubbles = [
  { left: "4%",  size: 8,  delay: 0.0, dur: 6.0, sway: 12 },
  { left: "11%", size: 12, delay: 1.6, dur: 7.5, sway: -16 },
  { left: "18%", size: 5,  delay: 3.0, dur: 4.5, sway: 8 },
  { left: "24%", size: 9,  delay: 0.5, dur: 5.6, sway: -10 },
  { left: "31%", size: 14, delay: 2.4, dur: 8.0, sway: 18 },
  { left: "37%", size: 6,  delay: 1.0, dur: 4.8, sway: -12 },
  { left: "44%", size: 10, delay: 3.5, dur: 6.2, sway: 14 },
  { left: "50%", size: 4,  delay: 0.2, dur: 4.0, sway: -8 },
  { left: "57%", size: 11, delay: 2.0, dur: 7.0, sway: 16 },
  { left: "63%", size: 7,  delay: 0.9, dur: 5.0, sway: -10 },
  { left: "70%", size: 13, delay: 2.8, dur: 7.8, sway: 20 },
  { left: "77%", size: 5,  delay: 1.5, dur: 4.6, sway: -9 },
  { left: "84%", size: 9,  delay: 3.2, dur: 6.4, sway: 13 },
  { left: "91%", size: 6,  delay: 0.7, dur: 5.2, sway: -11 },
  { left: "97%", size: 11, delay: 2.5, dur: 7.2, sway: 15 },
];

// God rays — three diagonal light shafts
const rays = [
  { left: "18%",  width: 220, opacity: 0.35, delay: "0s",  rotate: -10 },
  { left: "48%",  width: 280, opacity: 0.4,  delay: "-3s", rotate: -8 },
  { left: "78%",  width: 180, opacity: 0.3,  delay: "-6s", rotate: -12 },
];

export default function IntroAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const max = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setP(clamp01(scrolled / max));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calc);
      cancelAnimationFrame(raf);
    };
  }, []);

  const sceneOpacity = 1 - ease(range(p, 0.88, 1));
  const promptOpacity = 1 - ease(range(p, 0.04, 0.22));

  // Logo motion — calibrated so it meets the surface at p≈0.55
  const fall = ease(range(p, 0.18, 0.55));
  const sink = ease(range(p, 0.55, 0.85));
  const logoTranslate = fall * 30 + sink * 16;
  const logoSwayX = sink * Math.sin(p * 18) * 1.4;
  const logoRotate = Math.sin(p * 14) * sink * 7 + (1 - fall) * 0;
  const logoScale = 1 - sink * 0.18;
  const logoBlur = sink * 1.6;
  const logoHue = sink * 14; // tint underwater
  const logoBrightness = 1 - sink * 0.18;

  // Water rises from 0 to ~78vh
  const waterFill = ease(range(p, 0.06, 0.86)) * 78;

  // Splash window
  const splash = clamp01(1 - Math.abs(p - 0.55) / 0.05);

  // Caustic / surface intensity ramps with water
  const waterIntensity = ease(range(p, 0.08, 0.6));

  return (
    <section
      ref={sectionRef}
      className="relative z-30"
      style={{ height: SCENE_HEIGHT }}
      aria-hidden
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-cream"
        style={{ opacity: sceneOpacity, willChange: "opacity" }}
      >
        {/* Above-water ambience */}
        <div className="absolute -top-32 left-1/4 w-[36rem] h-[36rem] rounded-full bg-blush/10 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-1/4 w-[28rem] h-[28rem] rounded-full bg-aqua/12 blur-3xl pointer-events-none" />

        {/* Above-water god rays — visible on cream above water */}
        <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden">
          {rays.map((r, i) => (
            <div
              key={`above-${i}`}
              className="absolute top-[-12%] h-[60%] god-ray-above"
              style={{
                left: r.left,
                width: r.width,
                opacity: r.opacity * 0.5,
                transform: `rotate(${r.rotate}deg)`,
                animationDelay: r.delay,
              }}
            />
          ))}
        </div>

        {/* Water — full-width, edge to edge */}
        <div
          className="absolute left-0 right-0 bottom-0 overflow-hidden will-change-transform"
          style={{ height: `${waterFill}%` }}
        >
          {/* Volumetric depth gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(89,229,249,0.62) 0%, rgba(89,229,249,0.45) 18%, rgba(60,140,200,0.55) 45%, rgba(12,10,146,0.7) 75%, rgba(3,1,121,0.9) 100%)",
            }}
          />

          {/* Submerged god rays */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {rays.map((r, i) => (
              <div
                key={`under-${i}`}
                className="absolute -top-8 h-[140%] god-ray"
                style={{
                  left: r.left,
                  width: r.width,
                  opacity: r.opacity * waterIntensity,
                  transform: `rotate(${r.rotate}deg)`,
                  animationDelay: r.delay,
                }}
              />
            ))}
          </div>

          {/* Animated SVG caustics — fractal noise gives shimmering pool-floor light */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
            preserveAspectRatio="xMidYMid slice"
            style={{ opacity: 0.55 * waterIntensity }}
          >
            <defs>
              <filter id="caustics-filter" x="0" y="0" width="100%" height="100%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.014 0.022"
                  numOctaves="2"
                  seed="7"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="22s"
                    values="0.014 0.022;0.022 0.034;0.014 0.022"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feColorMatrix
                  in="noise"
                  values="0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 1.6 -0.7"
                />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#caustics-filter)" />
          </svg>

          {/* Secondary caustic layer — different frequency for depth */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-soft-light"
            preserveAspectRatio="xMidYMid slice"
            style={{ opacity: 0.7 * waterIntensity }}
          >
            <defs>
              <filter id="caustics-filter-2">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.04 0.05"
                  numOctaves="3"
                  seed="13"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="14s"
                    values="0.04 0.05;0.06 0.08;0.04 0.05"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feColorMatrix
                  in="noise"
                  values="0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 0 1
                          0 0 0 1.2 -0.85"
                />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#caustics-filter-2)" />
          </svg>

          {/* Surface — multi-layer waves */}
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute -top-10 left-0 right-0 w-full h-16 wave-back"
          >
            <path
              d="M0,40 C240,68 480,8 720,38 C960,68 1200,10 1440,40 L1440,80 L0,80 Z"
              fill="rgba(89,229,249,0.45)"
            />
          </svg>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute -top-7 left-0 right-0 w-full h-14 wave-mid"
          >
            <path
              d="M0,46 C240,22 480,62 720,38 C960,14 1200,58 1440,46 L1440,80 L0,80 Z"
              fill="rgba(89,229,249,0.7)"
            />
          </svg>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute -top-4 left-0 right-0 w-full h-10 wave-front"
          >
            <path
              d="M0,52 C240,40 480,64 720,48 C960,32 1200,60 1440,52 L1440,80 L0,80 Z"
              fill="rgba(89,229,249,0.95)"
            />
          </svg>
          {/* Surface specular highlight */}
          <div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{
              top: 0,
              background:
                "linear-gradient(90deg, transparent, rgba(254,254,253,0.85) 40%, rgba(254,254,253,0.95) 50%, rgba(254,254,253,0.85) 60%, transparent)",
              boxShadow: "0 0 12px rgba(254,254,253,0.6)",
            }}
          />

          {/* Bubbles */}
          {bubbles.map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full bubble"
              style={{
                left: b.left,
                bottom: 0,
                width: b.size,
                height: b.size,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.dur}s`,
                ["--sway" as string]: `${b.sway}px`,
              }}
            />
          ))}

          {/* Floor — sand and pebble bed */}
          <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(3,1,121,0.85) 0%, rgba(3,1,121,0.5) 40%, rgba(3,1,121,0.1) 100%)",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full opacity-40"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <filter id="sand-noise">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.9"
                    numOctaves="2"
                    seed="5"
                  />
                  <feColorMatrix values="0 0 0 0 0.05
                                          0 0 0 0 0.04
                                          0 0 0 0 0.3
                                          0 0 0 1 0" />
                </filter>
              </defs>
              <rect width="100%" height="100%" filter="url(#sand-noise)" />
            </svg>
          </div>
        </div>

        {/* Splash droplets at impact point */}
        <div
          className="absolute left-1/2 will-change-transform pointer-events-none"
          style={{
            bottom: `calc(${waterFill}% - 4px)`,
            transform: "translateX(-50%)",
            opacity: splash,
          }}
        >
          {Array.from({ length: 13 }).map((_, i) => {
            const t = (i / 12) * Math.PI;
            const r = 80 + (i % 3) * 18;
            const dx = Math.cos(t + Math.PI) * r * (0.6 + splash * 0.5);
            const dy = -Math.sin(t) * (50 + (i % 3) * 22) * (0.6 + splash * 0.6);
            const size = 4 + (i % 4) * 1.8;
            return (
              <span
                key={i}
                className="absolute rounded-full bg-cream"
                style={{
                  width: size,
                  height: size,
                  transform: `translate(${dx}px, ${dy}px)`,
                  boxShadow:
                    "0 0 14px rgba(89,229,249,0.95), 0 0 4px rgba(254,254,253,1)",
                  opacity: splash,
                }}
              />
            );
          })}
          {/* Splash crown — surface ripple */}
          <div
            className="absolute rounded-full border-2 border-cream/80"
            style={{
              width: 120 * splash,
              height: 22 * splash,
              left: -60 * splash,
              top: -11 * splash,
              boxShadow: "0 0 18px rgba(89,229,249,0.6)",
              opacity: splash * 0.85,
            }}
          />
        </div>

        {/* Logo */}
        <div
          className="absolute left-1/2 top-[22%] will-change-transform"
          style={{
            transform: `translate(calc(-50% + ${logoSwayX}px), ${logoTranslate}vh) rotate(${logoRotate}deg) scale(${logoScale})`,
            filter: `blur(${logoBlur}px) brightness(${logoBrightness}) hue-rotate(${logoHue}deg) drop-shadow(0 ${10 + sink * 14}px ${20 + sink * 12}px rgba(3,1,121,${0.18 + sink * 0.18}))`,
          }}
        >
          <img
            src="/assets/logo-removebg-preview.png"
            alt="Royal Fish"
            className="w-44 sm:w-52 md:w-64 h-auto"
            style={{ mixBlendMode: "multiply" }}
            draggable={false}
          />
        </div>

        {/* Eyebrow + scroll prompt */}
        <div
          className="absolute bottom-12 left-0 right-0 text-center pointer-events-none"
          style={{ opacity: promptOpacity }}
        >
          <p className="eyebrow text-navy/45 mb-3">
            Royal Fish · Markthal Rotterdam
          </p>
          <div className="text-navy/45 text-xs flex items-center justify-center gap-2">
            <span>Scroll to dive in</span>
            <svg
              className="w-3 h-3 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
