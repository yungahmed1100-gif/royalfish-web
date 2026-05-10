import { useLang } from "../contexts/LanguageContext";
import SectionCollage from "./SectionCollage";

const galleryImages = [
  { src: "/assets/royalfish.jpeg", alt: "Royal Fish stall · Markthal", span: "md:col-span-2 md:row-span-2" },
  { src: "/assets/markthal3.jpeg", alt: "Inside the Markthal", span: "" },
  { src: "/assets/oysters.jpg", alt: "Fresh oysters", span: "" },
  { src: "/assets/harring.jpg", alt: "Hollandse Nieuwe", span: "" },
  { src: "/assets/salmon.jpg", alt: "Atlantic salmon", span: "" },
  { src: "/assets/table.jpg", alt: "Royal Fish platter", span: "md:col-span-2" },
  { src: "/assets/mussels.jpg", alt: "Steamed mussels", span: "" },
  { src: "/assets/kibbling.jpg", alt: "Crispy kibbeling", span: "" },
  { src: "/assets/seafood-rice.jpg", alt: "Seafood rice", span: "" },
  { src: "/assets/menu.jpg", alt: "On the plate", span: "" },
  { src: "/assets/harring2.jpg", alt: "Broodje haring", span: "" },
  { src: "/assets/grosch-beer.jpg", alt: "Grolsch on tap", span: "" },
];

export default function Gallery() {
  const { t } = useLang();
  return (
    <section id="gallery" aria-label="Photo gallery" className="relative py-32 md:py-48 overflow-hidden bg-blush-wash">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blush/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-aqua/15 blur-3xl pointer-events-none" />

      <SectionCollage chunkIndex={4} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="reveal inline-flex items-center gap-3 mb-5">
              <span className="eyebrow text-ruby">{t.gallery.eyebrow}</span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight max-w-2xl text-navy">
              {t.gallery.heading} <span className="font-display italic text-splash">{t.gallery.headingHighlight}</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-navy/65 max-w-md">
            {t.gallery.desc}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[240px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1} img-frame relative rounded-2xl overflow-hidden group cursor-pointer shadow-[0_15px_40px_-15px_rgba(3,1,121,0.25)] ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-[1000ms] ease-out"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ruby/0 group-hover:ring-ruby/40 transition-all rounded-2xl pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-display italic text-cream text-sm">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
