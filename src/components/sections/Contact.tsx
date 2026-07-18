import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MessageCircle, MapPin, Facebook, Sparkles, Send, Loader2 } from "lucide-react";
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

  const field = "w-full rounded-xl border border-white/10 bg-navy-deep/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <form onSubmit={onSubmit} className="h-full rounded-3xl border border-white/10 bg-card p-6 md:p-8 space-y-4">
      <div>
        <h3 className="font-display text-2xl font-extrabold">Enquire About a Program</h3>
        <p className="mt-1 text-sm text-muted-foreground">Share your details — our team will reach out within one business day.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input required className={field} placeholder="Full Name *" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} maxLength={100} />
        <input required className={field} placeholder="Phone Number *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} type="tel" />
      </div>
      <input required className={field} placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} type="email" />
      <select required className={field} value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}>
        <option value="">Interested Program *</option>
        {PROGRAMS.map((p) => <option key={p} value={p} className="bg-navy-deep">{p}</option>)}
      </select>
      <textarea className={field} placeholder="Message (optional)" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
      <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full btn-cta px-6 py-3.5 text-sm font-semibold disabled:opacity-60 disabled:pointer-events-none">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}

export default function Contact() {
  const s = useSettings();
  return (
    <section id="contact" className="relative py-24 md:py-32 px-5">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-black">{s("section_contact_heading", "Get in Touch")}</h2>
          </div>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-stretch">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-card p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary shrink-0"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Address</div>
                  <p className="mt-1 leading-relaxed">Office No 23, 3rd Floor, B Wing, City Vista Downtown, Fountain Road, Kharadi, Pune - 411014</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary shrink-0"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                  <a href={`tel:${PHONE}`} className="mt-1 block font-semibold hover:text-primary transition-colors">{PHONE_DISPLAY}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary shrink-0"><Sparkles className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Business Hours</div>
                  <p className="mt-1">Open today <span className="text-primary font-semibold">09:00 am – 05:00 pm</span></p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full btn-cta px-5 py-2.5 text-sm font-semibold">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href="https://www.facebook.com/ExpertAction.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors">
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 min-h-[220px]">
                <iframe
                  title="ExpertAction location"
                  src="https://www.google.com/maps?q=City+Vista+Downtown+Kharadi+Pune&output=embed"
                  className="h-[220px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}