"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MessageCircle, MapPin, Facebook, Sparkles, Send, Loader2, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Reveal from "@/components/Reveal";
import { PHONE, PHONE_DISPLAY, WHATSAPP } from "@/lib/constants";
import { useSettings } from "@/hooks/use-settings";

const PROGRAMS = [
  "2-Day Beginner Program",
  "15-Day Advanced Program",
  "30-Day Professional Program",
];

const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email").max(255),
  program: z.enum(PROGRAMS as [string, ...string[]], { message: "Please choose a program" }),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

function ContactForm() {
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", program: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        program: parsed.data.program,
        message: parsed.data.message || null,
      });
      if (error) throw error;
      toast.success("Thanks! We'll get back to you shortly.");
      setForm({ full_name: "", phone: "", email: "", program: "", message: "" });
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Enhanced Form Input Theme & Interactive Overlay Focus ring mapping
  const fieldClass = "w-full rounded-xl border border-[#DBEAFE] bg-[#FFFFFF] px-4 py-3.5 text-sm text-[#111827] font-medium placeholder-[#111827]/40 focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15 transition-all duration-200 shadow-sm";

  return (
    <form onSubmit={onSubmit} className="h-full rounded-3xl border border-[#DBEAFE] bg-white p-6 sm:p-8 lg:p-10 space-y-5 shadow-xl">
      <div>
        <h3 className="font-sans text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight flex items-center gap-2">
          Enquire About a Program
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-[#111827]/70 font-medium">
          Share your details — our execution team will reach out within one business day.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required className={fieldClass} placeholder="Full Name *" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} maxLength={100} />
        <input required className={fieldClass} placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} type="tel" />
      </div>
      
      <input required className={fieldClass} placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} type="email" />
      
      <div className="relative">
        <select required className={fieldClass} value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}>
          <option value="" className="text-[#111827]/50">Interested Program *</option>
          {PROGRAMS.map((p) => <option key={p} value={p} className="text-[#111827]">{p}</option>)}
        </select>
      </div>
      
      <textarea className={fieldClass} placeholder="Message (optional)" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
      
      <motion.button 
        type="submit" 
        disabled={submitting} 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1E3A8A] text-white px-6 py-4 text-sm font-bold uppercase tracking-wider shadow-md transition-colors disabled:opacity-60 disabled:pointer-events-none mt-2"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Sending..." : "Send Enquiry"}
      </motion.button>
    </form>
  );
}

export default function Contact() {
  const s = useSettings();
  
  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 bg-[#F9FAFB] text-[#111827] overflow-hidden">
      
      {/* ------------------------------------------- */}
      {/* AMBIENT BACKGROUND ELEMENTS                 */}
      {/* ------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11182704_1px,transparent_1px),linear-gradient(to_bottom,#11182704_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute bottom-0 left-1/4 w-[50%] h-[40%] rounded-full bg-[#2563EB]/5 blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[40%] h-[40%] rounded-full bg-[#93C5FD]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-[#2563EB] text-xs font-bold tracking-widest uppercase bg-[#2563EB]/10 px-3 py-1.5 rounded-full inline-block shadow-sm">
              Contact
            </span>
            <h2 className="mt-3 font-sans text-3xl md:text-5xl font-black text-[#111827] uppercase tracking-tight">
              {s("section_contact_heading", "Get in Touch")}
            </h2>
            <div className="h-1 w-16 bg-[#2563EB] mx-auto mt-3 rounded-full" />
          </div>
        </Reveal>

        {/* 12-Column Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Side Panel (Spans 5 Columns) */}
          <div className="lg:col-span-5 h-full">
            <Reveal>
              <div className="h-full rounded-3xl border border-[#DBEAFE] bg-white p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-sm">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#111827]/50 font-bold">Address</div>
                      <p className="mt-1 text-sm sm:text-base leading-relaxed text-[#111827] font-semibold">
                        Office No 23, 3rd Floor, B Wing, City Vista Downtown, Fountain Road, Kharadi, Pune - 411014
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#111827]/50 font-bold">Phone</div>
                      <a href={`tel:${PHONE}`} className="mt-1 block text-sm sm:text-base font-bold text-[#1E3A8A] hover:text-[#2563EB] transition-colors">
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#111827]/50 font-bold">Business Hours</div>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-[#111827]">
                        Open Mon - Sat <span className="text-[#2563EB] font-bold">09:00 am – 05:00 pm</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Actions Panel */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-[#DBEAFE]">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={WHATSAPP} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1E3A8A] text-white px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide shadow-sm transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 stroke-[2.5]" /> WhatsApp
                  </motion.a>
                  
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://www.facebook.com/ExpertAction.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 rounded-xl border border-[#DBEAFE] bg-[#F9FAFB] hover:bg-zinc-100 text-[#111827] px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide shadow-sm transition-colors"
                  >
                    <Facebook className="h-4 w-4 text-[#2563EB]" /> Facebook
                  </motion.a>
                </div>

                {/* Dynamic Google Maps Container */}
                <div className="rounded-2xl overflow-hidden border border-[#DBEAFE] mt-6 shadow-inner min-h-[200px] bg-[#F9FAFB]">
                  <iframe
                    title="ExpertAction location"
                    src="https://www.google.com/maps?q=City+Vista+Downtown+Kharadi+Pune&output=embed"
                    className="h-[200px] w-full border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>
            </Reveal>
          </div>

          {/* Form Side Panel (Spans 7 Columns) */}
          <div className="lg:col-span-7 h-full">
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}