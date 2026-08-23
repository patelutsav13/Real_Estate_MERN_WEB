"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"

const FilterPanel = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100000000])
  const [selectedTypes, setSelectedTypes] = useState([])

  const propertyTypes = ["House", "Apartment", "Villa", "Plot", "Commercial", "Office Space"]

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const applyFilters = () => {
    onFilter({ priceRange, propertyTypes: selectedTypes })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-5 py-2.5 bg-slate-950/80 backdrop-blur-xl border border-amber-500/30 text-amber-300 rounded-2xl hover:border-amber-400/60 shadow-lg transition-all duration-300 font-bold"
      >
        <SlidersHorizontal className="w-5 h-5 text-amber-400" />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl z-50 p-6 text-white animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-amber-300">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-900 rounded-lg transition-all duration-300 text-amber-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">Price Range (₹)</label>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white text-sm"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white text-sm"
              />
            </div>
          </div>

          {/* Property Types */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">Property Type</label>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeToggle(type)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                    selectedTypes.includes(type)
                      ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950"
                      : "bg-slate-900 text-gray-300 hover:bg-slate-800 border border-amber-500/20"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 text-sm"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
