"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import config from "../config"
import SearchBar from "./SearchBar"
import PropertyCard from "./PropertyCard"
import FilterPanel from "./FilterPanel"
import { ShoppingBag, Sparkles } from "lucide-react"

const Buy = ({ openDetails }) => {
  const [properties, setProperties] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${config.API_URL}/api/properties`)
        const data = await res.json()
        const items = Array.isArray(data) ? data : data.properties || []
        const buyProps = items.filter(
          (p) => p.status === "For Sale" || p.status === "For Buy" || p.status === "Booked"
        )
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
      const matchArea =
        !search.area ||
        property.area?.toLowerCase().includes(search.area.toLowerCase()) ||
        property.address?.toLowerCase().includes(search.area.toLowerCase())
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl p-10 border border-amber-500/20 shadow-2xl text-center relative overflow-hidden mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <ShoppingBag size={14} className="animate-pulse" /> Prime Estates for Acquisition
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
            Properties for <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Sale</span>
          </h1>

          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Discover architectural masterpieces, luxury villas, and high-yield real estate in Ahmedabad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-950/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Properties for Sale ({properties.length})</h2>
              <p className="text-xs text-gray-400 mt-1">RERA approved properties with instant ownership transfer</p>
            </div>
            <div className="w-full sm:w-auto">
              <FilterPanel onFilter={handleFilter} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-16 text-center text-amber-400 font-extrabold text-lg">
              Loading Properties for Sale...
            </div>
          ) : properties.length > 0 ? (
            properties.map((p, idx) => (
              <motion.div
                key={p._id || p.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <PropertyCard property={p} onViewDetails={openDetails} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 py-16 font-semibold">
              No properties found for sale matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Buy