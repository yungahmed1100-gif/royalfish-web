import { useState } from "react";
import { Flame, Star } from "lucide-react";
import SectionCollage from "./SectionCollage";

type Category = "all" | "popular" | "seafood" | "drinks" | "sides";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  popular: boolean;
  category: Category[];
  tag?: string;
  tagTone?: "blush" | "aqua";
}

const menuItems: MenuItem[] = [
  {
    name: "Hollandse Nieuwe",
    description: "Traditional Dutch raw herring with pickles and onions — a local rite of passage.",
    price: "€6.50",
    image: "/assets/harring.jpg",
    popular: true,
    category: ["popular", "seafood"],
    tag: "Signature",
    tagTone: "blush",
  },
  {
    name: "Kibbeling",
    description: "Crispy battered cod bites with house garlic sauce — Holland's beloved street food.",
    price: "€8.50",
    image: "/assets/kibbling.jpg",
    popular: true,
    category: ["popular", "seafood"],
    tag: "Crowd favourite",
    tagTone: "aqua",
  },
  {
    name: "Steamed Mussels",
    description: "White wine, garlic and herbs, served with crusty bread and frites.",
    price: "€14.50",
    image: "/assets/mussels.jpg",
    popular: true,
    category: ["popular", "seafood"],
  },
  {
    name: "Fresh Oysters",
    description: "Half dozen on ice with lemon and house mignonette. Briny and bright.",
    price: "€16.00",
    image: "/assets/oysters.jpg",
    popular: false,
    category: ["seafood"],
  },
  {
    name: "Royal Fish Platter",
    description: "Fried fish, prawns, calamari and frites. The full chorus.",
    price: "€18.50",
    image: "/assets/table.jpg",
    popular: true,
    category: ["popular", "seafood"],
    tag: "Best for two",
    tagTone: "blush",
  },
  {
    name: "Salmon Fillet",
    description: "Grilled Atlantic salmon, seasonal vegetables, lemon butter.",
    price: "€16.00",
    image: "/assets/salmon.jpg",
    popular: false,
    category: ["seafood"],
  },
  {
    name: "Seafood Rice",
    description: "Fragrant rice loaded with prawns, mussels and the day's catch in a savoury broth.",
    price: "€13.50",
    image: "/assets/seafood-rice.jpg",
    popular: false,
    category: ["seafood"],
  },
  {
    name: "Broodje Haring",
    description: "Classic Dutch herring sandwich on a soft bun with pickled onions.",
    price: "€5.50",
    image: "/assets/harring2.jpg",
    popular: false,
    category: ["sides"],
  },
  {
    name: "Grolsch Premium",
    description: "Dutch lager — the natural pairing for everything fried, briny or buttered.",
    price: "€4.00",
    image: "/assets/grosch-beer.jpg",
    popular: false,
    category: ["drinks"],
  },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "popular", label: "Popular" },
  { key: "seafood", label: "Seafood" },
  { key: "sides", label: "Sides" },
  { key: "drinks", label: "Drinks" },
];

export default function Menu() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all"
      ? menuItems
      : menuItems.filter((item) => item.category.includes(active));

  return (
    <section id="menu" className="relative py-32 md:py-48 overflow-hidden bg-cream-50">
      {/* decorative */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-aqua/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blush/15 blur-3xl pointer-events-none" />

      <SectionCollage chunkIndex={3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-14 max-w-2xl">
          <div className="reveal inline-flex items-center gap-3 mb-6">
            <span className="eyebrow text-aqua-splash">From the Sea</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight mb-6 text-navy">
            Taste the <span className="font-display italic text-splash">ocean</span>
          </h2>
          <p className="reveal reveal-delay-2 text-navy/65 text-lg">
            From the herring barrel to the fryer to the half-shell — every plate is a small,
            honest tribute to the Dutch coast.
          </p>
        </div>

        {/* Categories */}
        <div className="reveal flex flex-wrap gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat.key
                  ? "bg-navy text-cream shadow-[0_8px_24px_-8px_rgba(3,1,121,0.55)]"
                  : "text-navy/65 hover:text-navy border border-navy/15 hover:border-navy/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => (
            <article
              key={item.name}
              className={`reveal reveal-delay-${(i % 3) + 1} group relative card-light rounded-2xl overflow-hidden`}
            >
              {/* Image */}
              {item.image ? (
                <div className="img-frame relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ruby text-cream text-[10px] uppercase tracking-[0.2em] font-semibold">
                      <Flame className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                  {item.tag && (
                    <div
                      className={`absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                        item.tagTone === "aqua" ? "tag-aqua" : "tag-blush"
                      }`}
                    >
                      {item.tag}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative h-56 bg-gradient-to-br from-aqua/30 via-blush/20 to-cream flex items-center justify-center">
                  <span className="font-display italic text-5xl text-navy">Bar</span>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-baseline">
                  <h3 className="font-display text-xl text-navy group-hover:text-ruby transition-colors">
                    {item.name}
                  </h3>
                  <span className="leader" />
                  <span className="text-ruby font-semibold text-base">{item.price}</span>
                </div>
                <p className="text-navy/60 text-sm leading-relaxed mt-2">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Footer note + CTA */}
        <div className="text-center mt-14">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-6 py-4 rounded-full card-light text-sm text-navy/65">
            <span className="inline-flex items-center gap-2">
              <Star className="w-4 h-4 text-ruby" />
              Average €10–20 per person
            </span>
            <span className="hidden sm:block w-px h-4 bg-navy/15" />
            <a
              href="#contact"
              className="text-ruby hover:text-ruby-700 font-medium inline-flex items-center gap-1.5"
            >
              Order ahead or visit us today →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
