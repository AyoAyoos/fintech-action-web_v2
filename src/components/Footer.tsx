import { Phone, MessageCircle } from "lucide-react";
import { NAV, PHONE, PHONE_DISPLAY, WHATSAPP } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#DBEAFE] bg-[#F9FAFB] text-[#111827] px-6 pt-10 pb-5">
      <div className="mx-auto max-w-7xl w-full">
        {/* Main Grid: Spread evenly across columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Brand Identity */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#2563EB] text-white text-lg font-black shadow-sm">
                E
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-[#111827]">
                Expert<span className="text-[#2563EB]">Action</span>
                <sup className="text-[11px] font-bold text-[#2563EB] ml-0.5">®</sup>
              </span>
            </div>
            <p className="text-[15px] font-medium text-[#111827]/70">
              Price Action. Precision Execution.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3">
            <div className="text-sm uppercase tracking-wider text-[#2563EB] font-bold">
              Quick Links
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[15px]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-[#111827]/70 hover:text-[#2563EB] transition-colors font-semibold block">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Methods */}
          <div className="flex flex-col space-y-3">
            <div className="text-sm uppercase tracking-wider text-[#2563EB] font-bold">
              Contact
            </div>
            <ul className="space-y-2.5 text-[15px] text-[#111827]/70 font-semibold">
              <li>
                <a href={`tel:${PHONE}`} className="hover:text-[#2563EB] transition-colors inline-flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#2563EB] shrink-0" /> 
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={WHATSAPP} className="hover:text-[#2563EB] transition-colors inline-flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 text-[#2563EB] shrink-0" /> 
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="text-[#111827]/80 pl-6 relative">
                <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[#93C5FD]" />
                Kharadi, Pune - 411014
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Box - Made tighter and cleaner */}
        <div className="mt-8 rounded-xl border border-[#DBEAFE] bg-white px-4 py-3.5 text-[11px] leading-relaxed text-[#111827]/60 shadow-sm">
          ExpertAction® provides educational content for learning purposes only. It does not offer
          guaranteed returns, portfolio management, or investment advisory services. All trading and
          investment decisions should be made at your own discretion after considering your financial
          objectives and risk profile. This website provides educational content only and does NOT
          constitute investment advice, financial recommendation, or endorsement of specific securities.
          No guaranteed returns are promised or implied. Trading in financial markets involves risk, and
          you are advised to seek guidance from SEBI-registered professionals before making investment
          decisions.
        </div>

        {/* Bottom Utility Row */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#111827]/50 border-t border-[#DBEAFE]/60 pt-4">
          <p className="font-medium">Copyright © 2026 ExpertAction Price Action Trading Academy - All Rights Reserved.</p>
          <a href="/admin" className="text-[#111827]/40 hover:text-[#2563EB] transition-colors font-semibold">
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
}