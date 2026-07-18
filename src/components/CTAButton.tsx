import { ReactNode } from "react";
import GlareHover from "@/components/ui/GlareHover";

type CTAButtonProps = {
  children: ReactNode;
};

export default function CTAButton({ children }: CTAButtonProps) {
  return (
    <GlareHover
      borderRadius="9999px"
      glareColor="#ffffff"
      glareOpacity={0.35}
      transitionDuration={700}
    >
      {children}
    </GlareHover>
  );
}