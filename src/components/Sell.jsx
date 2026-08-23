"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import config from "../config"
import PropertyCard from "./PropertyCard"
import { PlusCircle, Upload, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"

const Sell = ({ openDetails, setCurrentPage }) => {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    priceValue: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "Apartment",
    status: "For Sale",
  })

  const [imageFile, setImageFile] = useState(null)

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await fetch(`${config.API_URL}/api/properties/my-listings`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await res.json()
      const myListings = data.filter(p => p.status === "For Sale" || p.status === "Sell")
      setProperties(myListings)
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      alert("Please Login to list a property!")
      setCurrentPage("login")
      return
    }

    if (!imageFile) {
      alert("Please upload an image!")
      return
    }

    const data = new FormData()
    Object.keys(formData).forEach(key => data.append(key, formData[key]))
    data.append("image", imageFile)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${config.API_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: data,
      })

      if (res.ok) {
        alert("🎉 Property Listed Successfully!")
        fetchProperties()
        setFormData({
          name: "", address: "", price: "", priceValue: "", bedrooms: "", bathrooms: "", area: "",
          type: "Apartment", status: "For Sale"
        })
        setImageFile(null)
      } else {
        const errData = await res.json()
        alert("Failed to list property: " + (errData.message || JSON.stringify(errData)))
      }
    } catch (err) {
      console.error(err)
      alert("Error submitting form: " + err.message)
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
          className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl p-10 border border-amber-500/20 shadow-2xl text-center relative overflow-hidden mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <PlusCircle size={14} className="animate-pulse" /> List Your Luxury Asset
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
            Sell Your <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Property</span>
          </h1>

          <p className="text-gray-300 max-w-xl mx-auto text-base">
            Reach thousands of verified buyers in Ahmedabad. High valuation and instant property listing.
          </p>
        </motion.div>
      </div>

      {/* FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-gray-200 dark:border-amber-500/20 shadow-2xl mb-16 text-gray-900 dark:text-white"
      >
        <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2 text-gray-900 dark:text-amber-400">
          <Sparkles size={22} /> Add Property Details
        </h2>

        {!user && (
          <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-300 rounded-2xl text-sm font-semibold flex items-center gap-3">
            <ShieldCheck size={20} /> Note: You need to log in to publish your listing.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Property Title *</label>
            <input name="name" placeholder="e.g. Modern Villa in Satellite" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Full Address *</label>
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Area / Suburb *</label>
            <input name="area" placeholder="e.g. Satellite" value={formData.area} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Property Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none">
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Display Price *</label>
            <input name="price" placeholder="e.g. 1.5 Cr" value={formData.price} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Numeric Price (for filtering) *</label>
            <input name="priceValue" type="number" placeholder="15000000" value={formData.priceValue} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Bedrooms</label>
            <input name="bedrooms" type="number" placeholder="3" value={formData.bedrooms} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Bathrooms</label>
            <input name="bathrooms" type="number" placeholder="2" value={formData.bathrooms} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none" />
          </div>

          {/* FILE UPLOAD INPUT */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-2">Upload High Res Property Image *</label>
            <label className="cursor-pointer block border-2 border-dashed border-gray-300 dark:border-amber-500/30 hover:border-amber-400 bg-gray-50 dark:bg-slate-950 p-6 rounded-2xl text-center transition-all">
              <Upload className="w-8 h-8 mx-auto text-blue-600 dark:text-amber-400 mb-2" />
              <span className="text-blue-600 dark:text-amber-300 font-bold hover:underline">Select Image File (PNG, JPG, WEBP)</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              {imageFile && (
                <p className="text-xs text-emerald-500 mt-2 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 size={14} /> Attached: {imageFile.name}
                </p>
              )}
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="col-span-1 md:col-span-2 py-4 bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:via-yellow-500 dark:to-amber-600 text-white dark:text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all text-base"
          >
            {user ? "Publish Property Listing" : "Login to List Property"}
          </motion.button>
        </form>
      </motion.div>

      {/* USER LISTINGS SECTION */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white">Your Published Property Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-amber-400 font-bold col-span-full text-center">Loading your property listings...</p>
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
              No properties listed for sale yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sell
