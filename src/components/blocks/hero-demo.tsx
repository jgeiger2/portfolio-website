import { HeroWithMockup } from "@/components/ui/hero-with-mockup"

export function HeroDemo() {
  return (
    <HeroWithMockup
      title="James Geiger"
      description="Product Designer crafting accessible, digital experiences"
      primaryCta={{
        text: "View Projects",
        href: "/projects",
      }}
      secondaryCta={{
        text: "Get in Touch",
        href: "/contact",
      }}
      mockupImage={{
        alt: "James Geiger",
        width: 400,
        height: 400,
        src: "/images/5C9FFB1B-4FD1-43F6-8EC0-FC49222D4109_1_105_c.jpeg"
      }}
      className="bg-gradient-to-b from-[#0f1c2e] via-[#1a2740] to-[#2b174a]"
    />
  )
} 