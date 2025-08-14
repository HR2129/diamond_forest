import JewelryCategory from "@/components/jewelry-category"
import pendantsData from "@/data/pendants.json"

export default function PendantsPage() {
  return <JewelryCategory category="pendants" data={pendantsData} />
}
