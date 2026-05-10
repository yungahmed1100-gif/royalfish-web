import { Navigation, Phone } from "lucide-react";

interface Props {
  show?: boolean;
}

export default function StickyCTA({ show = true }: Props) {
  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 bg-gradient-to-t from-cream via-cream/95 to-cream/0 transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="flex gap-2 rounded-2xl bg-cream border border-navy/10 p-2 shadow-[0_-12px_40px_-8px_rgba(3,1,121,0.18)]">
        <a
          href="tel:+31000000000"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-navy/15 text-navy font-medium text-sm hover:bg-navy/5"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Markthal+Rotterdam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.4] flex items-center justify-center gap-2 py-3 rounded-xl bg-ruby text-cream font-bold text-sm shadow-[0_10px_30px_-8px_rgba(164,17,32,0.55)]"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </a>
      </div>
    </div>
  );
}
