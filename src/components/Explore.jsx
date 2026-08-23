"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { API } from "../config"
import SearchBar from "./SearchBar"
import PropertyCard from "./PropertyCard"
import FilterPanel from "./FilterPanel"
import HeroCanvas3D from "./HeroCanvas3D"
import { Building2, Users, Home, TrendingUp, Sparkles } from "lucide-react"

const Explore = ({ openDetails }) => {
  const stats = [
    { icon: Building2, label: "Exclusive Properties", value: "50+", color: "amber" },
    { icon: Users, label: "Verified Agents", value: "20+", color: "yellow" },
    { icon: Home, label: "Satisfied Buyers", value: "120+", color: "emerald" },
    { icon: TrendingUp, label: "Active Listings", value: "35+", color: "rose" },
  ]

  const [allProperties, setAllProperties] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchFilters, setSearchFilters] = useState({ area: "", type: "" })
  const [panelFilters, setPanelFilters] = useState({
    priceRange: [0, 100000000],
    propertyTypes: [],
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API}/api/properties`)
        setAllProperties(res.data)
        setProperties(res.data)
      } catch (err) {
        console.error("Error fetching properties:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const applyAllFilters = (search, panel) => {
    const filtered = allProperties.filter((property) => {
      const matchArea = !search.area || property.area === search.area
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

  const handleSearch = (searchData) => {
    setSearchFilters(searchData)
    applyAllFilters(searchData, panelFilters)
  }

  const handleFilter = (filterData) => {
    setPanelFilters(filterData)
    applyAllFilters(searchFilters, filterData)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* Hero Section with Luxury BG Image & Three.js 3D Canvas */}
      <div className="relative mb-16 rounded-3xl overflow-hidden bg-slate-900 border border-gray-200 dark:border-amber-500/20 shadow-2xl">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')" }}
        />

        <HeroCanvas3D />

        <div className="relative z-10 max-w-5xl mx-auto text-center py-20 px-4">
          
          {/* Framer Motion Hero Title (1-2s Staggered Entrance) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md">
              <Sparkles size={14} /> Luxury Real Estate Collection
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              PRIME<span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">ESTATE</span>
            </h1>

            <p className="text-lg sm:text-2xl text-amber-200/90 font-medium max-w-2xl mx-auto mb-10 tracking-wide font-serif">
              Find Your Dream Property
            </p>
          </motion.div>

          {/* SearchBar with Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          {/* Stats Bar with Motion Stagger (1-2s Sequence) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.2 }}
                className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-amber-500/20 shadow-xl hover:border-amber-400/50 transition-all text-left"
              >
                <stat.icon className="w-6 h-6 text-amber-400 mb-2" />
                <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
                <p className="text-xs text-amber-200/70 uppercase tracking-wider font-semibold mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Grid Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Featured Dream Properties</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Handpicked luxury villas, apartments, and houses</p>
          </div>
          <FilterPanel onFilter={handleFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-12 text-center text-amber-500 font-bold">
              Loading Properties...
            </div>
          ) : properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard
                key={property.id || property._id}
                property={property}
                onViewDetails={openDetails}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-12">
              No properties found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore