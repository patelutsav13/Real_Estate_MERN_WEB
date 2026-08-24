"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import config from "../config"
import PropertyCard from "./PropertyCard"
import { PlusCircle, Upload, CheckCircle2, ShieldCheck, Sparkles, Link as LinkIcon, Image as ImageIcon, X, Calendar, Key, Tag } from "lucide-react"

const Sell = ({ openDetails, setCurrentPage }) => {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    priceValue: "",
    bedrooms: "3",
    bathrooms: "2",
    area: "",
    type: "Apartment",
    status: "For Sale", // "For Sale" or "For Rent"
    leaseMonths: "12",
    priceType: "",
    imageUrl: "",
    video: ""
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchProperties = async () => {
    try {
      const rawToken = localStorage.getItem("token")
      if (!rawToken) return

      const token = rawToken.trim().replace(/^["']|["']$/g, "")
      const res = await fetch(`${config.API_URL}/api/properties/my-listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (Array.isArray(data)) {
        setProperties(data)
      }
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch properties", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchProperties()
    } else {
      setProperties([])
      setLoading(false)
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        status: value,
        priceType: value === "For Rent" ? "month" : "",
        price: value === "For Rent" && !prev.price ? "45,000 / Month" : prev.price,
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setFormData({ ...formData, imageUrl: url })
    if (url.trim() && !imageFile) {
      setImagePreview(url.trim())
    }
  }

  const clearImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setFormData({ ...formData, imageUrl: "" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      alert("Please Login to list a property!")
      setCurrentPage("login")
      return
    }

    if (!imageFile && !formData.imageUrl.trim()) {
      alert("Please upload an image file OR provide a direct Image Web URL / Gemini image!")
      return
    }

    setSubmitting(true)
    const data = new FormData()
    
    // Append form data
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key])
      }
    })

    if (user?._id || user?.id) {
      data.append("owner", user._id || user.id)
    }

    if (imageFile) {
      data.append("image", imageFile)
      data.append("images", imageFile)
    }

    try {
      const rawToken = localStorage.getItem("token")
      const token = rawToken ? rawToken.trim().replace(/^["']|["']$/g, "") : ""

      const res = await fetch(`${config.API_URL}/api/properties`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })

      const resData = await res.json().catch(() => ({}))

      if (res.ok || res.status === 201) {
        alert("🎉 Property Listed Successfully! View it in your published listings below.")
        if (resData.property) {
          setProperties((prev) => [
            resData.property,
            ...prev.filter(
              (p) =>
                (p._id || p.id) !== (resData.property._id || resData.property.id)
            ),
          ])
        }
        fetchProperties()
        setFormData({
          name: "",
          address: "",
          price: "",
          priceValue: "",
          bedrooms: "3",
          bathrooms: "2",
          area: "",
          type: "Apartment",
          status: "For Sale",
          leaseMonths: "12",
          priceType: "",
          imageUrl: "",
          video: "",
        })
        setImageFile(null)
        setImagePreview(null)
      } else {
        alert("Failed to list property: " + (resData.message || "Server Error"))
      }
    } catch (err) {
      console.error("Submit error:", err)
      alert("Error submitting property: " + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl p-10 border border-amber-500/20 shadow-2xl text-center relative overflow-hidden mb-10 text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <PlusCircle size={14} className="animate-pulse" /> Publish Luxury Property
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
            List for <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Sale or Rent</span>
          </h1>

          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Reach thousands of verified high-net-worth buyers and tenants in Ahmedabad. High valuation and instant exposure.
          </p>
        </motion.div>
      </div>

      {/* FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-slate-950/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl mb-16 text-white"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold flex items-center gap-2 text-amber-400">
            <Sparkles size={22} /> Add Property Listing
          </h2>
          <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
            {formData.status === "For Rent" ? "Rental Listing" : "Sale Listing"}
          </span>
        </div>

        {!user && (
          <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-2xl text-sm font-semibold flex items-center gap-3">
            <ShieldCheck size={20} /> Note: You need to log in to publish your listing.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Selection (Sale vs Rent) */}
          <div className="col-span-1 md:col-span-2 bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Tag size={18} />
              <span>Listing Purpose:</span>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: "status", value: "For Sale" } })}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  formData.status === "For Sale"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg scale-105"
                    : "bg-slate-950 text-gray-300 hover:text-white border border-amber-500/20"
                }`}
              >
                <span>For Sale</span>
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: "status", value: "For Rent" } })}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  formData.status === "For Rent"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg scale-105"
                    : "bg-slate-950 text-gray-300 hover:text-white border border-emerald-500/20"
                }`}
              >
                <Key size={14} />
                <span>For Rent</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Property Title *
            </label>
            <input
              name="name"
              placeholder="e.g. Modern Villa in Satellite"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Full Address *
            </label>
            <input
              name="address"
              placeholder="e.g. Satellite Road, Ahmedabad"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Area / Suburb *
            </label>
            <input
              name="area"
              placeholder="e.g. Satellite, Vastrapur, Nikol, Sola"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Property Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm font-bold focus:border-amber-400"
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Office">Office</option>
              <option value="Commercial">Commercial</option>
              <option value="Plot">Plot</option>
            </select>
          </div>

          {/* Pricing fields dynamic based on Sale vs Rent */}
          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              {formData.status === "For Rent" ? "Monthly Rent (Display Price) *" : "Total Sale Price (Display) *"}
            </label>
            <input
              name="price"
              placeholder={formData.status === "For Rent" ? "e.g. 45,000 / Month or 1.2 Lakhs" : "e.g. 1.5 Cr or 85 Lakhs"}
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              {formData.status === "For Rent" ? "Numeric Monthly Rent (for sorting) *" : "Numeric Price (for sorting) *"}
            </label>
            <input
              name="priceValue"
              type="number"
              placeholder={formData.status === "For Rent" ? "45000" : "15000000"}
              value={formData.priceValue}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
            />
          </div>

          {/* If For Rent: Show Lease Duration in Months */}
          {formData.status === "For Rent" && (
            <div>
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Calendar size={14} /> Minimum Lease Duration (Months) *
              </label>
              <input
                name="leaseMonths"
                type="number"
                min="1"
                placeholder="12"
                value={formData.leaseMonths}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-emerald-500/30 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-emerald-400 font-bold"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Bedrooms
            </label>
            <input
              name="bedrooms"
              type="number"
              placeholder="3"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Bathrooms
            </label>
            <input
              name="bathrooms"
              type="number"
              placeholder="2"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
            />
          </div>

          {/* FILE UPLOAD & URL INPUT (ANY TYPE, GEMINI, WEB URL) */}
          <div className="col-span-1 md:col-span-2 border border-amber-500/30 rounded-2xl p-6 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon size={16} /> Property Images (Upload File OR Paste Any URL / Gemini Image)
              </span>
              {imagePreview && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                >
                  <X size={14} /> Remove Image
                </button>
              )}
            </div>

            <div>
              <label className="cursor-pointer block border border-amber-500/30 hover:border-amber-400 bg-slate-950 p-6 rounded-2xl text-center transition-all">
                <Upload className="w-8 h-8 mx-auto text-amber-400 mb-2" />
                <span className="text-amber-300 font-bold text-sm hover:underline">
                  Select Image File (PNG, JPG, WEBP, GIF, SVG, AVIF, HEIC)
                </span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {imageFile && (
                  <p className="text-xs text-emerald-400 mt-2 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 size={14} /> Attached: {imageFile.name}
                  </p>
                )}
              </label>
            </div>

            <div className="pt-2">
              <label className="text-xs text-amber-300 flex items-center gap-1 mb-1 font-bold">
                <LinkIcon size={14} /> Option B: Direct Image Web URL or Gemini Generated Image Data
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleUrlChange}
                placeholder="https://images.unsplash.com/... or data:image/png;base64,... (Gemini)"
                className="w-full bg-slate-950 border border-amber-500/20 rounded-xl px-4 py-2.5 outline-none text-xs text-white focus:border-amber-400"
              />
            </div>

            {/* LIVE PREVIEW */}
            {imagePreview && (
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-2">Image Preview:</p>
                <div className="relative w-full max-w-xs h-40 rounded-2xl overflow-hidden border border-amber-400/50 shadow-xl">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg"
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="col-span-1 md:col-span-2 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all text-base disabled:opacity-50"
          >
            {submitting
              ? "Publishing Listing..."
              : user
              ? `Publish Property ${formData.status === "For Rent" ? "for Rent" : "for Sale"}`
              : "Login to List Property"}
          </motion.button>
        </form>
      </motion.div>

      {/* USER LISTINGS SECTION */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold mb-6 text-white">Your Published Property Listings ({properties.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-amber-400 font-bold col-span-full text-center">
              Loading your property listings...
            </p>
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
            <p className="col-span-full text-center text-gray-400 py-12 font-semibold">
              No properties listed yet. Publish your first property above!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sell


