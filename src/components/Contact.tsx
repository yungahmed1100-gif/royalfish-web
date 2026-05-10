import { MapPin, Clock, Navigation, Phone, Store } from "lucide-react";
import SectionCollage from "./SectionCollage";
import { useLang } from "../contexts/LanguageContext";

const hours = [
  { day: "Monday – Thursday", hours: "10:00 – 20:00" },
  { day: "Friday – Saturday", hours: "10:00 – 21:00" },
  { day: "Sunday", hours: "12:00 – 18:00" },
];

export default function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="relative py-32 md:py-48 overflow-hidden bg-cream">
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] rounded-full bg-aqua/15 blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-0 w-px h-32 bg-gradient-to-b from-transparent via-ruby/30 to-transparent" />
      <div className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-blush/15 blur-3xl pointer-events-none" />

      <SectionCollage chunkIndex={6} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <div className="reveal inline-flex items-center gap-3 mb-5">
            <span className="eyebrow text-aqua-splash">{t.contact.eyebrow}</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight mb-6 text-navy">
            {t.contact.heading} <span className="font-display italic text-splash">{t.contact.headingHighlight}</span> {t.contact.headingSuffix}
          </h2>
          <p className="reveal reveal-delay-2 text-navy/65 text-lg">{t.contact.desc}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Map embed */}
          <div className="reveal lg:col-span-7 rounded-3xl overflow-hidden border border-navy/10 h-[420px] lg:h-auto relative group shadow-[0_30px_80px_-20px_rgba(3,1,121,0.25)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2460.7!2d4.4875!3d51.9201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c434a5ae8c3b15%3A0xd8c6f4e83e6c85a1!2sMarkthal%20Rotterdam!5e0!3m2!1sen!2snl!4v1700000000000!5m2!1sen!2snl"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Royal Fish location"
              className="transition-all duration-700"
            />
            <div className="absolute top-5 left-5 px-4 py-2.5 rounded-full bg-cream/95 backdrop-blur-xl border border-navy/10 text-navy text-sm font-semibold flex items-center gap-2 shadow-2xl">
              <span className="relative w-1.5 h-1.5 rounded-full bg-aqua pulse-dot" />
              {t.contact.openNow}
            </div>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="reveal card-light rounded-2xl p-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-ruby/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-ruby" />
                </div>
                <div>
                  <h3 className="font-display text-xl mb-1.5 text-navy">{t.contact.addressTitle}</h3>
                  <p className="text-navy/65 leading-relaxed text-sm">
                    Dominee Jan Scharpstraat 298<br />
                    3011 GX Rotterdam, Netherlands
                  </p>
                  <p className="text-ruby text-sm mt-2 font-medium">{t.contact.floor}</p>
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-1 card-light rounded-2xl p-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-aqua/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl mb-3 text-navy">{t.contact.hoursTitle}</h3>
                  <div className="space-y-1.5 text-sm">
                    {hours.map((row) => (
                      <div key={row.day} className="flex items-baseline gap-2">
                        <span className="text-navy/55">{row.day}</span>
                        <span className="leader" />
                        <span className="text-navy font-medium">{row.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="reveal reveal-delay-2 grid grid-cols-2 gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Dominee+Jan+Scharpstraat+298+Rotterdam+Netherlands"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-4 btn-primary"
              >
                <Navigation className="w-4 h-4" />
                {t.contact.directions}
              </a>
              <a
                href="tel:+31000000000"
                className="flex items-center justify-center gap-2 px-5 py-4 border border-navy/20 text-navy font-semibold rounded-full hover:bg-navy/5 hover:border-ruby/40 transition-all"
              >
                <Phone className="w-4 h-4" />
                {t.contact.callUs}
              </a>
            </div>

            <div className="reveal reveal-delay-3 card-light rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <Store className="w-4 h-4 text-ruby" />
                <h3 className="eyebrow text-navy/80">{t.contact.servicesTitle}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Dine-in", tone: "aqua" },
                  { label: "Takeaway", tone: "blush" },
                  { label: "Delivery", tone: "aqua" },
                ].map((s) => (
                  <span
                    key={s.label}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                      s.tone === "aqua"
                        ? "bg-aqua/30 text-navy border border-aqua/50"
                        : "bg-blush/20 text-ruby border border-blush/40"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    {s.label}
                  </span>
                ))}
              </div>
              <p className="text-navy/40 text-xs mt-5 font-mono">Plus Code: WF9P+VJ Rotterdam, NL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
