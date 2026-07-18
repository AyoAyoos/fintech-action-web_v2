import { createFileRoute } from "@tanstack/react-router";
import Gallery from "@/components/sections/Gallery";

export const Route = createFileRoute("/_layout/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ExpertAction® Trading Academy" },
      { name: "description", content: "Photos from ExpertAction's training sessions, workshops, and student milestones in Pune." },
    ],
  }),
  component: Gallery,
});