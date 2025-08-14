import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-stone-300">

      {/* Top Section - Contact Information */}
      <div className="pt-44 pb-8 ">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-4xl font-light text-center text-gray-800 mb-5 tracking-wide">Reach out to us</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-5">
            {/* Senior Partner */}
            <div className="text-center bg-white p-5 rounded-2xl">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Senior Partner</h3>
              <p className="text-gray-600">Kavita Batra - +1 (646) 753 3092</p>
            </div>

            {/* Enquiry */}
            <div className="text-center bg-white p-5 rounded-2xl">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Enquiry</h3>
              <p className="text-gray-600 mb-2">Kanu Verma +1 (917) 379-6816</p>
              <p className="text-gray-600">Ritu Chugh +1 (917) 385-2648</p>
            </div>

            {/* Career (HR) */}
            <div className="text-center bg-white p-5 rounded-2xl">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Career (HR)</h3>
              <p className="text-gray-600">Archana Rao - +91 72038 36358</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="text-center">
            <div className="w-full h-px bg-gray-800 mb-4"></div>
            <p className="text-sm text-gray-600 mb-6 tracking-wide">FOLLOW US ON SOCIAL MEDIA</p>
            <div className="flex justify-center gap-6">
              <button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                <Instagram className="h-5 w-5" />
              </button>
              <button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                <Facebook className="h-5 w-5" />
              </button>
              <button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                <Twitter className="h-5 w-5" />
              </button>
              <button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Contact Form with Nature Background */}
      <div
        className="relative py-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Mail ID"
                  className="px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  className="px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <textarea
                placeholder="Message"
                rows={6}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-none text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
              ></textarea>

              <div className="flex justify-center">
                <button className="px-12 py-3 cursor-pointer hover:scale-105 active:scale-95 rounded-xl bg-white text-gray-700 hover:bg-gray-50 font-medium tracking-wide border border-gray-300">
                  Submit
                </button>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}
