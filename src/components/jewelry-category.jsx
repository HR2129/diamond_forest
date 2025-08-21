"use client"
import { useState, useEffect } from "react"
import { ChevronRight, Filter, ArrowUpDown, X, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Helper to get image based on selected shape & metal
function getImage(item, shape, metal) {
  if (Array.isArray(item.images)) {
    const found = item.images.find((img) => img.shape === shape && img.metal === metal)
    if (found) return found.url

    // Fallback: try to find by shape only
    const shapeMatch = item.images.find((img) => img.shape === shape)
    if (shapeMatch) return shapeMatch.url

    // Fallback: try to find by metal only
    const metalMatch = item.images.find((img) => img.metal === metal)
    if (metalMatch) return metalMatch.url

    // Final fallback: return first image
    return item.images[0]?.url
  }
  return item.image || "/placeholder.svg?height=200&width=200"
}

function getAvailableShapes(item) {
  if (Array.isArray(item.images)) {
    return [...new Set(item.images.map((img) => img.shape))]
  }
  return item.shapes || []
}

function getAvailableMetals(item) {
  if (Array.isArray(item.images)) {
    return [...new Set(item.images.map((img) => img.metal))]
  }
  return item.metals || []
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

// Dynamic model images for different rows
const modelImages = [
  "https://media.grownbrilliance.com/a2c5372a-e16a-4ea3-b361-da9fdc89a59f/https://images.grownbrilliance.com/general_images/catimages/category_shop_banner_2751734451523.jpg",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
]

const categoryConfig = {
  rings: {
    title: "Lab-Grown Diamond Rings",
    description:
      "Ready for whatever hand you prefer, we proudly offer a stunning collection of lab-grown diamond rings and bands for every occasion. Discover sparkling eternity bands, right hand rings, fashion bands, anniversary and stacking rings, each uniquely designed to express your style and values with elegance.",
    basePath: "/rings",
  },
  earrings: {
    title: "Lab-Grown Diamond Earrings",
    description:
      "Elevate your style with our exquisite collection of lab-grown diamond earrings. From classic studs to elegant drops, each piece is crafted to perfection with ethically sourced diamonds that sparkle with unmatched brilliance.",
    basePath: "/earrings",
  },
  bracelets: {
    title: "Lab-Grown Diamond Bracelets",
    description:
      "Adorn your wrist with our stunning collection of lab-grown diamond bracelets. From tennis bracelets to delicate chains, each piece combines timeless elegance with modern sustainability.",
    basePath: "/bracelets",
  },
  pendants: {
    title: "Lab-Grown Diamond Pendants",
    description:
      "Complete your look with our beautiful collection of lab-grown diamond pendants. Each pendant is designed to be a statement piece that reflects your personal style and values.",
    basePath: "/pendants",
  },
  necklaces: {
    title: "Lab-Grown Diamond Necklaces",
    description:
      "Make a statement with our luxurious collection of lab-grown diamond necklaces. From delicate chains to bold statement pieces, each necklace is crafted with the finest ethically sourced diamonds.",
    basePath: "/necklaces",
  },
}

export default function JewelryCategory({ category, data }) {
  const router = useRouter()
  const config = categoryConfig[category] || categoryConfig.rings

  const [selections, setSelections] = useState(() =>
    data.reduce((acc, item) => {
      const shapes = getAvailableShapes(item)
      const metals = getAvailableMetals(item)
      return {
        ...acc,
        [item.id]: {
          shape: shapes[0] || "",
          metal: metals[0] || "",
          carat: item.carats ? item.carats[0] : "",
        },
      }
    }, {}),
  )

  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    shapes: [],
    metals: [],
    stones: ["Diamond"], // Default to Diamond
    priceRange: [795, 22995],
    caratRange: [0, 10],
  })

  const [showSort, setShowSort] = useState(false)
  const [sortBy, setSortBy] = useState("Best Sellers")

  const sortOptions = ["Best Sellers", "Newest", "Price: Low to High", "Price: High to Low"]

  const applySorting = (items) => {
    const sortedItems = [...items]

    switch (sortBy) {
      case "Price: Low to High":
        return sortedItems.sort((a, b) => a.price - b.price)
      case "Price: High to Low":
        return sortedItems.sort((a, b) => b.price - a.price)
      case "Newest":
        return sortedItems.sort((a, b) => b.id - a.id) // Assuming higher ID = newer
      case "Best Sellers":
      default:
        return sortedItems // Keep original order for best sellers
    }
  }

  const handleSelect = (itemId, type, value, event) => {
    event?.stopPropagation() // Prevent navigation when selecting options
    setSelections((s) => ({
      ...s,
      [itemId]: { ...s[itemId], [type]: value },
    }))
  }

  const handleFilterChange = (filterCategory, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [filterCategory]: checked
        ? [...prev[filterCategory], value]
        : prev[filterCategory].filter((item) => item !== value),
    }))
  }

  const handleRangeChange = (filterCategory, values) => {
    setFilters((prev) => ({
      ...prev,
      [filterCategory]: values,
    }))
  }

  const resetFilters = () => {
    setFilters({
      shapes: [],
      metals: [],
      stones: ["Diamond"],
      priceRange: [795, 22995],
      caratRange: [0, 10],
    })
  }

  const applyFilters = (items) => {
    return items.filter((item) => {
      // Price filter
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false
      }

      // Shape filter
      if (filters.shapes.length > 0) {
        const itemShapes = getAvailableShapes(item)
        if (!filters.shapes.some((shape) => itemShapes.includes(shape))) {
          return false
        }
      }

      // Metal filter
      if (filters.metals.length > 0) {
        const itemMetals = getAvailableMetals(item)
        if (!filters.metals.some((metal) => itemMetals.includes(metal))) {
          return false
        }
      }

      return true
    })
  }

  const filteredAndSortedItems = applySorting(applyFilters(data))

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if clicking outside the dropdown areas
      if (!event.target.closest(".relative")) {
        setShowSort(false)
        setShowFilter(false)
      }
    }

    if (showSort || showFilter) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSort, showFilter])

  // Header Section Component
  const HeaderSection = () => {
    return (
      <div className="w-full bg-white border-b border-gray-200 py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900 cursor-pointer flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium capitalize">{category}</span>
          </div>

          {/* Title Section */}
          <div className="text-center mb-8">
            <div className="text-3xl text-gray-600 font-bold mb-2">{config.title}</div>
            <h1 className="text-sm font-light text-gray-900">{config.description}</h1>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">{filteredAndSortedItems.length} Items</div>
            <div className="flex items-center gap-6">
              <button
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowSort(!showSort)
                  }}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort</span>
                </button>

                {showSort && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSortBy(option)
                            setShowSort(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            sortBy === option ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Dropdown */}
        {showFilter && (
          <div className="absolute top-full left-0 right-0 bg-white border text-black border-gray-200 shadow-lg z-50">
            <div className="max-w-7xl mx-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Filter Options</h3>
                <div className="flex items-center gap-4">
                  <button onClick={resetFilters} className="text-sm text-gray-800 hover:text-gray-900">
                    RESET
                  </button>
                  <button onClick={() => setShowFilter(false)} className="text-gray-800 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-8">
                {/* Shape Filter */}
                <div>
                  <h4 className="font-medium mb-4">Shape</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(shapeIcons).map(([shape, icon]) => (
                      <button
                        key={shape}
                        onClick={() => handleFilterChange("shapes", shape, !filters.shapes.includes(shape))}
                        className={`w-12 h-12 rounded border-2 flex items-center justify-center text-lg transition-all ${
                          filters.shapes.includes(shape)
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Metal Filter */}
                <div>
                  <h4 className="font-medium mb-4">Metal</h4>
                  <div className="space-y-3">
                    {["Platinum", "Yellow Gold", "Rose Gold", "White Gold"].map((metal) => (
                      <label key={metal} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.metals.includes(metal.toLowerCase())}
                          onChange={(e) => handleFilterChange("metals", metal.toLowerCase(), e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{metal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stone Filter */}
                <div>
                  <h4 className="font-medium mb-4">Stone</h4>
                  <div className="space-y-3">
                    {["Diamond", "Color Diamond", "Gemstone"].map((stone) => (
                      <label key={stone} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.stones.includes(stone)}
                          onChange={(e) => handleFilterChange("stones", stone, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{stone}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="font-medium mb-4">Price</h4>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(e) =>
                          handleRangeChange("priceRange", [Number.parseInt(e.target.value), filters.priceRange[1]])
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          handleRangeChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Max"
                      />
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="50000"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleRangeChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Carat Filter */}
                <div>
                  <h4 className="font-medium mb-4">Carat</h4>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={filters.caratRange[0]}
                        onChange={(e) =>
                          handleRangeChange("caratRange", [Number.parseFloat(e.target.value), filters.caratRange[1]])
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Min"
                        step="0.1"
                      />
                      <input
                        type="number"
                        value={filters.caratRange[1]}
                        onChange={(e) =>
                          handleRangeChange("caratRange", [filters.caratRange[0], Number.parseFloat(e.target.value)])
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Max"
                        step="0.1"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={filters.caratRange[1]}
                      onChange={(e) =>
                        handleRangeChange("caratRange", [filters.caratRange[0], Number.parseFloat(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowFilter(false)}
                  className="px-8 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  VIEW {filteredAndSortedItems.length} DESIGNS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Card component
  const ItemCard = ({ item }) => {
    const sel = selections[item.id] || {}
    const shapes = getAvailableShapes(item)
    const metals = getAvailableMetals(item)
    const carats = item.carats || []
    const img = getImage(item, sel.shape, sel.metal)

    const itemSlug = item.slug || item.name.toLowerCase().replace(/\s+/g, "-")

    const handleCardClick = () => {
      // Pass current selections as URL parameters
      const params = new URLSearchParams({
        shape: sel.shape || "",
        metal: sel.metal || "",
        carat: sel.carat || "",
      })

      console.log("🔗 Navigating to product:", itemSlug)
      console.log("🔗 With params:", params.toString())

      // Navigate to category-specific product page
      router.push(`${config.basePath}/${itemSlug}?${params.toString()}`)
    }

    return (
      <div
        className="bg-white rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Item Image */}
        <div className="w-full aspect-square mb-6 flex items-center justify-center ">
          <img
            src={img || "/placeholder.svg?height=128&width=128"}
            alt={`${item.name} - ${sel.shape} ${sel.metal}`}
            className="object-contain transition-transform w-96 h-96 duration-300 hover:scale-105"
          />
        </div>

        {/* Item Name */}
        <div className="text-lg font-medium text-gray-900 mb-2 text-center">{item.name}</div>

        {/* Price */}
        <div className="text-xl font-semibold text-gray-900 mb-6">
          {typeof item.price === "number" ? (
            `$${item.price.toLocaleString()}`
          ) : (
            <span className="text-red-500">Price unavailable</span>
          )}
        </div>

        {/* Shape Selection */}
        {shapes.length > 0 && (
          <div className="w-full mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Shape</div>
              <div className="flex gap-2">
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
                      sel.shape === shape
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                    onClick={(e) => handleSelect(item.id, "shape", shape, e)}
                    title={shape}
                  >
                    {shapeIcons[shape.toLowerCase()] || "●"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Metal Selection */}
        {metals.length > 0 && (
          <div className="w-full mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Metal</div>
              <div className="flex gap-2">
                {metals.map((metal) => (
                  <button
                    key={metal}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      sel.metal === metal ? "border-gray-900 scale-110" : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{
                      backgroundColor: metalColors[metal.toLowerCase()] || "#E8E8E8",
                    }}
                    onClick={(e) => handleSelect(item.id, "metal", metal, e)}
                    title={metal}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Carat Selection */}
        {carats.length > 0 && (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Carat</div>
              <div className="flex gap-1 flex-wrap">
                {carats.map((carat) => (
                  <button
                    key={carat}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      sel.carat === carat
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                    onClick={(e) => handleSelect(item.id, "carat", carat, e)}
                  >
                    {carat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Helper to render pattern for spotlight rows (alternating the model photo position)
  const SpotlightRow = ({ products, modelFirst = false, modelImageIndex = 0 }) => {
    const currentModelImage = modelImages[modelImageIndex % modelImages.length]

    return (
      <div className="grid grid-cols-4 grid-rows-2 gap-8 min-h-[420px] ">
        {modelFirst ? (
          <>
            {/* Big model photo left - spans 2 columns and 2 rows */}
            <div className="row-span-2 col-span-2 col-start-1 row-start-1 flex items-center justify-center  shadow-lg overflow-hidden">
              <img
                src={currentModelImage || "/placeholder.svg"}
                alt="Model hand with jewelry"
                className="object-cover w-full h-full"
              />
            </div>
            {/* Products on the right - 2x2 grid */}
            <div className="col-span-1 row-span-1 col-start-3 row-start-1">
              {products[0] && <ItemCard item={products[0]} />}
            </div>
            <div className="col-span-1 row-span-1 col-start-4 row-start-1">
              {products[1] && <ItemCard item={products[1]} />}
            </div>
            <div className="col-span-1 row-span-1 col-start-3 row-start-2">
              {products[2] && <ItemCard item={products[2]} />}
            </div>
            <div className="col-span-1 row-span-1 col-start-4 row-start-2">
              {products[3] && <ItemCard item={products[3]} />}
            </div>
          </>
        ) : (
          <>
            {/* Products on the left - 2x2 grid */}
            <div className="col-span-1 row-span-1 col-start-1 row-start-1">
              {products[0] && <ItemCard item={products[0]} />}
            </div>
            <div className="col-span-1 row-span-1 col-start-2 row-start-1">
              {products[1] && <ItemCard item={products[1]} />}
            </div>
            <div className="col-span-1 row-span-1 col-start-1 row-start-2">
              {products[2] && <ItemCard item={products[2]} />}
            </div>
            <div className="col-span-1 row-span-1 col-start-2 row-start-2">
              {products[3] && <ItemCard item={products[3]} />}
            </div>
            {/* Big model photo right - spans 2 columns and 2 rows */}
            <div className="row-span-2 col-span-2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100  shadow-lg overflow-hidden col-start-3 row-start-1">
              <img
                src={currentModelImage || "/placeholder.svg"}
                alt="Model hand with jewelry"
                className="object-cover w-full h-full"
              />
            </div>
          </>
        )}
      </div>
    )
  }

  // 1st row: 4 products
  const row1 = filteredAndSortedItems.slice(0, 4)
  // 2nd-3rd rows combined: 4 products + large model image
  const row2Products = filteredAndSortedItems.slice(4, 8)
  // Additional rows repeat pattern
  const rest = filteredAndSortedItems.slice(8)

  // Render the rest of the items in a repeating pattern of:
  // 1 normal row (4 products), 1 spotlight row (4 products + large model image, alternating side)
  const restRows = []
  let restI = 0
  let alternate = false // Start with model on RIGHT (false), then alternate
  let modelImageIndex = 1 // Start with second model image

  while (restI < rest.length) {
    // Normal row (4 products)
    const normalRow = rest.slice(restI, restI + 4)
    if (normalRow.length) {
      restRows.push(
        <div key={`norm-${restI}`} className="grid grid-cols-4 gap-8 mb-12">
          {normalRow.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>,
      )
    }
    restI += 4

    // Spotlight row (4 products + model image)
    const spotlightProducts = rest.slice(restI, restI + 4)
    if (spotlightProducts.length) {
      alternate = !alternate // Alternate model position BEFORE each spotlight row
      restRows.push(
        <SpotlightRow
          key={`spot-${restI}`}
          products={spotlightProducts}
          modelFirst={alternate}
          modelImageIndex={modelImageIndex}
        />,
      )
      modelImageIndex++ // Use different model image for each spotlight row
    }
    restI += 4
  }

  return (
    <div className="w-full py-20 min-h-screen">
      {/* Header Section */}
      <HeaderSection />

      {/* Main Content */}
      <div className="py-20 px-2">
        <div className="flex flex-col gap-14">
          {/* 1st row - 4 products */}
          <div className="grid grid-cols-4 gap-8 mb-12">
            {row1.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          {/* 2nd row (spotlight) - 4 products + model image on right (start alternating) */}
          <SpotlightRow products={row2Products} modelFirst={false} modelImageIndex={0} />

          {/* Remaining rows */}
          {restRows}
        </div>
      </div>
    </div>
  )
}
