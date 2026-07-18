import { createFileRoute } from "@tanstack/react-router";
import About from "@/components/sections/About";
import WhyUs from "@/components/sections/WhyUs";

export const Route = createFileRoute("/_layout/about")({
  head: () => ({
    meta: [
      { title: "About Us — ExpertAction® Trading Academy" },
      { name: "description", content: "Founded in 2019 by NISM-Certified Research Analyst Mangesh Waghmare. Learn about ExpertAction's mission and credentials." },
    ],
  }),
  component: () => (
    <>
      <About />
      <WhyUs />
    </>
  ),
});