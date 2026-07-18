import GlareHover from "../components/ui/GlareHover";

export default function CTAButton({ children }: { children: React.ReactNode }) {
  return (
    <GlareHover
      width="max-content"
      height="auto"
      background="transparent"
      borderColor="transparent"
      borderRadius="9999px"
      glareColor="#ffffff"
      glareOpacity={0.35}
      transitionDuration={700}
      style={{ display: "inline-flex", maxWidth: "100%" }}
    >
      {children}
    </GlareHover>
  );
}
