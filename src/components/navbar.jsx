"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Home, User, Heart, ShoppingBag, Search } from "lucide-react"

const BEIGE_LIGHT = "#f7f4ed"
const BEIGE_ACCENT = "#f3e8d7"
const BORDER_LIGHT = "#e7e5e4"
const TEXT_LIGHT = "#432f1e"
const BRAND_BROWN = "#835d2d"
const TOPBAR_HEIGHT = 72

const dropdownData = {
  JEWELRY: {
    categories: [
      { name: "Rings", items: ["Fashion", "Gemstone", "Gold", "High Jewelry", "Customer Favorites"] },
      { name: "Earrings", items: ["Studs", "Hoops", "Fashion", "Jackets", "Gemstone", "Gold", "High Jewelry", "Customer Favorites"] },
      { name: "Necklaces", items: ["Tennis", "Pendants", "Fashion", "Gemstone", "Gold", "High Jewelry", "Customer Favorites"] },
      { name: "Bracelets", items: ["Tennis", "Fashion", "Bangles", "Anklets", "Gemstone", "Gold", "High Jewelry", "Customer Favorites"] },
      { name: "Men's", items: ["Rings", "Earrings", "Necklaces", "Bracelets", "Cufflinks"] },
      { name: "Special Buys", items: [] },
    ],
  },
  DIAMONDS: {
    sections: [
      { name: "Shop by Shape", items: ["Round", "Pear", "Princess", "Emerald", "Oval", "Asscher", "Cushion", "Marquise", "Radiant", "Heart", "Elongated Cushion"] },
      { name: "Design Your Ring", items: ["Start with a Diamond", "Start with an Aether Diamond"] },
      { name: "Diamond Education", items: ["Learn About the 4Cs", "Learn About the Diamond Shapes", "Learn About Lab Grown Diamonds", "How Lab Created Diamonds are Made", "Lab Created Diamonds vs Mined Diamonds", "Moissanite vs Lab Grown Diamonds", "Mined Diamonds", "Conflict-Free Diamonds FAQs", "Lab Grown Diamond FAQs"] },
    ],
  },
  WEDDINGS: {
    categories: [
      { name: "Women", items: ["Wedding and Anniversary", "Eternity", "3/4 Eternity", "Enhancers", "Curve Bands", "Open Bands", "Design Your Stack", "Customer Favorites"] },
      { name: "Shop by Shape", items: ["Round", "Pear", "Princess", "Emerald", "Oval", "Asscher", "Cushion", "Marquise", "Radiant", "Heart"] },
      { name: "Shop by Metal", items: ["Yellow Gold", "White Gold", "Rose Gold", "Platinum"] },
      { name: "Men", items: ["Gold", "Wedding", "Customer Favorites"] },
      { name: "Gemstone", items: [] },
    ],
  },
  // CUSTOM: {
  //   style: [
  //     "Stud Earrings", "Drop Earrings", "Hoop Earrings", "Chandelier Earrings", "Huggie Earrings", "Climber Earrings",
  //   ],
  //   occasion: ["Daily Wear Earrings", "Bridal Earrings", "Evening Earrings", "Statement Earrings"],
  //   metalType: ["White Gold Earrings", "Yellow Gold Earrings", "Rose Gold Earrings", "Platinum Earrings", "Mixed Metal Earrings"],
  //   settingType: ["Prong Setting", "Bezel Setting", "Pave Setting", "Channel Setting"],
  // },
}

export default function Navbar() {
  const [showTopBar, setShowTopBar] = useState(true)

  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownTimeout = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY

      // Show top bar when scrolling up, hide when scrolling down
      if (y > lastScrollY.current) {
        setShowTopBar(false)
      } else {
        setShowTopBar(true)
      }
      lastScrollY.current = y
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dropdown handlers
  const handleMouseEnter = (category) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(category)
  }
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  // Dropdown content
  const renderDropdownContent = (category) => {
    const data = category ? dropdownData[category] : null
    if (!data) return null

    if (category === "JEWELRY") {
      return (
        <div className="grid grid-cols-6 gap-4">
          {data.categories.map((cat, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-2 text-sm tracking-wider" style={{ color: TEXT_LIGHT }}>{cat.name}</h4>
              <ul className="space-y-1">
                {cat.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${category}/${cat.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm transition-colors"
                      style={{ color: BRAND_BROWN }}
                    >{item}</Link>
                  </li>
                ))}
              </ul>
              {cat.items.length > 0 && (
                <button className="mt-2 text-sm border p-2" style={{ color: BRAND_BROWN }}>VIEW ALL</button>
              )}
            </div>
          ))}
        </div>
      )
    }

    if (category === "DIAMONDS") {
      return (
        <div className="grid grid-cols-3 gap-4">
          {data.sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-2 text-sm tracking-wider" style={{ color: TEXT_LIGHT }}>{section.name}</h4>
              <ul className="space-y-1">
                {section.name === "Design Your Ring" ? (
                  <>
                    <li>
                      <button className="text-sm transition-colors" style={{ color: BRAND_BROWN }}>Start with a Diamond</button>
                    </li>
                    <li>
                      <button className="text-sm transition-colors" style={{ color: BRAND_BROWN }}>Start with an Aether Diamond</button>
                    </li>
                  </>
                ) : section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${category}/${section.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm transition-colors"
                      style={{ color: BRAND_BROWN }}
                    >{item}</Link>
                  </li>
                ))}
              </ul>
              {section.name !== "Design Your Ring" && section.items.length > 0 && (
                <button className="mt-2 text-sm border p-2" style={{ color: BRAND_BROWN }}>VIEW ALL</button>
              )}
            </div>
          ))}
        </div>
      )
    }

    if (category === "WEDDINGS") {
      return (
        <div className="grid grid-cols-5 gap-4">
          {data.categories.map((cat, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-2 text-sm tracking-wider" style={{ color: TEXT_LIGHT }}>{cat.name}</h4>
              <ul className="space-y-1">
                {cat.name === "Shop by Metal" ? (
                  cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-3 h-3 mr-2" style={{ backgroundColor: idx === 0 ? "#FFD700" : idx === 1 ? "#E8ECEF" : idx === 2 ? "#FADADD" : "#E5E4E2" }}></span>
                      <Link
                        href={`/${category}/${cat.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm transition-colors"
                        style={{ color: BRAND_BROWN }}
                      >{item}</Link>
                    </li>
                  ))
                ) : cat.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/${category}/${cat.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm transition-colors"
                      style={{ color: BRAND_BROWN }}
                    >{item}</Link>
                  </li>
                ))}
              </ul>
              {cat.items.length > 0 && (
                <button className="mt-2 text-sm border p-2" style={{ color: BRAND_BROWN }}>VIEW ALL</button>
              )}
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  // Always fixed positioning
  const headerPosition = "fixed"
  const navPosition = "fixed"


  // Top bar styling
  const topBarBg = BEIGE_LIGHT
  const topBarColor = TEXT_LIGHT
  const topBarBorder = `1px solid ${BORDER_LIGHT}`
  const topBarShadow = "0 2px 16px 0 rgba(0,0,0,0.06)"

  // Lower nav styling
  const lowerNavBg = "rgba(255,248,238,0.97)"
  const lowerNavBorder = `1px solid ${BORDER_LIGHT}`
  const lowerNavShadow = "0 2px 16px 0 rgba(0,0,0,0.06)"
  const lowerNavFilter = "blur(12px)"

  // Dropdown
  const showDropdown = !!activeDropdown
  const DROPDOWN_Z = 110
  const dropdownTop = showTopBar ? `${TOPBAR_HEIGHT * 2}px` : `${TOPBAR_HEIGHT}px`

  return (
    <>
      {/* Reserve space for navbar */}
      <div style={{ height: TOPBAR_HEIGHT }} />
      <header
        className="w-full z-[100] pointer-events-auto bg-transparent"
        style={{ position: headerPosition, top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        {/* Top Bar */}
        <div
          className={`
            top-0 left-0 w-full z-[100] transition-all duration-400
            ${showTopBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
          `}
          style={{
            position: "fixed",
            height: TOPBAR_HEIGHT,
            background: topBarBg,
            boxShadow: topBarShadow,
            borderBottom: topBarBorder,
            color: topBarColor,
            transition: "transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="hover:text-orange-900 transition-colors" style={{ color: topBarColor }}>
                <Home className="w-6 h-6" />
              </Link>
            </div>
            <Link href="/" className="text-2xl font-light tracking-wider" style={{ color: topBarColor, fontFamily: "serif" }}>
              DIAMOND FOREST
            </Link>
            <div className="flex items-center space-x-4">
              <button className="hover:text-orange-900 transition-colors" style={{ color: topBarColor }}>
                <User className="w-6 h-6" />
              </button>
              <button className="hover:text-orange-900 transition-colors" style={{ color: topBarColor }}>
                <Heart className="w-6 h-6" />
              </button>
              <button className="hover:text-orange-900 transition-colors" style={{ color: topBarColor }}>
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Lower Navbar */}
        <nav
          className="w-full z-[101] transition-all duration-300"
          style={{
            position: navPosition,
            top: showTopBar ? `${TOPBAR_HEIGHT}px` : "0px",
            background: lowerNavBg,
            boxShadow: lowerNavShadow,
            borderBottom: lowerNavBorder,
            backdropFilter: lowerNavFilter,
            transition: "all 0.3s",
            left: 0,
            right: 0,
            zIndex: 101
          }}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              {!showTopBar && (
                <Link href="/" className="text-xl font-light tracking-wider mr-20" style={{ color: BRAND_BROWN, fontFamily: "serif" }}>
                  DF
                </Link>
              )}
              <div className="flex space-x-20">
                {["JEWELRY", "DIAMONDS", "WEDDINGS"].map((cat) => (
                  <div
                    key={cat}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(cat)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${cat}`}
                      className="text-sm font-medium transition-colors"
                      style={{ color: BRAND_BROWN }}
                    >{cat.toUpperCase()}</Link>
                  </div>
                ))}
                <Link
                  href="/custom"
                  className="text-sm pt-0.5 font-medium transition-colors"
                  style={{ color: BRAND_BROWN }}
                >CUSTOM</Link>
              </div>
            </div>
            {/* Search */}
            <div className="flex items-center rounded-full px-4 py-2"
              style={{
                background: BEIGE_ACCENT,
                border: "1px solid",
                borderColor: BORDER_LIGHT
              }}
            >
              <Search className="w-4 h-4 mr-2" style={{ color: BRAND_BROWN }} />
              <input
                type="text"
                placeholder="SEARCH"
                className="bg-transparent text-sm outline-none"
                style={{
                  color: TEXT_LIGHT,
                }}
              />
            </div>
          </div>
        </nav>
        {/* Dropdown */}
        {showDropdown && (
          <div
            className="fixed left-0 w-full shadow-lg border-t transition-all duration-300 opacity-100 visible pointer-events-auto"
            style={{
              top: dropdownTop,
              background: "rgba(255,248,238,0.97)",
              backdropFilter: "blur(12px)",
              borderColor: BORDER_LIGHT,
              left: 0,
              right: 0,
              zIndex: DROPDOWN_Z
            }}
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {renderDropdownContent(activeDropdown)}
            </div>
          </div>
        )}
      </header>
    </>
  )
}