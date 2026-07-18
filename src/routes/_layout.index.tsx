import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/About";
import Courses from "@/components/sections/Courses";
import Gallery from "@/components/sections/Gallery";
import WhyUs from "@/components/sections/WhyUs";
import Contact from "@/components/sections/Contact";

export const Route = createFileRoute("/_layout/")({
  head: () => ({
    meta: [
      { title: "ExpertAction® — Price Action Trading Academy | Pune" },
      { name: "description", content: "Learn Price Action Trading with copyright-registered 11 Entry Setups from Mangesh Waghmare (NISM-Certified). 1,500+ students trained in Pune." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Gallery />
      <WhyUs />
      <Contact />
    </>
  );
}