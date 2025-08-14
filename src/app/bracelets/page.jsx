import JewelryCategory from "@/components/jewelry-category"
import braceletsData from "@/data/bracelets.json"

export default function BraceletsPage() {
  return <JewelryCategory category="bracelets" data={braceletsData} />
}
