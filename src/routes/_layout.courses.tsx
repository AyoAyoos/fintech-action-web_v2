import { createFileRoute } from "@tanstack/react-router";
import Courses from "@/components/sections/Courses";

export const Route = createFileRoute("/_layout/courses")({
  head: () => ({
    meta: [
      { title: "Trading Programs — ExpertAction® Academy" },
      { name: "description", content: "Copyright-registered price action trading programs: Beginner, Advanced, and Professional Master tracks in Pune." },
    ],
  }),
  component: Courses,
});