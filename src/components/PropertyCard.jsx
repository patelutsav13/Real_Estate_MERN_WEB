"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Bed, Bath, MapPin, Video, Layers } from "lucide-react"
import { getImageUrl } from "../utils/getImageUrl"

const PropertyCard = ({ property, onViewDetails }) => {
  const [liked, setLiked] = useState(false)

  const imageList = property.images && property.images.length > 0 ? property.images : [property.image]
  const mainImg = getImageUrl(imageList[0] || property.image)
  const hasVideo = Boolean(property.video)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-amber-500/20 group hover:shadow-2xl dark:hover:shadow-[0_15px_30px_rgba(212,175,55,0.25)] transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden group h-60 w-full bg-slate-900">
        <img
          src={mainImg}
          alt={property.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg"
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Status Badge */}
        {property.status && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold text-white tracking-wide shadow-md ${
                property.status === "For Rent"
                  ? "bg-emerald-600"
                  : property.status === "For Sale" || property.status === "For Buy"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600"
                  : "bg-rose-600"
              }`}
            >
              {property.status}
            </span>
          </div>
        )}

        {/* Media indicators (Photos count & Video) */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-semibold text-white">
          {imageList.length > 1 && (
            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              <Layers size={12} className="text-amber-400" />
              {imageList.length} Photos
            </span>
          )}
          {hasVideo && (
            <span className="flex items-center gap-1 bg-rose-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-white font-bold animate-pulse">
              <Video size={12} />
              Video Tour
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setLiked(!liked)
          }}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 hover:scale-110 transition-all"
        >
          <Heart
            className={`w-4 h-4 ${
              liked ? "fill-rose-500 text-rose-500" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* Details Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
            {property.name}
          </h3>

          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4 mr-1 text-blue-600 dark:text-amber-400 flex-shrink-0" />
            <span className="text-xs truncate">{property.address || property.area}</span>
          </div>

          <div className="flex items-center gap-6 mb-5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-amber-500/10">
              <Bed className="w-4 h-4 text-blue-600 dark:text-amber-400" />
              <span>{property.bedrooms} Bed</span>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-amber-500/10">
              <Bath className="w-4 h-4 text-blue-600 dark:text-amber-400" />
              <span>{property.bathrooms} Bath</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-blue-600 dark:bg-gradient-to-r dark:from-amber-300 dark:via-yellow-400 dark:to-amber-500 dark:bg-clip-text dark:text-transparent">
              ₹{property.price}
            </span>
            {property.priceType && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                /{property.priceType}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(property)}
            className="px-4 py-2 text-xs font-bold text-white dark:text-slate-950 bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertyCard
