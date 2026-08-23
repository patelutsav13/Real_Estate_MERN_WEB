"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { API } from "../config"
import SearchBar from "./SearchBar"
import PropertyCard from "./PropertyCard"
import FilterPanel from "./FilterPanel"
import HeroCanvas3D from "./HeroCanvas3D"
import { Building2, Users, Home, TrendingUp, Sparkles, Play, Pause, Video, CheckCircle2 } from "lucide-react"

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
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)

  const videoRef = useRef(null)

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

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-white py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* 🎥 LANDING PAGE HERO WITH AI LUXURY REAL ESTATE VIDEO & THREE.JS 3D CANVAS */}
      <div className="relative mb-16 rounded-3xl overflow-hidden bg-slate-900 border border-gray-200 dark:border-amber-500/20 shadow-2xl">
        
        {/* Background AI Real Estate Video Player */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay pointer-events-none"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-42526-large.mp4" type="video/mp4" />
        </video>

        {/* Three.js 3D Graphics Canvas Overlay */}
        <HeroCanvas3D />

        {/* Top Video Playback Controls Badge */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={toggleVideoPlayback}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-bold rounded-full shadow-lg hover:scale-105 transition-all"
          >
            {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isVideoPlaying ? "Pause AI Cinematic Video" : "Play AI Cinematic Video"}</span>
          </button>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center py-24 px-4">
          
          {/* Framer Motion Hero Content with 1-2s Staggered Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-widest mb-6 backdrop-blur-md shadow-xl">
              <Sparkles size={14} className="animate-pulse text-amber-400" /> AI Powered Luxury Real Estate
            </div>

            <h1 className="text-4xl sm:text-7xl font-extrabold text-white mb-4 tracking-tight leading-tight drop-shadow-lg">
              PRIME<span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">ESTATE</span>
            </h1>

            <p className="text-lg sm:text-2xl text-amber-200/90 font-semibold max-w-2xl mx-auto mb-10 tracking-wide font-serif drop-shadow-md">
              Find Your Dream Property
            </p>
          </motion.div>

          {/* SearchBar Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <SearchBar onSearch={handleSearch} />
          </motion.div>

          {/* Stats Section with Framer Motion Staggered 1-2s Delays */}
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
                <p className="text-xs text-amber-200/80 uppercase tracking-wider font-semibold mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Featured Luxury Properties</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Discover handpicked villas, apartments, and penthouses</p>
          </div>
          <FilterPanel onFilter={handleFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-16 text-center text-amber-500 font-extrabold text-lg">
              Loading Luxury Properties...
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
            <p className="col-span-full text-center text-gray-500 py-16 text-base font-semibold">
              No properties found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore