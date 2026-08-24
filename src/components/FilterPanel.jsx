"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, RotateCcw, Check, IndianRupee } from "lucide-react"

const FilterPanel = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100000000])
  const [selectedTypes, setSelectedTypes] = useState([])

  const propertyTypes = ["Apartment", "House", "Villa", "Office", "Commercial", "Plot"]

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const applyFilters = () => {
    onFilter({ priceRange, propertyTypes: selectedTypes })
  }

  const resetFilters = () => {
    setPriceRange([0, 100000000])
    setSelectedTypes([])
    onFilter({ priceRange: [0, 100000000], propertyTypes: [] })
  }

  const activeFilterCount =
    (selectedTypes.length > 0 ? selectedTypes.length : 0) +
    (priceRange[0] > 0 || priceRange[1] < 100000000 ? 1 : 0)

  return (
    <div className="w-full">
      {/* Filter Toggle Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl font-extrabold shadow-xl transition-all duration-300 ${
            isOpen || activeFilterCount > 0
              ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 shadow-amber-500/20"
              : "bg-slate-950/90 backdrop-blur-xl border border-amber-500/40 text-amber-300 hover:border-amber-400"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{isOpen ? "Hide Filters" : "Filter Properties"}</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-xs font-bold flex items-center justify-center ml-1">
              {activeFilterCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Expandable Smooth Transition Filter Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 20 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-amber-500/40 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-white">
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-amber-300 flex items-center gap-2">
                    <SlidersHorizontal size={18} /> Advanced Property Filters
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">Filter listings by budget and property category</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-300/80 hover:text-amber-300 bg-slate-900 border border-amber-500/20 rounded-xl transition font-semibold"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-slate-900 rounded-xl transition text-amber-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                {/* Price Range */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <IndianRupee size={14} /> Price Range (₹)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Minimum (₹)</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={priceRange[0] === 0 ? "" : priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            Math.max(0, parseInt(e.target.value, 10) || 0),
                            priceRange[1],
                          ])
                        }
                        className="w-full px-4 py-3 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white text-sm font-semibold focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Maximum (₹)</span>
                      <input
                        type="number"
                        placeholder="100000000"
                        value={priceRange[1] === 100000000 ? "" : priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Math.max(0, parseInt(e.target.value, 10) || 100000000),
                          ])
                        }
                        className="w-full px-4 py-3 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white text-sm font-semibold focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px] text-amber-300/80 mt-2 font-mono">
                    <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                    <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Property Types */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                    Select Property Types
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {propertyTypes.map((type) => {
                      const isSelected = selectedTypes.includes(type)
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleTypeToggle(type)}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                            isSelected
                              ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 shadow-md scale-105"
                              : "bg-slate-900 text-gray-300 hover:bg-slate-800 border border-amber-500/20 hover:border-amber-500/40"
                          }`}
                        >
                          {isSelected && <Check size={12} />}
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-gray-300 font-bold rounded-xl text-xs transition"
                >
                  Clear Filters
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={applyFilters}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
                >
                  <Check size={14} /> Apply Filters Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FilterPanel

