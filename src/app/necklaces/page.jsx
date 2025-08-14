import JewelryCategory from "@/components/jewelry-category"
import necklacesData from "@/data/necklaces.json"

export default function NecklacesPage() {
  return <JewelryCategory category="necklaces" data={necklacesData} />
}
