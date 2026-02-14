"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import config from "../config"
import SearchBar from "./SearchBar"
import PropertyCard from "./PropertyCard"
import FilterPanel from "./FilterPanel"

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

  // Fetch User's Properties
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

      // Show User's properites (all types or filtered as needed? "Your Listings" implies all user's listings that are For Sale)
      // User requested: "if you add in this dashboard property for sell then also come in this sell page"
      // Dashboard shows ALL user listings. Sell page title is "Your Listings (For Sale)".
      // So we should filter checking for "For Sale" status.
      // Also ensuring flexibility with status strings if user entered "Sell" manually.
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

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle File Change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Auth Check
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
      const token = localStorage.getItem("token") // Get token for auth
      const res = await fetch(`${config.API_URL}/api/properties`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: data,
      })

      if (res.ok) {
        alert("Property Listed Successfully!")
        fetchProperties() // Refresh list
        // Reset form
        setFormData({
          name: "", address: "", price: "", priceValue: "", bedrooms: "", bathrooms: "", area: "",
          type: "Apartment", status: "For Sale"
        })
        setImageFile(null)
      } else {
        const errData = await res.json()
        console.error("Server Error:", errData)
        alert("Failed to list property: " + (errData.message || JSON.stringify(errData)))
      }
    } catch (err) {
      console.error(err)
      alert("Error submitting form: " + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Sell Your <span className="text-blue-600">Property</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          List your property here and it will appear in the Buy section.
        </p>
      </div>

      {/* FORM SECTION */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Property</h2>

        {!user && (
          <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
            Note: You need to be logged in to list a property.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Property Title (e.g. Luxury Villa)" value={formData.name} onChange={handleChange} required className="input p-3 border rounded w-full" />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="input p-3 border rounded w-full" />
          <input name="area" placeholder="Area (e.g. Satellite)" value={formData.area} onChange={handleChange} required className="input p-3 border rounded w-full" />

          <select name="type" value={formData.type} onChange={handleChange} className="input p-3 border rounded w-full">
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
          </select>

          <input name="price" placeholder="Display Price (e.g. 1.5 Cr)" value={formData.price} onChange={handleChange} required className="input p-3 border rounded w-full" />
          <input name="priceValue" type="number" placeholder="Numeric Price (e.g. 15000000)" value={formData.priceValue} onChange={handleChange} required className="input p-3 border rounded w-full" />

          <input name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required className="input p-3 border rounded w-full" />
          <input name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required className="input p-3 border rounded w-full" />

          <select name="status" value={formData.status} onChange={handleChange} className="input p-3 border rounded w-full">
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>

          {/* FILE UPLOAD INPUT */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload Property Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              required
            />
          </div>

          <button type="submit" className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition shadow-lg">
            {user ? "List Property" : "Login to List"}
          </button>
        </form>
      </div>

      {/* LIST SECTION */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your Listings (For Sale)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-gray-500">Loading properties...</p>
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
              No properties listed for sale yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sell