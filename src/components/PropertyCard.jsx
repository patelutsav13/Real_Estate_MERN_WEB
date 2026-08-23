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
      className="bg-slate-950/80 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group hover:border-amber-400/70 hover:shadow-[0_15px_35px_rgba(212,175,55,0.3)] transition-all duration-300 flex flex-col justify-between text-white"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden group h-64 w-full bg-slate-950">
        <img
          src={mainImg}
          alt={property.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/placeholder.svg"
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Status Badge */}
        {property.status && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-extrabold text-white tracking-wide shadow-lg ${
                property.status === "For Rent"
                  ? "bg-emerald-600 border border-emerald-400/50"
                  : property.status === "For Sale" || property.status === "For Buy"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 border border-amber-300/50"
                  : "bg-rose-600 border border-rose-400/50"
              }`}
            >
              {property.status}
            </span>
          </div>
        )}

        {/* Media indicators (Photos count & Video) */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs font-semibold text-white">
          {imageList.length > 1 && (
            <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30 text-amber-300">
              <Layers size={12} />
              {imageList.length} Photos
            </span>
          )}
          {hasVideo && (
            <span className="flex items-center gap-1 bg-rose-600/90 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold animate-pulse shadow-md">
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
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 hover:scale-110 transition-all shadow-md"
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
          <h3 className="text-xl font-extrabold text-white mb-2 truncate group-hover:text-amber-400 transition-colors">
            {property.name}
          </h3>

          <div className="flex items-center text-amber-200/80 mb-4">
            <MapPin className="w-4 h-4 mr-1 text-amber-400 flex-shrink-0" />
            <span className="text-xs truncate font-medium">{property.address || property.area}</span>
          </div>

          <div className="flex items-center gap-4 mb-5 text-sm font-semibold text-gray-200">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-amber-500/20">
              <Bed className="w-4 h-4 text-amber-400" />
              <span>{property.bedrooms} Bed</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-amber-500/20">
              <Bath className="w-4 h-4 text-amber-400" />
              <span>{property.bathrooms} Bath</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              ₹{property.price}
            </span>
            {property.priceType && (
              <span className="text-xs text-amber-200/70 ml-1">
                /{property.priceType}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(property)}
            className="px-5 py-2.5 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-xl shadow-lg hover:shadow-[0_5px_20px_rgba(212,175,55,0.4)] transition-all"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertyCard
