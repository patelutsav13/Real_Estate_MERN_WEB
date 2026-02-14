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
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Area Dropdown */}
        <div className="relative group">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 dark:text-blue-400" />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 dark:text-gray-200 transition-all duration-300"
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div className="relative group">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 dark:text-blue-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700 dark:text-gray-200 transition-all duration-300"
          >
            <option value="">Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Search className="w-5 h-5" />
          <span className="font-semibold">Search</span>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
