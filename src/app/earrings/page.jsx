import JewelryCategory from "@/components/jewelry-category"
import earringsData from "@/data/earrings.json"

export default function EarringsPage() {
  return <JewelryCategory category="earrings" data={earringsData} />
}
