import { Sparkles, Anchor, Award, Clock } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const items = [
  { icon: Sparkles, label: "Caught daily", sub: "Fresh by 8AM", tone: "ruby" },
  { icon: Anchor, label: "North Sea sourced", sub: "Trusted Dutch suppliers", tone: "aqua" },
  { icon: Award, label: "Markthal landmark", sub: "Featured destination", tone: "blush" },
  { icon: Clock, label: "Open 7 days", sub: "Until 8PM weekdays", tone: "navy" },
];

const tones: Record<
  string,
  { card: string; iconBg: string; iconColor: string; accent: string }
> = {
  ruby: {
    card: "bg-gradient-to-br from-[#fceaec] to-cream",
    iconBg: "bg-ruby",
    iconColor: "text-cream",
    accent: "text-ruby",
  },
  aqua: {
    card: "bg-gradient-to-br from-[#eaf9fc] to-cream",
    iconBg: "bg-aqua",
    iconColor: "text-navy",
    accent: "text-navy",
  },
  blush: {
    card: "bg-gradient-to-br from-[#fdedf1] to-cream",
    iconBg: "bg-blush",
    iconColor: "text-cream",
    accent: "text-ruby",
  },
  navy: {
    card: "bg-gradient-to-br from-[#e6e5f4] to-cream",
    iconBg: "bg-navy",
    iconColor: "text-cream",
    accent: "text-navy",
  },
};

export default function TrustStrip() {
  const { t } = useLang();
  const items = [
    { icon: Sparkles, label: t.trust[0].label, sub: t.trust[0].sub, tone: "ruby" },
    { icon: Anchor,   label: t.trust[1].label, sub: t.trust[1].sub, tone: "aqua" },
    { icon: Award,    label: t.trust[2].label, sub: t.trust[2].sub, tone: "blush" },
    { icon: Clock,    label: t.trust[3].label, sub: t.trust[3].sub, tone: "navy" },
  ];
  return (
    <section className="relative -mt-px">
      {/* Top brand stripe */}
      <div className="brand-stripe" />

      <div className="bg-cream-50 border-b border-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((it) => {
              const t = tones[it.tone];
              return (
                <div
                  key={it.label}
                  className={`reveal flex items-center gap-3 rounded-2xl p-4 ${t.card} border border-navy/5 shadow-[0_8px_20px_-12px_rgba(3,1,121,0.15)]`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${t.iconBg} shadow-md`}
                  >
                    <it.icon className={`w-5 h-5 ${t.iconColor}`} />
                  </div>
                  <div className="leading-tight min-w-0">
                    <div className={`text-sm font-bold ${t.accent}`}>{it.label}</div>
                    <div className="text-xs text-navy/60">{it.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
