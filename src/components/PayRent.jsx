




"use client"

import { useState, useEffect } from "react"
import config from "../config"
import { useAuth } from "../context/AuthContext"

const PayRent = ({ property, setCurrentPage }) => {
  const { user } = useAuth()
  const [months, setMonths] = useState(1)
  const [loading, setLoading] = useState(false)

  // Rent Calculation
  // Assume priceValue is the monthly rent? Or is it property value?
  // Let's assume for Rent Properties, the api returns a monthly rent in price field or we derive it.
  // For safety, let's assume property.priceValue is the monthly rent if status is "For Rent".
  const monthlyRent = property.priceValue || 25000 // Fallback
  const serviceFee = 500
  const totalAmount = (monthlyRent * months) + serviceFee

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!user || !token) {
      setCurrentPage("login")
    }
  }, [user, setCurrentPage])

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      const res = await fetch(`${config.API_URL}/api/rent/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          propertyId: property._id || property.id,
          amount: totalAmount,
          months,
          paymentMethod: "Credit Card (Simulated)",
        }),
      })

      if (res.ok) {
        alert(`Rent Paid Successfully! ₹${totalAmount}`)
        setCurrentPage("explore")
      } else {
        alert("Payment failed")
      }
    } catch (err) {
      console.error(err)
      alert("Error processing payment")
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex justify-center items-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left: Property Details */}
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col justify-between">
          <div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Rent</span>
            <h2 className="text-3xl font-bold mb-2">{property.name}</h2>
            <p className="opacity-90 mb-6 flex items-center gap-2">
              📍 {property.address}
            </p>
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-lg shadow-lg mb-6 border-4 border-white/20" />

            <div className="space-y-2 text-sm opacity-90">
              <p>Monthly Rent: ₹{monthlyRent.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider opacity-70">Total Payable</p>
            <p className="text-4xl font-bold">₹{totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Right: Payment Detail */}
        <div className="md:w-1/2 p-8 bg-white dark:bg-gray-800 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Details</h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Duration (Months)</label>
            <input
              type="number"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Breakdown */}
          <div className="space-y-3 mb-8 border-t border-b border-gray-100 dark:border-gray-700 py-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Rent x {months}</span>
              <span>₹{(monthlyRent * months).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Service Fee</span>
              <span>₹{serviceFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-2">
              <span>Total</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:scale-[1.02] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Pay Securely"}
          </button>
          <button
            onClick={() => setCurrentPage("explore")}
            className="w-full mt-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default PayRent

