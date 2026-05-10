import { Star, Quote } from "lucide-react";
import SectionCollage from "./SectionCollage";
import { useLang } from "../contexts/LanguageContext";

interface Review {
  name: string;
  badge: string;
  rating: number;
  timeAgo: string;
  text: string;
  photos: number;
}

const reviews: Review[] = [
  {
    name: "Hollis Travel",
    badge: "Local Guide · 84 reviews",
    rating: 5,
    timeAgo: "4 months ago",
    text: "Located right in the heart of the food hall, this place is such a gem. The seafood is fantastic, the service is warm and welcoming, and there's plenty of seating. The traditional herring was absolutely delicious.",
    photos: 3,
  },
  {
    name: "S S",
    badge: "Local Guide · 211 reviews",
    rating: 4,
    timeAgo: "11 months ago",
    text: "I tried the hake fillet and fries — service was prompt, plenty of seating, and the food was good. Extra mayo and ketchup happily provided.",
    photos: 11,
  },
  {
    name: "Winson",
    badge: "Local Guide · 416 reviews",
    rating: 5,
    timeAgo: "6 months ago",
    text: "Tried the herring and it surprised me — good and not fishy at all. Mussels were really good. Great spot in the Market Hall.",
    photos: 5,
  },
  {
    name: "Maria K.",
    badge: "Local Guide · 52 reviews",
    rating: 5,
    timeAgo: "2 months ago",
    text: "A great place for herring rolls and mixed fried seafood platters. Friendly staff, efficient service. Perfect for a quick lunch in Rotterdam.",
    photos: 2,
  },
  {
    name: "Thomas B.",
    badge: "12 reviews",
    rating: 4,
    timeAgo: "1 month ago",
    text: "The kibbeling here is the best I've had in Rotterdam — crispy outside, tender fish inside. Paired with their garlic sauce, it's perfection.",
    photos: 0,
  },
  {
    name: "Anne V.",
    badge: "Local Guide · 89 reviews",
    rating: 4,
    timeAgo: "3 months ago",
    text: "The mussels and the Royal Fish platter were both excellent. The Markthal location makes it a great stop while exploring Rotterdam. Reasonable prices too.",
    photos: 4,
  },
];

const ratingDistribution = [
  { stars: 5, count: 82 },
  { stars: 4, count: 48 },
  { stars: 3, count: 25 },
  { stars: 2, count: 13 },
  { stars: 1, count: 10 },
];

const popularMentions = [
  { label: "kibbeling", count: 14 },
  { label: "herring", count: 16 },
  { label: "mussels", count: 11 },
  { label: "hake", count: 2 },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? "fill-ruby text-ruby" : "fill-navy/15 text-navy/15"
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const totalReviews = 178;
  const maxCount = Math.max(...ratingDistribution.map((r) => r.count));
  const { t } = useLang();

  return (
    <section id="reviews" aria-label="Customer Reviews" className="relative py-32 md:py-48 bg-cream-50">
      {/* Marquee header strip */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden border-y border-navy/10 bg-cream py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6 text-navy/40 font-display italic text-lg shrink-0">
              {["Fresh daily", "★ 4.1 on Google", "Markthal Floor G", "10+ years serving Rotterdam", "Hollandse Nieuwe", "Open 7 days"].map((t) => (
                <span key={t} className="flex items-center gap-12 shrink-0">
                  {t}
                  <span className="text-ruby">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <SectionCollage chunkIndex={5} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <div className="reveal inline-flex items-center gap-3 mb-5">
            <span className="eyebrow text-ruby">{t.reviews.eyebrow}</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight text-navy">
            {t.reviews.heading} <span className="font-display italic text-splash">{t.reviews.headingHighlight}</span> {t.reviews.headingSuffix}
          </h2>
        </div>

        {/* Rating overview */}
        <div className="reveal grid lg:grid-cols-12 gap-8 mb-16 card-light rounded-3xl p-8 md:p-12">
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left lg:border-r lg:border-navy/10 lg:pr-8">
            <div className="font-display text-7xl md:text-8xl text-splash leading-none">4.1</div>
            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-ruby text-ruby" />
              ))}
              <Star className="w-4 h-4 fill-ruby/25 text-ruby" />
            </div>
            <p className="text-navy/55 mt-3 text-sm">{t.reviews.basedOn}</p>
          </div>

          <div className="lg:col-span-5 space-y-2">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-3">
                <span className="text-xs text-navy/45 w-3">{r.stars}</span>
                <Star className="w-3 h-3 fill-ruby text-ruby shrink-0" />
                <div className="flex-1 h-1.5 bg-navy/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blush to-ruby rounded-full transition-all duration-1000"
                    style={{ width: `${(r.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-navy/45 w-8 text-right">{r.count}</span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-navy/10 lg:pl-8">
            <h4 className="eyebrow text-navy/55 mb-4">{t.reviews.mostMentioned}</h4>
            <div className="flex flex-wrap gap-2">
              {popularMentions.map((tag, i) => (
                <span
                  key={tag.label}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                    i % 2 === 0
                      ? "bg-aqua/30 text-navy border border-aqua/40"
                      : "bg-blush/15 text-ruby border border-blush/30"
                  }`}
                >
                  {tag.label}
                  <span className="opacity-60 ml-1">({tag.count})</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => {
            const cardTints = ["card-blush", "card-aqua", "card-ruby", "card-navy", "card-aqua", "card-blush"];
            const avatarGradients = [
              "from-blush to-ruby",
              "from-aqua to-navy",
              "from-ruby to-navy",
              "from-blush to-aqua",
              "from-aqua to-ruby",
              "from-navy to-blush",
            ];
            const quoteColors = ["text-blush", "text-aqua", "text-ruby", "text-navy", "text-aqua", "text-blush"];
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${(i % 3) + 1} ${cardTints[i % cardTints.length]} rounded-2xl p-7 group`}
              >
                <Quote className={`w-7 h-7 ${quoteColors[i % quoteColors.length]} mb-4`} />
                <StarRating rating={review.rating} />
                <p className="font-display text-navy text-base leading-relaxed mt-4 mb-6 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-navy/10">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center text-cream font-bold text-sm shrink-0 shadow-md`}>
                    {review.name.charAt(0)}
                  </div>
                <div className="min-w-0 flex-1">
                  <p className="text-navy text-sm font-semibold truncate">{review.name}</p>
                  <p className="text-navy/45 text-xs truncate">{review.badge}</p>
                </div>
                <span className="text-xs text-navy/40 shrink-0">{review.timeAgo}</span>
              </div>
            </div>
            );
          })}
        </div>

        <div className="mt-12">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Royal+Fish+Markthal+Rotterdam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-navy/20 text-navy/80 rounded-full hover:bg-navy/5 hover:border-ruby/40 hover:text-ruby transition-all text-sm font-medium"
          >
            {t.reviews.readAll}
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
