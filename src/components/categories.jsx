"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Categories() {
  const collections = [
    { name: "EARRINGS", image: "/earring.jpg" },
    { name: "RINGS", image: "/ring.jpg" },
    { name: "NECKLACES", image: "/necklace.jpg" },
    { name: "BRACELETS", image: "/bracelet.jpg" },
    { name: "PENDANTS", image: "/bracelet.jpg" },
  ]

  return (
    <>
    <section className="h-[100vh] w-full flex items-center">
      <div className=" max-w-7xl mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">COLLECTIONS</h2>
            <div className="w-12 h-0.5 bg-gray-600 mx-auto"></div>
          </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[22rem] hover:shadow-2xl w-[15rem]  mb-3 overflow-hidden rounded-lg">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center font-medium text-gray-900 group-hover:text-gray-600 transition-colors text-sm md:text-base">
                {collection.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <div className="h-[70vh] w-full">
        <img src="/wild.jpg" alt="" className="w-full h-full object-cover" />
    </div>
    <div className="max-h-[100vh] relative w-full">
        <img src="/old.jpg" alt="" className="max-h-[100vh] w-full object-cover" />
        <div className="absolute text-amber-700 bottom-10 left-96">
            <button className="border rounded-2xl p-2 cursor-pointer shadow-2xl hover:scale-105 active:scale-95">VIEW OUR ARCHIVE</button>
        </div>
    </div>
    </>
  )
}