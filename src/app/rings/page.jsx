import JewelryCategory from "@/components/jewelry-category"
import ringsData from "@/data/rings.json"

export default function RingsPage() {
  return <JewelryCategory category="rings" data={ringsData} />
}
