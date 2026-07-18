import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/components/sections/Contact";

export const Route = createFileRoute("/_layout/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ExpertAction® Trading Academy" },
      { name: "description", content: "Get in touch with ExpertAction Price Action Trading Academy in Kharadi, Pune. Call, WhatsApp, or send an enquiry." },
    ],
  }),
  component: Contact,
});