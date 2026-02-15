





"use client"

import { useState, useEffect } from "react"
import config from "../config"
import { Heart, Bed, Bath, MapPin } from "lucide-react"

const PropertyDetail = ({ property, goBack, setCurrentPage }) => {
  if (!property) return null

  const [liked, setLiked] = useState(false)
  const [showPayRent, setShowPayRent] = useState(false)

  const [months, setMonths] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("GPay")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  // ✅ Fetch Fresh Property Data to Checking Real-time Status
  const [currentProperty, setCurrentProperty] = useState(property)

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

  // ✅ Detect Rent Property
  const isRentProperty = currentProperty.source === "rent"

  const actionText = isRentProperty ? "Pay Rent" : "Buy Now"
  const totalPrice = Number(currentProperty.price) * months

  // ✅ Button Action Logic (Rent / Buy)
  const handleAction = () => {
    // 🚫 CHECK STATUS FIRST
    if (currentProperty.status === "Booked") {
      alert("⚠️ This Property Already Taken (Booked) \n\n You cannot buy this property again.")
      return
    }
    if (currentProperty.status === "Rented") {
      alert("⚠️ This Property Already Rented")
      return
    }

    const token = localStorage.getItem("token")

    // 🔒 If user not logged in → redirect to login
    if (!token) {
      setCurrentPage("login")
      return
    }

    // 🏠 RENT FLOW
    if (isRentProperty) {
      setCurrentPage("pay-rent")
      return
    }

    // 🛒 BUY FLOW
    setCurrentPage("buy-payment")
  }

  // ✅ Rent Payment Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name: formData.name,
      email: formData.email,
      propertyName: currentProperty.name,
      address: currentProperty.address || currentProperty.area,
      rentPerMonth: Number(currentProperty.price),
      months,
      totalPrice,
      paymentMethod,
    }

    try {
      const res = await fetch(`${config.API_URL}/api/rent/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Payment failed")
        return
      }

      alert("✅ Rent payment saved successfully")
      setShowPayRent(false)
    } catch (error) {
      console.error(error)
      alert("❌ Server error")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* IMAGE */}
        <div className="relative">
          <img
            src={
              currentProperty.image?.startsWith("http") || currentProperty.image?.startsWith("data:")
                ? currentProperty.image
                : currentProperty.image?.startsWith("/uploads")
                  ? `${config.API_URL}${currentProperty.image}`
                  : currentProperty.image || "/placeholder.svg"
            }
            alt={currentProperty.name}
            className="w-full h-[420px] object-cover"
          />

          {currentProperty.status && (
            <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-white font-bold
              ${currentProperty.status === "For Rent" ? "bg-green-500" : "bg-blue-500"}`}>
              {currentProperty.status}
            </div>
          )}

          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white shadow"
          >
            <Heart className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        </div>

        {/* DETAILS */}
        <div className="p-10">
          <h1 className="text-4xl font-bold mb-4">{currentProperty.name}</h1>

          <div className="flex items-center text-gray-600 mb-6">
            <MapPin className="w-5 h-5 mr-2" />
            {currentProperty.address || currentProperty.area}, Ahmedabad
          </div>

          <div className="flex justify-center gap-12 mb-8">
            <div className="flex items-center gap-3">
              <Bed className="w-6 h-6 text-blue-600" />
              {currentProperty.bedrooms} Bedrooms
            </div>
            <div className="flex items-center gap-3">
              <Bath className="w-6 h-6 text-blue-600" />
              {currentProperty.bathrooms} Bathrooms
            </div>
          </div>

          <div className="text-center mb-10">
            <span className="text-5xl font-bold text-blue-600">
              ₹{currentProperty.price}
            </span>
            {currentProperty.priceType && (
              <span className="text-xl text-gray-500 ml-2">
                /{currentProperty.priceType}
              </span>
            )}
          </div>

          {/* ACTION BUTTON */}
          <div className="text-center mb-8">
            <button
              onClick={handleAction}
              className={`px-16 py-5 text-xl font-bold text-white rounded-xl transition transform hover:scale-105 shadow-xl
                ${(currentProperty.status === "Booked")
                  ? "bg-gray-500 cursor-not-allowed hover:bg-gray-600" // Grey BG for Booked
                  : (currentProperty.status === "Rented")
                    ? "bg-gray-400 cursor-not-allowed hover:bg-gray-500"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
            >
              {currentProperty.status === "Booked" ? "Booked (Sold Out)" : currentProperty.status === "Rented" ? "Rented ❌" : actionText}
            </button>
          </div>

          {/* ✅ PAY RENT FORM (ONLY FOR RENT) */}
          {isRentProperty && showPayRent && (
            <form
              onSubmit={handleSubmit}
              className="mt-10 p-8 bg-gray-100 dark:bg-gray-700 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Pay Rent
              </h2>

              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full mb-4 p-3 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="w-full mb-4 p-3 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <div className="flex gap-4 mb-4">
                <select
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-1/2 p-3 rounded"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Month(s)
                    </option>
                  ))}
                </select>

                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-1/2 p-3 rounded"
                >
                  <option>GPay</option>
                  <option>PhonePe</option>
                  <option>UPI</option>
                  <option>COD</option>
                </select>
              </div>

              <div className="text-center font-bold text-xl mb-6">
                Total: ₹{totalPrice}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Continue Payment
              </button>
            </form>
          )}

          {/* BACK */}
          <div className="text-center mt-8">
            <button
              onClick={goBack}
              className="text-gray-500 hover:text-blue-600 underline"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail

