"use client"

import { useState, useEffect } from "react"
import config from "../config"
import SearchBar from "./SearchBar"
import PropertyCard from "./PropertyCard"
import FilterPanel from "./FilterPanel"

const Buy = ({ openDetails }) => {
  const [properties, setProperties] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${config.API_URL}/api/properties`)
        const data = await res.json()
        // properties for "Buy" page are those with status "For Sale", "For Buy" or "Booked"
        const buyProps = data.filter(p => p.status === "For Sale" || p.status === "For Buy" || p.status === "Booked")
        setAllProperties(buyProps)
        setProperties(buyProps)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const [searchFilters, setSearchFilters] = useState({ area: "", type: "" })
  const [panelFilters, setPanelFilters] = useState({
    priceRange: [0, 100000000],
    propertyTypes: [],
  })

  const applyAllFilters = (search, panel) => {
    const filtered = allProperties.filter((property) => {
      const matchArea = !search.area || property.area.toLowerCase().includes(search.area.toLowerCase())
      const matchType = !search.type || property.type === search.type
      const matchPrice =
        property.priceValue >= panel.priceRange[0] &&
        property.priceValue <= panel.priceRange[1]
      const matchPanelTypes =
        panel.propertyTypes.length === 0 ||
        panel.propertyTypes.includes(property.type)

      return matchArea && matchType && matchPrice && matchPanelTypes
    })
    setProperties(filtered)
  }

  const handleSearch = (d) => {
    setSearchFilters(d)
    applyAllFilters(d, panelFilters)
  }

  const handleFilter = (d) => {
    setPanelFilters(d)
    applyAllFilters(searchFilters, d)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section - Matching Explore */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Properties for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Buy
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find your perfect home to own in Ahmedabad
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Properties List - Exact same as Explore */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Available for Buy ({properties.length})
          </h2>
          <FilterPanel onFilter={handleFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : properties.length > 0 ? (
            properties.map((p) => (
              <div key={p._id || p.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <PropertyCard
                  property={p}
                  onViewDetails={openDetails}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No properties found for sale.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Buy