import { Categories } from "@/components/categories"
import EngagementRingGuide from "@/components/engagement-ring-guide"
import HeroSection from "@/components/hero-section"
import HexagonTrio from "@/components/hexagon-trio"

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <HexagonTrio/> */}
      <Categories/>
      <EngagementRingGuide/>
    </>
  )
}
