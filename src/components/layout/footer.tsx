import { Phone, MapPin, MessageCircle } from "lucide-react";
import { BRAND, LOCATIONS, SOCIAL } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-dark text-white/50 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
        {/* Top — brand + locations */}
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Brand column */}
          <div>
            <p className="font-ui text-sm font-bold tracking-[0.15em] text-white uppercase">
              Pullen&apos;s Tombstones
            </p>
            <p className="text-[9px] tracking-[0.25em] text-gold/50 uppercase font-ui font-medium mt-1">
              Cast in Stone &middot; Since 1982
            </p>
            <div className="hairline-gold mt-5 mb-5" style={{ width: 50 }} />
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              Three generations. One workshop. Honouring KwaZulu-Natal families with dignity.
            </p>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="hover:text-gold transition-colors min-h-10 min-w-10 flex items-center justify-center rounded-sm border border-white/8 hover:border-gold/30">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="hover:text-gold transition-colors min-h-10 min-w-10 flex items-center justify-center rounded-sm border border-white/8 hover:border-gold/30">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
              </a>
            </div>
          </div>

          {/* Location columns */}
          <div className="grid gap-8 sm:grid-cols-2">
            {LOCATIONS.filter(l => l.status === "open").map((loc) => (
              <div key={loc.id}>
                <h3 className="heading-roman text-base text-white/80 mb-3">{loc.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gold/40" />
                    <span className="text-white/40">{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-gold/40" />
                    <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="text-white/40 hover:text-gold transition-colors">{loc.phone}</a>
                  </div>
                </div>
                <a
                  href={whatsappLink(loc.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-sm bg-whatsapp/10 border border-whatsapp/20 px-3 py-2 text-xs font-medium text-whatsapp hover:bg-whatsapp/20 transition-colors min-h-10"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp {loc.shortName}
                </a>
                <p className="mt-2 text-[11px] text-white/20">{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/20">
          <p>&copy; {new Date().getFullYear()} {BRAND.legal} t/a {BRAND.name}</p>
          <p>Cast in Stone Since {BRAND.established}</p>
        </div>
      </div>
    </footer>
  );
}
