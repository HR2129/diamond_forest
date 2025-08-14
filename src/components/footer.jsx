import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#8B8B6B] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Meet Brilliance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Brilliance Reviews
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Free Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  30 Day Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Low Price Guarantee
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Lifetime Warranty
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Affirm Financing
                </Link>
              </li>
            </ul>
          </div>

          {/* Rings & Jewelry Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rings & Jewelry</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Engagement Rings
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Create Your Own Ring
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Wedding Rings
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Lab Diamond Studs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Custom Rings
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Recently Purchased
                </Link>
              </li>
            </ul>
          </div>

          {/* Diamonds Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Diamonds</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Lab Grown Diamonds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Loose Diamonds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Wholesale Diamonds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  GIA Diamonds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white hover:text-gray-200 transition-colors">
                  Diamond Education
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-white">Copyright 2025</p>
        </div>
      </div>
    </footer>
  )
}
