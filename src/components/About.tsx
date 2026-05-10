import { MapPin, Clock, Fish, Users, Truck, Sparkles } from "lucide-react";
import SectionCollage from "./SectionCollage";

const features = [
  {
    icon: Sparkles,
    title: "Caught fresh, daily",
    description:
      "Sourced each morning from trusted Dutch fishermen — so what you taste today was in the sea yesterday.",
    tone: "ruby",
  },
  {
    icon: MapPin,
    title: "Inside the Markthal",
    description:
      "Right on Floor G of Rotterdam's iconic Market Hall. Easy to find, always alive with the city's appetite.",
    tone: "aqua",
  },
  {
    icon: Truck,
    title: "Dine-in · Takeaway · Delivery",
    description:
      "Stay and savour, grab and go, or have it delivered. We meet you where you are.",
    tone: "blush",
  },
  {
    icon: Users,
    title: "Warm, attentive service",
    description:
      "Our team is generous with smiles and recommendations. First-time guests rarely leave first-time.",
    tone: "navy",
  },
];

const iconTone: Record<string, string> = {
  ruby: "text-cream bg-ruby",
  aqua: "text-navy bg-aqua",
  blush: "text-cream bg-blush",
  navy: "text-cream bg-navy",
};

const cardTone: Record<string, string> = {
  ruby: "card-ruby",
  aqua: "card-aqua",
  blush: "card-blush",
  navy: "card-navy",
};

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 overflow-hidden bg-cream">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blush/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-aqua/20 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-0 w-px h-40 bg-gradient-to-b from-transparent via-ruby/30 to-transparent" />

      <SectionCollage chunkIndex={1} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-20 max-w-3xl">
          <div className="reveal inline-flex items-center gap-3 mb-6">
            <span className="eyebrow text-ruby">Our Story</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight mb-8 text-navy">
            Real fish specialists, <br className="hidden md:block" />
            with <span className="font-display italic text-splash">30+ years</span> at the market.
          </h2>
          <p className="reveal reveal-delay-2 text-navy/65 text-lg leading-relaxed">
            Royal Fish was founded by real fish specialists with more than 30 years of experience
            in the fish market. Given the unique opportunity to open a stall inside Markthal Rotterdam,
            the owners took it with both hands.
          </p>
        </div>

        {/* Editorial highlight */}
        <div className="reveal grid lg:grid-cols-12 gap-10 mb-24 items-center">
          <div className="lg:col-span-7 relative">
            <div className="img-frame rounded-[2rem] overflow-hidden aspect-[4/3] shadow-[0_30px_80px_-20px_rgba(3,1,121,0.35)]">
              <img
                src="/assets/royalfish.jpeg"
                alt="Royal Fish stall in Markthal Rotterdam"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ticket absolute -bottom-6 -right-4 md:-right-10 w-32 h-32 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center -rotate-6">
              <span className="font-display italic text-3xl md:text-5xl text-splash leading-none">30+</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-navy/65 mt-1 text-center px-3">Years at the market</span>
            </div>
            {/* aqua splash sticker */}
            <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 ticket w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center rotate-12 bg-aqua/40">
              <span className="font-display italic text-navy text-sm md:text-base text-center leading-tight">Fresh<br/>daily</span>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <div className="eyebrow text-ruby mb-4">The Royal story</div>
            <p className="font-display italic text-2xl md:text-3xl leading-snug text-navy mb-6">
              "Royal Fish stands for fresh fish, pure fried dish, delicious mussels, delicious herring, beautiful wine and good service."
            </p>
            <div className="space-y-4 text-navy/70 leading-relaxed">
              <p>
                The owners and staff have a sincere love for the fish market — you can taste it
                in the very friendly service and in the experienced preparations of every dish.
              </p>
              <p>
                All fish dishes are <span className="text-navy font-semibold">homemade</span>, the
                fish are bought <span className="text-navy font-semibold">fresh every day</span>,
                and our fried fish is baked right in front of you — a real delicacy from an
                extensive fryer menu.
              </p>
            </div>
            {/* signature stat row */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { n: "30+", l: "years experience", card: "card-ruby", num: "text-ruby" },
                { n: "100%", l: "homemade dishes", card: "card-aqua", num: "text-navy" },
                { n: "Daily", l: "fresh catch", card: "card-blush", num: "text-ruby" },
              ].map((s) => (
                <div key={s.l} className={`${s.card} rounded-xl p-4 text-center`}>
                  <div className={`font-display text-2xl leading-none ${s.num}`}>{s.n}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-navy/65 mt-2 font-semibold">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          <div className="reveal card-ruby rounded-2xl p-7">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-ruby flex items-center justify-center shrink-0 shadow-md">
                <Clock className="w-5 h-5 text-cream" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl mb-3 text-navy">Opening Hours</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-navy/55">Monday – Thursday</span>
                    <span className="text-navy font-medium">10:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-navy/55">Friday – Saturday</span>
                    <span className="text-navy font-medium">10:00 – 21:00</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-navy/55">Sunday</span>
                    <span className="text-navy font-medium">12:00 – 18:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-1 card-aqua rounded-2xl p-7">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-aqua flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-display text-xl mb-3 text-navy">Find us</h3>
                <p className="text-navy/65 leading-relaxed text-sm">
                  Dominee Jan Scharpstraat 298
                  <br />
                  3011 GX Rotterdam, Netherlands
                </p>
                <p className="text-ruby text-sm mt-2 flex items-center gap-1.5 font-medium">
                  <Fish className="w-3.5 h-3.5" /> Floor G · Market Hall
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`reveal reveal-delay-${(i % 3) + 1} ${cardTone[feature.tone]} rounded-2xl p-6`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 shadow-md ${iconTone[feature.tone]}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg mb-2 text-navy">{feature.title}</h3>
              <p className="text-navy/65 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
