"use client"

import { useState } from "react"
import { Search, MapPin, Home } from "lucide-react"

const SearchBar = ({ onSearch }) => {
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const areas = [
    "Satellite",
    "Sindhu Bhavan Road",
    "Iscon",
    "Prahlad Nagar",
    "Sola",
    "Gota",
    "Vastral",
    "Maninagar",
    "Bodakdev",
    "Vastrapur",
    "Thaltej",
    "Ambawadi",
  ]

  const propertyTypes = ["House", "Apartment", "Villa", "Plot", "Commercial", "Office Space"]

  const handleSearch = () => {
    onSearch({ area: selectedArea, type: selectedType })
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl transition-all duration-300 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Area Dropdown */}
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-amber-500/20 rounded-2xl outline-none text-white text-sm font-semibold"
          >
            <option value="" className="bg-slate-950 text-white">Select Area</option>
            {areas.map((area) => (
              <option key={area} value={area} className="bg-slate-950 text-white">
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div className="relative group">
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900/90 border border-amber-500/20 rounded-2xl outline-none text-white text-sm font-semibold"
          >
            <option value="" className="bg-slate-950 text-white">Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type} className="bg-slate-950 text-white">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 px-6 py-3.5 rounded-2xl font-extrabold shadow-lg hover:shadow-[0_5px_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300"
        >
          <Search className="w-5 h-5" />
          <span>Search Properties</span>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
