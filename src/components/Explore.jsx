"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { API } from "../config"
import SearchBar from "./SearchBar"
import PropertyCard from "./PropertyCard"
import FilterPanel from "./FilterPanel"
import HeroCanvas3D from "./HeroCanvas3D"
import {
  Building2,
  Users,
  Home,
  TrendingUp,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react"

const Explore = ({ openDetails }) => {
  const stats = [
    { icon: Building2, label: "Exclusive Properties", value: "50+", color: "amber" },
    { icon: Users, label: "Verified Agents", value: "20+", color: "yellow" },
    { icon: Home, label: "Satisfied Buyers", value: "120+", color: "emerald" },
    { icon: TrendingUp, label: "Active Listings", value: "35+", color: "rose" },
  ]

  // Showcase Slider Categories (House with Best Scheme, Apartment, Office, Villa, Penthouse, Commercial)
  const motionCategories = [
    {
      id: "house",
      type: "House",
      title: "House with Best Scheme",
      caption: "House with Best Scheme & Ultra Luxury Architecture",
      subtext: "Architectural masterwork with landscaped gardens & smart automation",
      price: "₹ 2.75 Cr",
      specs: "4 BHK • 4500 sq.ft",
      tag: "Best Scheme",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "apartment",
      type: "Apartment",
      title: "Skyline Luxury Apartment",
      caption: "Apartment - Skyline Luxury Living & Panoramic Views",
      subtext: "5-Star club amenities, infinity deck & 360° city view in Bodakdev",
      price: "₹ 1.85 Cr",
      specs: "3 BHK • 2800 sq.ft",
      tag: "High Rise",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "office",
      type: "Office",
      title: "Corporate Office Hub",
      caption: "Office - Premium Commercial & Corporate Suites",
      subtext: "Grade-A corporate spaces on SG Highway with high rental yield",
      price: "₹ 95 Lakhs",
      specs: "1850 sq.ft • SG Highway",
      tag: "High Yield",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "villa",
      type: "Villa",
      title: "Royal Spanish Villa",
      caption: "Villa - Royal Spanish Estate & Private Infinity Pool",
      subtext: "Gated private sanctuary with bespoke pool & Italian marble interior",
      price: "₹ 4.50 Cr",
      specs: "5 BHK • 6200 sq.ft",
      tag: "Ultra Luxury",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "penthouse",
      type: "Apartment",
      title: "Duplex Penthouse",
      caption: "Penthouse - Elite High-Rise Oasis with Private Terrace",
      subtext: "Double-height living room, jacuzzi deck & helipad access in Satellite",
      price: "₹ 3.90 Cr",
      specs: "4 BHK • 5100 sq.ft",
      tag: "Penthouse",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "commercial",
      type: "Commercial",
      title: "Prime Retail Plaza",
      caption: "Commercial - High Footfall Retail Boulevard",
      subtext: "Ground-floor showroom in prime Iscon commercial corridor",
      price: "₹ 1.60 Cr",
      specs: "2200 sq.ft • Iscon Cross",
      tag: "Prime Spot",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    },
  ]

  const [allProperties, setAllProperties] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  // AI Video State (Video 1)
  const videoRef = useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isAudioMuted, setIsAudioMuted] = useState(true) // Browsers require muted initially for autoplay, user can unmute anytime!

  // Motion Slider Scroll Ref
  const sliderRef = useRef(null)
  const [isSliderPaused, setIsSliderPaused] = useState(false)

  const [searchFilters, setSearchFilters] = useState({ area: "", type: "" })
  const [panelFilters, setPanelFilters] = useState({
    priceRange: [0, 100000000],
    propertyTypes: [],
  })

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API}/api/properties`)
        const data = Array.isArray(res.data) ? res.data : res.data.properties || []
        setAllProperties(data)
        setProperties(data)
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
      const matchArea = !search.area || property.area?.toLowerCase().includes(search.area.toLowerCase()) || property.address?.toLowerCase().includes(search.area.toLowerCase())
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

  // Handle Category click from Motion Slider
  const handleCategoryClick = (categoryType) => {
    const newSearch = { ...searchFilters, type: categoryType }
    setSearchFilters(newSearch)
    applyAllFilters(newSearch, panelFilters)

    // Smooth scroll down to listings
    const element = document.getElementById("featured-properties-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // AI Video Controls
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

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMutedState = !isAudioMuted
      videoRef.current.muted = nextMutedState
      setIsAudioMuted(nextMutedState)
    }
  }

  // Motion Slider Scroll Controls
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -380 : 380
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Auto scroll motion slider gently when not hovered
  useEffect(() => {
    if (isSliderPaused) return

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          sliderRef.current.scrollBy({ left: 340, behavior: "smooth" })
        }
      }
    }, 4500)

    return () => clearInterval(interval)
  }, [isSliderPaused])

  return (
    <div className="min-h-screen bg-transparent text-white py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      
      {/* 🌟 1. HERO TITLE & 3D PARTICLES */}
      <div className="relative max-w-6xl mx-auto text-center mb-10">
        <HeroCanvas3D />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase tracking-widest mb-4 backdrop-blur-md shadow-xl">
            <Sparkles size={14} className="animate-pulse text-amber-400" /> AI Powered Luxury Real Estate Experience
          </div>

          <h1 className="text-4xl sm:text-7xl font-extrabold text-white mb-3 tracking-tight leading-tight drop-shadow-2xl">
            PRIME<span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">ESTATE</span>
          </h1>

          <p className="text-base sm:text-xl text-amber-200/90 font-medium max-w-2xl mx-auto font-serif">
            Discover bespoke residences, private villas, and high-yield commercial assets in Ahmedabad.
          </p>
        </motion.div>
      </div>

      {/* 🎬 2. UPPER SECTION: FEATURED AI VIDEO (Continuous Loop, Audio Controls, Gold Frame & Watermark Mask) */}
      <div className="max-w-6xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden bg-slate-950/90 border-2 border-amber-500/40 shadow-[0_20px_60px_rgba(212,175,55,0.25)] group"
        >
          {/* Main AI Video Player (Video 1 from user prompt) */}
          <div className="relative aspect-video w-full max-h-[560px] bg-black overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isAudioMuted}
              playsInline
              className="w-full h-full object-cover scale-[1.01]"
              src="https://www.image2url.com/r2/default/videos/1787537689325-44360e3e-b7b0-4492-ba37-9274903b180f.mp4"
            />

            {/* Gradient Overlays for Luxury Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/40 pointer-events-none" />

            {/* Top-Right Watermark Mask & AI Badge (Seamlessly overlays and hides any small corner star) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <div className="px-4 py-2 bg-slate-950/90 backdrop-blur-xl border border-amber-400/50 text-amber-300 text-xs font-extrabold rounded-full shadow-2xl flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400 animate-spin" />
                <span>PrimeEstate AI Vision</span>
              </div>
            </div>

            {/* Top-Left Live Streaming Badge */}
            <div className="absolute top-4 left-4 z-20">
              <div className="px-3.5 py-1.5 bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-emerald-400 text-xs font-extrabold rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Continuous AI Tour</span>
              </div>
            </div>

            {/* Video Interactive Control Bar (Play/Pause, Audio Mute/Unmute, Status) */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4 bg-slate-950/85 backdrop-blur-2xl px-6 py-4 rounded-2xl border border-amber-500/40 shadow-2xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleVideoPlayback}
                  className="p-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 rounded-xl font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 text-xs"
                >
                  {isVideoPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isVideoPlaying ? "Pause" : "Play"}</span>
                </button>

                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-xl font-bold transition-all flex items-center gap-1.5 text-xs border ${
                    !isAudioMuted
                      ? "bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/30"
                      : "bg-slate-900 text-amber-300 border-amber-500/30 hover:bg-slate-800"
                  }`}
                >
                  {!isAudioMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  <span>{!isAudioMuted ? "🔊" : "🔇"}</span>
                </button>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-xs font-extrabold text-amber-300">Ultra HD Architectural Walkthrough</p>
                <p className="text-[10px] text-gray-400">Continuous 4K Loop • Sound Capable</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🏙️ 3. UNDER AI VIDEO: ANIMATED MOTION SLIDER (House Best Scheme, Apartment, Office, Villa, etc.) */}
      <div className="max-w-7xl mx-auto mb-14">
        <div className="flex items-center justify-between mb-6 px-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-1">
              <Compass size={14} /> Curated Asset Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Explore By <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Property Scheme</span>
            </h2>
          </div>

          {/* Slider Left / Right Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollSlider("left")}
              className="p-2.5 rounded-full bg-slate-950/90 border border-amber-500/30 text-amber-300 hover:bg-slate-900 hover:scale-105 transition shadow-lg"
              title="Previous Scheme"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollSlider("right")}
              className="p-2.5 rounded-full bg-slate-950/90 border border-amber-500/30 text-amber-300 hover:bg-slate-900 hover:scale-105 transition shadow-lg"
              title="Next Scheme"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Animated Motion Slider Container */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsSliderPaused(true)}
          onMouseLeave={() => setIsSliderPaused(false)}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {motionCategories.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCategoryClick(item.type)}
              className="flex-shrink-0 w-80 sm:w-96 bg-slate-950/85 backdrop-blur-2xl rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-400/80 shadow-2xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Scheme Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                  <span className="text-2xl font-black text-amber-300 drop-shadow-md">
                    {item.price}
                  </span>
                  <span className="text-[11px] font-bold text-gray-200 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-white/20">
                    {item.specs}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors mb-1">
                    {item.caption}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {item.subtext}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  <span>Browse {item.type}s</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔍 4. UNDER MOTION SLIDER: BLUE/SLATE TRANSPARENT SEARCH BAR SECTION (Slightly Moved Down with Perfect Spacing) */}
      <div className="max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Instant Luxury Property Finder
            </h3>
            <p className="text-xs text-amber-200/80 mt-1">
              Select your desired Ahmedabad neighborhood and property category
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />
        </motion.div>
      </div>

      {/* 📊 5. STATS SECTION */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
              className="bg-slate-950/80 backdrop-blur-xl p-6 rounded-2xl border border-amber-500/30 shadow-2xl hover:border-amber-400/60 transition-all text-left"
            >
              <stat.icon className="w-6 h-6 text-amber-400 mb-2" />
              <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
              <p className="text-xs text-amber-200/90 uppercase tracking-wider font-semibold mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🏡 6. FEATURED PROPERTIES SECTION WITH SMOOTH EXPANDABLE FILTER */}
      <div id="featured-properties-section" className="max-w-7xl mx-auto">
        <div className="bg-slate-950/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-white">Featured Luxury Properties</h2>
              <p className="text-sm text-amber-200/80">
                Discover verified villas, apartments, penthouses, and commercial plots ({properties.length} Available)
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <FilterPanel onFilter={handleFilter} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-16 text-center text-amber-400 font-extrabold text-lg">
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
            <p className="col-span-full text-center text-amber-200/80 py-16 text-base font-semibold">
              No properties found matching your search criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore
