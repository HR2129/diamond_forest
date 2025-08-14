"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { ChevronRight, Home, Play, ChevronDown, Check } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import ringsData from "@/data/rings.json"
import { motion, AnimatePresence } from "framer-motion"

// Simple Button component to replace shadcn/ui
function Button({ children, className = "", variant = "default", ...props }) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors"
  const variantClasses = {
    default: "bg-black text-black hover:bg-gray-800",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Add this at the very beginning of the component, right after the imports
console.log("🔧 ProductDetail module loaded")
console.log("📊 Rings data available:", ringsData?.length || 0, "products")

// Helper function to get product by slug
function getProductBySlug(slug) {
  console.log("🔍 Looking for product with slug:", slug)
  console.log(
    "📊 Available products:",
    ringsData.map((r) => ({ id: r.id, name: r.name, slug: r.slug })),
  )

  // Try to find by slug first
  let product = ringsData.find((ring) => ring.slug === slug)

  // If not found by slug, try to find by ID (in case someone uses numeric ID)
  if (!product && !isNaN(Number(slug))) {
    console.log("🔍 Slug is numeric, trying to find by ID:", Number(slug))
    product = ringsData.find((ring) => ring.id === Number(slug))
  }

  console.log("✅ Found product:", product ? product.name : "NOT FOUND")
  return product
}

// Helper to get image based on selected shape & metal
function getImage(ring, shape, metal) {
  if (Array.isArray(ring.images)) {
    const found = ring.images.find((img) => img.shape === shape && img.metal === metal)
    if (found) return found.url

    // Fallback: try to find by shape only
    const shapeMatch = ring.images.find((img) => img.shape === shape)
    if (shapeMatch) return shapeMatch.url

    // Fallback: try to find by metal only
    const metalMatch = ring.images.find((img) => img.metal === metal)
    if (metalMatch) return metalMatch.url

    // Final fallback: return first image
    return ring.images[0]?.url
  }
  return "/placeholder.svg?height=600&width=600"
}

function getThumbnail(ring, shape, metal) {
  if (Array.isArray(ring.images)) {
    const found = ring.images.find((img) => img.shape === shape && img.metal === metal)
    if (found) return found.thumbnail || found.url

    // Fallback: return first thumbnail
    return ring.images[0]?.thumbnail || ring.images[0]?.url
  }
  return "/placeholder.svg?height=100&width=100"
}

function getAvailableShapes(ring) {
  if (Array.isArray(ring.images)) {
    return [...new Set(ring.images.map((img) => img.shape))]
  }
  return []
}

function getAvailableMetals(ring) {
  if (Array.isArray(ring.metals)) {
    return ring.metals
  }
  return []
}

// Shape icons mapping
const shapeIcons = {
  round: "●",
  princess: "◆",
  emerald: "▭",
  asscher: "◇",
  radiant: "◈",
  oval: "○",
  pear: "◐",
  marquise: "◊",
  heart: "♡",
  cushion: "◘",
}

// Metal color mapping
const metalColors = {
  "yellow gold": "#FFD700",
  "white gold": "#E8E8E8",
  "rose gold": "#E8B4A0",
  platinum: "#E5E4E2",
  silver: "#C0C0C0",
}

// Add this inside the ProductDetail function, right at the start
export default function ProductDetail({ slug }) {
  console.log("🚀 ProductDetail component mounted with slug:", slug)
  console.log("📍 Current pathname:", typeof window !== "undefined" ? window.location.pathname : "SSR")
  console.log("📍 Current search params:", typeof window !== "undefined" ? window.location.search : "SSR")

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const product = getProductBySlug(slug)

  const [selectedCombinationId, setSelectedCombinationId] = useState("")
  const [selectedCarat, setSelectedCarat] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
 



  // Memoize the combinations calculation to prevent infinite loops
  const allCombinations = useMemo(() => {
    if (!product) return []

    const shapes = getAvailableShapes(product)
    const metals = getAvailableMetals(product)
    const combinations = []

    for (const shape of shapes) {
      for (const metal of metals) {
        const image = getImage(product, shape, metal.value)
        const thumbnail = getThumbnail(product, shape, metal.value)
        combinations.push({
          shape,
          metal: metal.value,
          metalName: metal.name,
          image,
          thumbnail,
          id: `${shape}-${metal.value}`,
          // Each combination can have different pricing/data
          price: product.price + (metal.value === "platinum" ? 500 : 0), // Example: platinum costs more
          originalPrice: product.originalPrice + (metal.value === "platinum" ? 600 : 0),
          sku: `${product.sku}-${shape.toUpperCase()}-${metal.value.toUpperCase().replace(" ", "")}`,
          shipsIn: metal.value === "platinum" ? "4-6 weeks" : product.shipsIn, // Platinum takes longer
        })
      }
    }

    return combinations
  }, [product])

  // Get the selected combination object
  const selectedCombination = useMemo(() => {
    return allCombinations.find((combo) => combo.id === selectedCombinationId) || allCombinations[0]
  }, [allCombinations, selectedCombinationId])

  // Get all images for the current combination (for thumbnails)
  const currentCombinationImages = useMemo(() => {
    if (!product || !selectedCombination) return []

    const filtered = product.images.filter(
      (img) => img.shape === selectedCombination.shape && img.metal === selectedCombination.metal,
    )

    // If no specific images for this combination, show all images
    return filtered.length > 0
      ? filtered
      : [{ url: selectedCombination.image, thumbnail: selectedCombination.thumbnail }]
  }, [product, selectedCombination])

  // Function to update URL with current selections
  const updateURL = (shape, metal, carat) => {
    const params = new URLSearchParams()
    params.set("shape", shape)
    params.set("metal", metal)
    if (carat) {
      params.set("carat", carat)
    }

    // Update URL without causing a page reload
    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl)
  }

  // Initialize selections from URL params or defaults
  useEffect(() => {
    if (product && allCombinations.length > 0) {
      const shapeFromUrl = searchParams.get("shape")
      const metalFromUrl = searchParams.get("metal")
      const caratFromUrl = searchParams.get("carat")

      // Find the matching combination or use the first one
      let selectedComboId = allCombinations[0].id
      if (shapeFromUrl && metalFromUrl) {
        const foundCombo = allCombinations.find((combo) => combo.shape === shapeFromUrl && combo.metal === metalFromUrl)
        if (foundCombo) selectedComboId = foundCombo.id
      }

      setSelectedCombinationId(selectedComboId)
      setSelectedCarat(caratFromUrl || product.carats?.[0] || "")

      // If URL doesn't have params, update it with current selection
      if (!shapeFromUrl || !metalFromUrl) {
        const combo = allCombinations.find((c) => c.id === selectedComboId) || allCombinations[0]
        updateURL(combo.shape, combo.metal, caratFromUrl || product.carats?.[0] || "")
      }
    }
  }, [product, allCombinations, searchParams])



  if (!product || !selectedCombination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              <strong>Slug:</strong> {slug}
            </p>
            <p>
              <strong>Available products:</strong>
            </p>
            <ul className="list-disc list-inside">
              {ringsData.map((r) => (
                <li key={r.id}>
                  ID: {r.id}, Slug: {r.slug}, Name: {r.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const handleCombinationSelect = (combo) => {
    setSelectedCombinationId(combo.id)
    setCurrentImageIndex(0) // Reset to first image

    // Update URL with new combination
    updateURL(combo.shape, combo.metal, selectedCarat)
  }

  const handleCaratSelect = (carat) => {
    setSelectedCarat(carat)

    // Update URL with new carat
    if (selectedCombination) {
      updateURL(selectedCombination.shape, selectedCombination.metal, carat)
    }
  }

  return (
    <div className="min-h-screen bg-white py-40 text-black">
      {/* Debug Info */}
      {/* <div className="bg-yellow-100 p-2 text-xs">
        <strong>Debug:</strong> Slug: {slug} | Product: {product?.name} | Combinations: {allCombinations.length}
      </div> */}

      {/* Breadcrumb */}
      <div className=" py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-black">
            <button
              className="hover:text-black cursor-pointer flex items-center gap-1"
              onClick={() => router.push("/")}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
            <button className="hover:text-black cursor-pointer" onClick={() => router.push("/rings")}>
              Rings
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
            <span className="text-black font-medium">
              {product.name} Lab Grown Diamonds Bracelet - {selectedCombination.shape} {selectedCombination.metalName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div
       
        className="max-w-7xl mx-auto overflow-y-auto scrollbar-hide text-black"
        style={{ height: "calc(100vh - 80px)", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="grid grid-cols-12 gap-8 p-6">
          {/* Left Side - Product Images */}
          <div  className="col-span-7 h-fit">
            <div className="grid grid-cols-12 gap-4">
              {/* Main Image */}
              <div className="col-span-12">
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={currentCombinationImages[currentImageIndex]?.url || selectedCombination.image}
                    alt={`${product.name} - ${selectedCombination.shape} ${selectedCombination.metalName}`}
                    className="w-full h-full object-contain transition-opacity duration-500"
                  />
                </div>
                <div className="text-center mt-4 text-sm text-black">
                  {selectedCombination.shape} {selectedCombination.metalName} - {selectedCarat} Total Carat
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div  className="col-span-5">
            <div className="space-y-8">
              {/* Product Title and Price */}
              <div>
                <h1 className="text-4xl font-extrabold text-black">Emerald Bracelet</h1>
                <div className="text-3xl font-bold text-black mt-2">$2350.00</div>
                <div className="mt-4">
                  <button className="bg-gold-700 text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-800 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Metal Type */}
              <div>
                <h3 className="font-medium text-black mb-2">Metal Type</h3>
                <div className="flex space-x-2">
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                  <div className="w-16 h-6 bg-yellow-400 rounded"></div>
                  <div className="w-16 h-6 bg-red-300 rounded"></div>
                </div>
                <div className="flex space-x-2 mt-1 text-sm text-black">
                  <span>White Gold</span>
                  <span>Yellow Gold</span>
                  <span>Rose Gold</span>
                </div>
              </div>

              {/* Shape */}
              <div>
                <h3 className="font-medium text-black mb-2">Shape</h3>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">●</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">◆</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">▭</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">◇</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">◈</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">○</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">◐</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">◊</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">♡</div>
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-white">◘</div>
                </div>
                <div className="flex space-x-2 mt-1 text-sm text-black">
                  <span>Round</span>
                  <span>Princess</span>
                  <span>Emerald</span>
                  <span>Asscher</span>
                  <span>Radiant</span>
                  <span>Oval</span>
                  <span>Pear</span>
                  <span>Marquise</span>
                  <span>Heart</span>
                  <span>Cushion</span>
                </div>
              </div>

              {/* Carat Weight */}
              <div>
                <h3 className="font-medium text-black mb-2">Carat Weight</h3>
                <div className="flex space-x-2">
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">¼</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">½</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">¾</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">1</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">1½</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">2</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">2½</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">3</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">3½</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">4</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">4½</button>
                  <button className="w-10 h-10 bg-white rounded flex items-center justify-center text-black">→</button>
                </div>
              </div>

              {/* Diamond Quality */}
              <div>
                <h3 className="font-medium text-black mb-2">Diamond Quality</h3>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white rounded text-black">Best - D/VVS1</button>
                  <button className="px-4 py-2 bg-white rounded text-black">Better - E/VVS1</button>
                  <button className="px-4 py-2 bg-white rounded text-black">Good - F/VS2+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Details Section */}
        <div className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-800">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Description</h2>
            <p className="text-black">
              Revel in the stunning elegance of this exquisite emerald-shaped bracelet. Timeless and versatile, it infuses your style
              with a luxurious sparkle that transitions seamlessly from day to night. Whether you choose to enhance your ensemble
              with its unparalleled brilliance or wear it solo, it is sure to make a statement.
            </p>
          </div>
          <div>
  <h2 className="text-xl font-semibold text-gray-100 mb-4">Details</h2>
  <table className="w-full text-left border-collapse text-black">
    <tbody>
      <tr>
        <td className="border p-2 border-gray-700">SKU</td>
        <td className="border p-2 border-gray-700">206Q-ER-OV-YG-14</td>
        <td className="border p-2 border-gray-700">Stone</td>
        <td className="border p-2 border-gray-700">Lab grown - CVD</td>
      </tr>
      <tr>
        <td className="border p-2 border-gray-700">Gender</td>
        <td className="border p-2 border-gray-700">Women</td>
        <td className="border p-2 border-gray-700">Shape</td>
        <td className="border p-2 border-gray-700">Emerald</td>
      </tr>
      <tr>
        <td className="border p-2 border-gray-700">Style</td>
        <td className="border p-2 border-gray-700">Tennis Bracelet</td>
        <td className="border p-2 border-gray-700">Color</td>
        <td className="border p-2 border-gray-700">F</td>
      </tr>
      <tr>
        <td className="border p-2 border-gray-700">Carat</td>
        <td className="border p-2 border-gray-700">2 CTW</td>
        <td className="border p-2 border-gray-700">Clarity</td>
        <td className="border p-2 border-gray-700">VVS2</td>
      </tr>
      <tr>
        <td className="border p-2 border-gray-700">Metal</td>
        <td className="border p-2 border-gray-700">14k white gold</td>
        <td className="border p-2 border-gray-700">Cut</td>
        <td className="border p-2 border-gray-700">Excellent</td>
      </tr>
      <tr>
        <td className="border p-2 border-gray-700">Back type</td>
        <td className="border p-2 border-gray-700">Guardian</td>
        <td className="border p-2 border-gray-700">Count</td>
        <td className="border p-2 border-gray-700">30</td>
      </tr>
    </tbody>
  </table>
</div>
        </div>

        {/* Luxury Image Gallery Section */}
        <div className="max-w-7xl mx-auto px-6 p-16 text-center border-t border-gray-800 ">
          <h3 className="text-2xl font-bold text-gold-300 mb-6">Experience the Elegance</h3>
          <div className="grid grid-cols-3 gap-6">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-lg shadow-xl"
              >
                <img
                  src="/placeholder.svg?height=300&width=300&text=Luxury+1"
                  alt="Luxury Moment 1"
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="overflow-hidden rounded-lg shadow-xl"
              >
                <img
                  src="/placeholder.svg?height=300&width=300&text=Luxury+2"
                  alt="Luxury Moment 2"
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="overflow-hidden rounded-lg shadow-xl"
              >
                <img
                  src="/placeholder.svg?height=300&width=300&text=Luxury+3"
                  alt="Luxury Moment 3"
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-black mt-6">Indulge in the timeless beauty of our curated collection.</p>
        </div>
      </div>

      {/* <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .bg-gold-700 { background-color: #FFD700; }
        .bg-gold-800 { background-color: #DAA520; }
        .text-gold-300 { color: #FFD700; }
        .hover\:bg-gold-800:hover { background-color: #DAA520; }
      `}</style> */}
    </div>
  )
}