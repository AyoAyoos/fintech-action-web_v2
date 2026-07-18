import GlareHover from "../components/ui/GlareHover";

export default function CTAButton({ children }: { children: React.ReactNode }) {
  return (
    <GlareHover
  width="max-content" /* Or "fit-content" to prevent horizontal stretching */
  height="auto"
  background="transparent"
  borderColor="transparent"
  borderRadius="9999px"
  glareColor="#ffffff"
  glareOpacity={0.35}
  transitionDuration={700}
  style={{ display: "inline-block" }} /* Change from block to inline-block */
>
  {children}
</GlareHover>
  );
}
