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
    <div className="relative z-50">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-5 py-2.5 bg-slate-950/90 backdrop-blur-xl border border-amber-500/40 text-amber-300 rounded-2xl hover:border-amber-400 shadow-2xl transition-all duration-300 font-extrabold"
      >
        <SlidersHorizontal className="w-5 h-5 text-amber-400" />
        <span>Filters</span>
      </button>

      {/* Filter Panel Dropdown Overlay */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[100] p-6 text-white animate-fade-in">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20">
            <h3 className="text-lg font-extrabold text-amber-300">Filter Properties</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-slate-900 rounded-xl transition-all text-amber-400"
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
                className="w-full px-4 py-2.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white text-sm"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full px-4 py-2.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white text-sm"
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
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedTypes.includes(type)
                      ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 shadow-md"
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
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl hover:scale-105 transition-all text-sm"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
