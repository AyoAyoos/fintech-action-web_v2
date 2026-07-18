import { Phone, MessageCircle } from "lucide-react";
import { NAV, PHONE, PHONE_DISPLAY, WHATSAPP } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-deep px-5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-gold-soft text-primary-foreground font-black">
                E
              </div>
              <span className="font-display font-extrabold text-lg">
                Expert<span className="text-primary">Action</span>
                <sup className="text-[10px] text-primary">®</sup>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Price Action. Precision Execution.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${PHONE}`} className="hover:text-primary">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={WHATSAPP} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>Kharadi, Pune - 411014</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-card/50 p-5 text-[11px] leading-relaxed text-muted-foreground">
          ExpertAction® provides educational content for learning purposes only. It does not offer
          guaranteed returns, portfolio management, or investment advisory services. All trading and
          investment decisions should be made at your own discretion after considering your financial
          objectives and risk profile. This website provides educational content only and does NOT
          constitute investment advice, financial recommendation, or endorsement of specific securities.
          No guaranteed returns are promised or implied. Trading in financial markets involves risk, and
          you are advised to seek guidance from SEBI-registered professionals before making investment
          decisions.
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>Copyright © 2026 ExpertAction Price Action Trading Academy - All Rights Reserved.</p>
          <a href="/admin" className="text-muted-foreground/60 hover:text-primary transition-colors">
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
}