import { Building2, Sparkles } from "lucide-react";
import SectionCollage from "./SectionCollage";

const facts = [
  { label: "Markthal opened", value: "2014" },
  { label: "Stalls inside", value: "100+" },
  { label: "Visitors / year", value: "8M" },
];

export default function Rotterdam() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-aqua-wash">
      {/* color blobs */}
      <div className="absolute -top-32 right-0 w-[28rem] h-[28rem] rounded-full bg-aqua/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[22rem] h-[22rem] rounded-full bg-blush/20 blur-3xl pointer-events-none" />

      <SectionCollage chunkIndex={2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image collage */}
          <div className="reveal lg:col-span-6 relative order-2 lg:order-1 h-[460px] md:h-[560px]">
            {/* Big Markthal photo */}
            <div className="absolute top-0 left-0 right-8 md:right-16 h-[68%] img-frame rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(3,1,121,0.35)]">
              <img
                src="/assets/markthal.jpeg"
                alt="Rotterdam Markthal exterior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Cube Houses smaller, overlapping bottom-right */}
            <div className="absolute bottom-0 right-0 w-[55%] h-[48%] img-frame rounded-[2rem] overflow-hidden shadow-[0_25px_60px_-20px_rgba(3,1,121,0.4)] border-4 border-cream">
              <img
                src="/assets/cubehouses.webp"
                alt="Rotterdam Cube Houses"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Markthal interior, smaller, overlapping bottom-left */}
            <div className="absolute bottom-6 left-0 w-[42%] h-[36%] img-frame rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(3,1,121,0.4)] border-4 border-cream rotate-[-3deg]">
              <img
                src="/assets/markthal2.jpeg"
                alt="Markthal interior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* floating ticket */}
            <div className="ticket absolute top-4 -right-2 md:-right-6 px-4 py-2.5 rounded-full -rotate-3 flex items-center gap-2 z-10">
              <Building2 className="w-3.5 h-3.5 text-ruby" />
              <span className="font-display text-xs md:text-sm text-navy">Designed by MVRDV</span>
            </div>
            <div className="ticket absolute top-1/2 -left-2 md:-left-6 px-4 py-2.5 rounded-full rotate-3 flex items-center gap-2 bg-aqua/40 z-10">
              <Sparkles className="w-3.5 h-3.5 text-ruby" />
              <span className="font-display italic text-xs md:text-sm text-navy">Floor G</span>
            </div>
          </div>

          {/* Copy side */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="reveal inline-flex items-center gap-3 mb-5">
              <span className="eyebrow text-ruby">The neighbourhood</span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-tight mb-6 text-navy">
              A taste of <span className="font-display italic text-splash">new Rotterdam.</span>
            </h2>
            <div className="reveal reveal-delay-2 space-y-4 text-navy/70 leading-relaxed">
              <p>
                Rotterdam is bold, modern and unapologetically itself — a port city rebuilt
                with skyline ambition and street-level warmth. At its centre, the Markthal
                rises like a sculpted arch over the city's appetite.
              </p>
              <p>
                Beneath that arch you'll find us, alongside a hundred other purveyors of food,
                wine and good company. From the Cube Houses to the Erasmusbrug — it's our
                favourite address in the Netherlands, and we think you'll see why.
              </p>
            </div>

            {/* fact strip */}
            <div className="reveal reveal-delay-3 mt-8 grid grid-cols-3 gap-3">
              {facts.map((f, i) => {
                const cards = ["card-blush", "card-ruby", "card-navy"];
                const nums = ["text-ruby", "text-ruby", "text-navy"];
                return (
                  <div key={f.label} className={`${cards[i]} rounded-2xl p-4 text-center`}>
                    <div className={`font-display text-2xl md:text-3xl leading-none ${nums[i]}`}>
                      {f.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-navy/65 mt-2 font-semibold">
                      {f.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="reveal reveal-delay-3 mt-8">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Markthal+Rotterdam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ruby font-medium hover:text-ruby-700 transition-colors"
              >
                See us on the map
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
