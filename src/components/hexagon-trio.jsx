"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const HexagonTrio = () => {
  const [activeTab, setActiveTab] = React.useState("setting");
  const [selectedShape, setSelectedShape] = React.useState("Hexagon");
  const [selectedMaterial, setSelectedMaterial] = React.useState("White Gold");
  const [selectedColor, setSelectedColor] = React.useState("F");
  const [selectedClarity, setSelectedClarity] = React.useState("VS1");
  const [selectedCut, setSelectedCut] = React.useState("Excellent");
  const [selectedCarat, setSelectedCarat] = React.useState("4.5");
  const [selectedCert, setSelectedCert] = React.useState("ICI");
  const [selectedSymmetry, setSelectedSymmetry] = React.useState("Excellent");
  const [selectedPolish, setSelectedPolish] = React.useState("Excellent");
  const [budgetMin, setBudgetMin] = React.useState(240);
  const [budgetMax, setBudgetMax] = React.useState(14000);

  const shapes = ["Hexagon", "Round", "Asscher", "Cushion", "Long"];
  const materials = ["White Gold", "Yellow Gold", "Rose Gold"];

  // Animation variants for tab content
  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-stone-100 via-stone-50 to-white text-white">
      <div className="p-8">
        <div className="flex justify-between mb-20 border-b-2 border-gray-700">
          <button
            className={`px-8 py-4 font-serif text-lg ${activeTab === "setting" ? "text-black border-b-4 " : "text-gray-600 hover:text-gray-800"}`}
            onClick={() => setActiveTab("setting")}
          >
            Select your SETTING
          </button>
          <button
            className={`px-8 py-4 font-serif text-lg ${activeTab === "stone" ? "text-black border-b-4 " : "text-gray-600 hover:text-gray-800"}`}
            onClick={() => setActiveTab("stone")}
          >
            Select your STONE
          </button>
          <button
            className={`px-8 py-4 font-serif text-lg ${activeTab === "ring" ? "text-black border-b-4 " : "text-gray-600 hover:text-gray-800"}`}
            onClick={() => setActiveTab("ring")}
          >
            Complete your RING
          </button>
        </div>
        
          {activeTab === "setting" && (
            <motion.div
              key="setting"
              variants={tabVariants}
              initial="initial"
              whileInView="animate"
              exit="exit"
              className="flex items-center justify-between p-8 rounded-xl shadow-2xl text-black"
            >
              <img
                src="https://truediamond.in/cdn/shop/products/YG1-362002.png?v=1708385988"
                alt="Hexagon Trio Ring"
                className="object-cover rounded-lg mr-8"
              />
              <div className="flex-1 max-w-3xl">
                <h2 className="text-4xl font-serif font-extrabold ">Hexagon Trio</h2>
                <p className="text-xl mt-3">$2,000</p>
                <p className="text-gray-400 mt-3 leading-relaxed">
                  The Hexagon Trio is an exquisite ring that masterfully blends geometric precision,
                  luxurious aesthetics, and unparalleled sparkle. Three flawless hexagon-cut diamonds
                  are meticulously set along the band in a premium bezel setting.
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold ">Shape</h3>
                  <div className="flex space-x-4 mt-4">
                    {shapes.map((shape) => (
                      <button
                        key={shape}
                        className={`w-20 h-20 rounded-full text-lg font-serif ${selectedShape === shape ? " border-2 " : "border-gray-600 border-1 text-gray-400"}`}
                        onClick={() => setSelectedShape(shape)}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold ">Material</h3>
                  <div className="flex space-x-4 mt-4">
                    {materials.map((material) => (
                      <button
                        key={material}
                        className={`w-28 h-16 rounded-lg text-lg font-serif ${selectedMaterial === material ? "border-2" : "border-1  border-gray-600"}`}
                        style={{
                          backgroundColor:
                            material === "White Gold"
                              ? "#e0e0e0"
                              : material === "Yellow Gold"
                              ? "#ffd700"
                              : "#d3a4a4",
                          color: "#000" ,
                        }}
                        onClick={() => setSelectedMaterial(material)}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === "stone" && (
            <motion.div
              key="stone"
              variants={tabVariants}
              initial="initial"
              whileInView="animate"
              exit="exit"
              className="text-black p-8 rounded-xl shadow-2xl text-center"
            >
              <h2 className="text-4xl font-serif font-extrabold ">
                Select Your Stone Shape and Quality
              </h2>
              <p className="text-gray-400 mt-6 leading-relaxed">
                Use the filters below to design your perfect engagement ring
              </p>
              
                <div className="flex justify-around mb-4">
                  {[
                    "Round",
                    "Asscher",
                    "Cushion",
                    "Long",
                    "Emerald",
                    "Heart",
                    "Marquise",
                    "Oval",
                    "Pear",
                    "Princess",
                    "Radiant",
                    "Radiant Square",
                  ].map((shape) => (
                    <button
                      key={shape}
                      className={`w-12 h-12 rounded-full border-2 ${selectedShape === shape ? " border-yellow-400" : "text-gray-600 border-gray-600"}`}
                      onClick={() => setSelectedShape(shape)}
                    >
                      <img
                        src={`/path-to-${shape.toLowerCase()}-icon.png`}
                        alt={shape}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="text-xl font-semibold ">Color</h3>
                    <div className="flex justify-center space-x-2 mt-2">
                      {["J", "I", "H", "G", "F", "E", "D"].map((color) => (
                        <button
                          key={color}
                          className={`px-2 py-1 rounded ${selectedColor === color ? " border-b-2 border-yellow-400" : "text-gray-600"}`}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">Clarity</h3>
                    <div className="flex justify-center space-x-2 mt-2">
                      {["SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"].map((clarity) => (
                        <button
                          key={clarity}
                          className={`px-2 py-1 rounded ${selectedClarity === clarity ? " border-b-2 border-yellow-400" : "text-gray-600"}`}
                          onClick={() => setSelectedClarity(clarity)}
                        >
                          {clarity}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">Cut</h3>
                    <div className="flex justify-center space-x-2 mt-2">
                      {["Good", "Very Good", "Excellent"].map((cut) => (
                        <button
                          key={cut}
                          className={`px-2 py-1 rounded ${selectedCut === cut ? " border-b-2 border-yellow-400" : "text-gray-600"}`}
                          onClick={() => setSelectedCut(cut)}
                        >
                          {cut}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">Carat</h3>
                    <div className="flex justify-center space-x-2 mt-2">
                      {["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"].map((carat) => (
                        <button
                          key={carat}
                          className={`px-2 py-1 rounded ${selectedCarat === carat ? " border-b-2 border-yellow=time400" : "text-gray-600"}`}
                          onClick={() => setSelectedCarat(carat)}
                        >
                          {carat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">Budget</h3>
                    <div className="flex justify-center items-center mt-2 space-x-4">
                      <input
                        type="number"
                        value={budgetMin}
                        onChange={(e) =>
                          setBudgetMin(Math.min(Math.max(240, parseInt(e.target.value) || 240), budgetMax))
                        }
                        className="w-24 p-1 rounded text-black"
                        min="240"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="number"
                        value={budgetMax}
                        onChange={(e) =>
                          setBudgetMax(Math.max(Math.min(14000, parseInt(e.target.value) || 14000), budgetMin))
                        }
                        className="w-24 p-1 rounded text-black"
                        max="14000"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">Certificate</h3>
                    <div className="flex justify-center space-x-2 mt-2">
                      {["ICI", "GIA"].map((cert) => (
                        <button
                          key={cert}
                          className={`px-2 py-1 rounded ${selectedCert === cert ? " border-b-2 border-yellow-400" : "text-gray-600"}`}
                          onClick={() => setSelectedCert(cert)}
                        >
                          {cert}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">Symmetry</h3>
                    <div className="flex justify-center space-x-2 mt-2">
                      {["Good", "Very Good", "Excellent"].map((sym) => (
                        <button
                          key={sym}
                          className={`px-2 py-1 rounded ${selectedSymmetry === sym ? " border-b-2 border-yellow-400" : "text-gray-600"}`}
                          onClick={() => setSelectedSymmetry(sym)}
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold ">Polish</h3>
                    <div className="flex justify-center space-x-2 mt-2">
                      {["Good", "Very Good", "Excellent"].map((pol) => (
                        <button
                          key={pol}
                          className={`px-2 py-1 rounded ${selectedPolish === pol ? " border-b-2 border-yellow-400" : "text-gray-600"}`}
                          onClick={() => setSelectedPolish(pol)}
                        >
                          {pol}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              
            </motion.div>
          )}
          {activeTab === "ring" && (
            <motion.div
              key="ring"
              variants={tabVariants}
              initial="initial"
              whileInView="animate"
              exit="exit"
              className="text-black p-8 rounded-xl text-center"
            >
              <div className="flex items-center justify-evenly mb-6">
                <img
                  src="https://truediamond.in/cdn/shop/products/YG1-362002.png?v=1708385988"
                  alt="Hexagon Trio Ring"
                  className="w-1/3 shadow-2xl object-cover rounded-lg"
                />
                <div className="text-left">
                  <h2 className="text-4xl font-serif font-extrabold ">Hexagon Trio</h2>
                  <p className="text-xl mt-2 text-gray-400">
                    White Gold | 2.5ct center | 1ct side-stone | [2] IGI Certified
                  </p>
                  <p className="text-lg mt-1">
                    Size: 4.25 <a href="#" className=" underline">Find My Ring Size</a>
                  </p>
                  <p className="text-lg mt-1">
                    <a href="#" className=" underline">
                      + Add Engraving (Type your message)
                    </a>
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Ring Details</span>
                      <span className="text-gray-400">▼</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-gray-400">▼</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return</span>
                      <span className="text-gray-400">▼</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        className="p-2 rounded w-1/2 text-black"
                      />
                      <button className="bg-green-700 text-white px-4 py-2 rounded">Apply</button>
                    </div>
                    <p className="text-lg">
                      Merchandise Total: <span className="">$2,800</span>
                    </p>
                    <p className="text-gray-400">Estimated Ship Date: Wednesday, May 21st</p>
                    <button className="w-full bg-green-700 text-white py-3 rounded mt-4">
                      Secure Checkout
                    </button>
                    <div className="flex justify-between mt-4">
                      <button className=" underline">Add to Shopping Bag</button>
                      <button className=" underline">Add to Wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-lg">
                <h3 className="text-xl font-semibold ">Virtual Appointment</h3>
                <p className="text-gray-400 mt-2">
                  See Diamond Forest's jewelry up close with a personal appointment. Explore engagement
                  rings, diamonds, and fine jewelry in person through your device.
                </p>
                <button className="mt-2  underline">Book Appointment</button>
                <div className="flex justify-between mt-4 text-gray-400">
                  <span>877-476-9627</span>
                  <span>Live Chat</span>
                  <span>Email Us</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold ">Ring Details</h3>
                <table className="w-full mt-2 text-left text-gray-400">
                  <tbody>
                    <tr>
                      <td>SKU</td>
                      <td>206Q-ER-OV-YG-14</td>
                    </tr>
                    <tr>
                      <td>Width</td>
                      <td>2.1mm</td>
                    </tr>
                    <tr>
                      <td>Center Stone</td>
                      <td>Oval</td>
                    </tr>
                    <tr>
                      <td>Shape</td>
                      <td>14k Yellow Gold</td>
                    </tr>
                    <tr>
                      <td>Material</td>
                      <td>Round</td>
                    </tr>
                    <tr>
                      <td>Style</td>
                      <td>Medium</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="border-t pt-2">
                        Side Stone
                      </td>
                    </tr>
                    <tr>
                      <td>Average Color</td>
                      <td>D-F</td>
                    </tr>
                    <tr>
                      <td>Average Clarity</td>
                      <td>VS</td>
                    </tr>
                    <tr>
                      <td>Shape</td>
                      <td>Round</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="mt-4  underline">Continue Shopping</button>
            </motion.div>
          )}
        
      </div>
    </div>
  );
};

export default HexagonTrio;