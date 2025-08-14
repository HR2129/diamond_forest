"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Search, Heart, ShoppingBag, User } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isJewelryDropdownOpen, setIsJewelryDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActiveTab = (path) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const getTabStyling = (path) => {
    const isActive = isActiveTab(path)
    return isActive
      ? "w-full px-12 py-3 bg-stone-600 text-white hover:bg-stone-400 rounded-none font-medium tracking-wide flex-1 max-w-xs"
      : "px-12 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-none font-medium tracking-wide flex-1 max-w-xs"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Upper Navbar - hides on scroll */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isScrolled ? "h-0 opacity-0" : "h-auto opacity-100"}`}
      >
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
          <Link
            href="/"
            className="text-2xl font-light tracking-[0.3em] text-gray-800 hover:text-gray-600 transition-colors"
          >
            DIAMOND FOREST
          </Link>
          <div className="flex items-center gap-6">
            <button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <Search className="h-5 w-5" />
            </button>
            <button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <Heart className="h-5 w-5" />
            </button>
            <button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button  variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <Link href="/signup">
                <User className="h-5 w-5" />
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Navbar - stays in place, no translation */}
      <div className="bg-white border-b border-gray-200 relative">
        <div className="flex items-center justify-between px-8 py-3 max-w-7xl mx-auto">
          <div className={`transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
            <Link href="/signup" className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
              DF
            </Link>
          </div>

          <div className="flex items-center gap-0 flex-1 justify-center max-w-4xl">
            <button  variant="ghost" className={getTabStyling("/")}>
              <Link href="/">HOME</Link>
            </button>

            <button
              variant="ghost"
              className={`${getTabStyling("/jewelry")} border-l border-r border-gray-300`}
              onMouseEnter={() => setIsJewelryDropdownOpen(true)}
              onMouseLeave={() => setIsJewelryDropdownOpen(false)}
            >
              JEWELRY
            </button>

            <button  variant="ghost" className={getTabStyling("/contact")}>
              <Link href="/contact">CONTACT US</Link>
            </button>
          </div>

          <div className="w-8"></div>
        </div>
      </div>

      {isJewelryDropdownOpen && (
        <div
          className="fixed left-0 right-0 top-[122px] z-40 max-w-7xl mx-auto"
          style={{ top: isScrolled ? "60px" : "120px" }}
          onMouseEnter={() => setIsJewelryDropdownOpen(true)}
          onMouseLeave={() => setIsJewelryDropdownOpen(false)}
        >
          <div className="grid grid-cols-4 gap-0 ">
            {/* Shop by Category */}
            <div className="bg-white text-black p-6">
              <h3 className="font-semibold mb-4 text-base">Shop by Category</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/rings"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Ring
                  </Link>
                </li>
                <li>
                  <Link
                    href="/earrings"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Earring
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bracelets"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Bracelet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pendants"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Pendant
                  </Link>
                </li>
                <li>
                  <Link
                    href="/necklaces"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Necklace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop by Shape */}
            <div className="bg-white text-black p-6">
              <h3 className="font-semibold mb-4 text-base">Shop by Shape</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Round
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Princess
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Oval
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Cushion
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Radiant
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="   hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Elongated Cushion
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Pear
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Emerald
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Asscher
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Marquise
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Heart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop by Metal */}
            <div className="bg-white text-black p-6">
              <h3 className="font-semibold mb-4 text-base">Shop by Metal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Yellow Gold
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    White Gold
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Rose Gold
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className=" hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Platinum
                  </Link>
                </li>
              </ul>
            </div>

            {/* Jewellery Guide */}
            <div className="bg-white text-black p-6">
              <h3 className="font-semibold mb-4 text-base">Jewellery Guide</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Engagement Ring Style
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="  hover:px-3 hover:py-2 hover:rounded block py-1 transition-all duration-200"
                  >
                    Find Your Ring Size
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
