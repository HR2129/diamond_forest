import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 mt-16">
        <img
          src="/home.jpg"
          alt="Luxury jewelry on natural branches"
          className="object-cover"
        />
        {/* <Image
          src="/hero-jewelry.png"
          alt="Luxury jewelry on natural branches"
          fill
          className="object-cover"
          priority
        /> */}
      </div>

      {/* Hero Content */}
      {/* <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-gray-700 max-w-2xl px-8">
          <h1 className="text-5xl md:text-6xl font-light tracking-[0.2em] mb-4">DISCOVER</h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.1em] text-gray-600">the luxury of the nature</p>
        </div>
      </div> */}
    </section>
  )
}
