"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import config from "../config"
import { getImageUrl } from "../utils/getImageUrl"
import { Heart, Bed, Bath, MapPin, Layers, Video, ArrowLeft, X, Play, ChevronLeft, ChevronRight } from "lucide-react"

const PropertyDetail = ({ property, goBack, setCurrentPage }) => {
  if (!property) return null

  const [liked, setLiked] = useState(false)
  const [currentProperty, setCurrentProperty] = useState(property)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    const fetchLatestProperty = async () => {
      try {
        const res = await fetch(`${config.API_URL}/api/properties/${property._id}`)
        if (res.ok) {
          const data = await res.json()
          setCurrentProperty(data)
        }
      } catch (error) {
        console.error("Error fetching latest property data:", error)
      }
    }

    if (property?._id) {
      fetchLatestProperty()
    }
  }, [property._id])

  const defaultWalkthroughVideo = "https://www.image2url.com/r2/default/videos/1787537756433-30dea8f8-09e7-446e-9a96-32a0cdf81b77.mp4"
  const activeVideoUrl = currentProperty.video || defaultWalkthroughVideo
  const imageList = currentProperty.images && currentProperty.images.length > 0 ? currentProperty.images : [currentProperty.image]
  const isRentProperty = currentProperty.source === "rent"
  const actionText = isRentProperty ? "Pay Rent" : "Acquire Property"
  const hasVideo = Boolean(activeVideoUrl)

  // Auto-slide images every 3.5 seconds if multiple images exist
  useEffect(() => {
    if (!isAutoPlay || imageList.length <= 1) return

    const timer = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % imageList.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [isAutoPlay, imageList.length])

  const nextImage = () => {
    setIsAutoPlay(false)
    setSelectedImageIndex((prev) => (prev + 1) % imageList.length)
  }

  const prevImage = () => {
    setIsAutoPlay(false)
    setSelectedImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
  }

  const handleAction = () => {
    if (currentProperty.status === "Booked") {
      alert("⚠️ This Property is Already Acquired / Booked.")
      return
    }
    if (currentProperty.status === "Rented") {
      alert("⚠️ This Property is Currently Rented.")
      return
    }

    const token = localStorage.getItem("token")
    if (!token) {
      setCurrentPage("login")
      return
    }

    if (isRentProperty) {
      setCurrentPage("pay-rent")
      return
    }

    setCurrentPage("buy-payment")
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl w-full bg-slate-950/85 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden text-white"
      >
        
        {/* Main Image Gallery Container with Auto Slider */}
        <div 
          className="relative h-[460px] w-full bg-slate-950 overflow-hidden group"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <img
            key={selectedImageIndex}
            src={getImageUrl(imageList[selectedImageIndex] || currentProperty.image)}
            alt={currentProperty.name}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/placeholder.svg"
            }}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

          {/* Slider Prev & Next Buttons */}
          {imageList.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 border border-amber-500/30 text-amber-400 opacity-80 group-hover:opacity-100 hover:scale-110 transition-all shadow-xl"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 border border-amber-500/30 text-amber-400 opacity-80 group-hover:opacity-100 hover:scale-110 transition-all shadow-xl"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Status Badge */}
          {currentProperty.status && (
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold text-white tracking-widest uppercase shadow-xl ${
                currentProperty.status === "For Rent" ? "bg-emerald-600 border border-emerald-400/50" : "bg-gradient-to-r from-amber-500 to-yellow-600 border border-amber-300/50"
              }`}>
                {currentProperty.status}
              </span>

              {hasVideo && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-full text-xs font-extrabold shadow-lg animate-pulse"
                >
                  <Video size={14} />
                  <span>Watch Video Tour</span>
                </button>
              )}
            </div>
          )}

          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 hover:scale-110 transition-all shadow-xl"
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-rose-500 text-rose-500" : "text-white"}`} />
          </button>

          {/* Photo Counter */}
          <div className="absolute bottom-4 right-6 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <Layers size={14} />
            <span>Image {selectedImageIndex + 1} of {imageList.length}</span>
          </div>
        </div>

        {/* Multi-Image Thumbnails Grid (1 to 5 Images) */}
        {imageList.length > 1 && (
          <div className="flex gap-3 px-8 py-4 bg-slate-950/90 border-b border-amber-500/20 overflow-x-auto">
            {imageList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlay(false)
                  setSelectedImageIndex(idx)
                }}
                className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImageIndex === idx ? 'border-amber-400 scale-105 shadow-lg ring-2 ring-amber-400/50' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={getImageUrl(img)} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* DETAILS BODY */}
        <div className="p-8 sm:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{currentProperty.name}</h1>
              <div className="flex items-center text-amber-300 text-sm font-semibold">
                <MapPin className="w-4 h-4 mr-1 text-amber-400 flex-shrink-0" />
                <span>{currentProperty.address || currentProperty.area}, Ahmedabad</span>
              </div>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                ₹{currentProperty.price}
              </span>
              {currentProperty.priceType && (
                <span className="text-xs text-amber-200/70 ml-1">/{currentProperty.priceType}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 text-sm font-semibold">
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-amber-500/20 text-gray-200">
              <Bed className="w-5 h-5 text-amber-400" />
              <span>{currentProperty.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-amber-500/20 text-gray-200">
              <Bath className="w-5 h-5 text-amber-400" />
              <span>{currentProperty.bathrooms} Bathrooms</span>
            </div>
          </div>

          {/* Description */}
          {currentProperty.description && (
            <div className="mb-8 p-6 bg-slate-900/90 rounded-2xl border border-amber-500/20 text-gray-300 text-sm leading-relaxed">
              <h3 className="text-amber-300 font-extrabold mb-2 uppercase text-xs tracking-wider">Property Description</h3>
              <p>{currentProperty.description}</p>
            </div>
          )}

          {/* Video Tour Banner (If Video Exists) */}
          {hasVideo && (
            <div className="mb-8 p-6 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl border border-rose-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-8 h-8 text-rose-500 animate-pulse" />
                <div>
                  <h4 className="text-white font-extrabold text-sm">Virtual Video Tour Available</h4>
                  <p className="text-xs text-gray-400">Experience high-definition video walkthrough of this asset.</p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Play size={14} className="fill-white" /> Watch Now
              </button>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-amber-300 hover:text-amber-400 text-sm font-bold transition-colors"
            >
              <ArrowLeft size={16} /> Back to Properties
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAction}
              className="w-full sm:w-auto px-10 py-4 text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-2xl shadow-xl hover:shadow-[0_5px_25px_rgba(212,175,55,0.4)] transition-all"
            >
              {currentProperty.status === "Booked" ? "Booked (Sold Out)" : currentProperty.status === "Rented" ? "Rented ❌" : actionText}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* VIDEO TOUR MODAL OVERLAY */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl border border-amber-500/40 overflow-hidden p-4 shadow-2xl">
              <div className="flex justify-between items-center mb-3 px-2">
                <span className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                  <Video size={16} /> Video Tour: {currentProperty.name}
                </span>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-2 bg-slate-900 rounded-full text-amber-400 hover:bg-slate-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-amber-500/20">
                {activeVideoUrl?.includes("youtube.com") || activeVideoUrl?.includes("youtu.be") ? (
                  <iframe
                    src={activeVideoUrl}
                    title="Video Tour"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={getImageUrl(activeVideoUrl)}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PropertyDetail
