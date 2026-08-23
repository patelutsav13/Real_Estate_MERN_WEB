"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import config from "../config"
import { useAuth } from "../context/AuthContext"
import { getImageUrl } from "../utils/getImageUrl"
import { ShieldCheck, CreditCard, Sparkles } from "lucide-react"

const PayRent = ({ property, setCurrentPage }) => {
  const { user } = useAuth()
  const [months, setMonths] = useState(1)
  const [loading, setLoading] = useState(false)

  const monthlyRent = property?.priceValue || 25000
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
          paymentMethod: "Credit Card (Encrypted)",
        }),
      })

      if (res.ok) {
        alert(`🎉 Rent Payment Successful! Total Paid: ₹${totalAmount.toLocaleString()}`)
        setCurrentPage("explore")
      } else {
        alert("Payment processing failed")
      }
    } catch (err) {
      console.error(err)
      alert("Error processing payment")
    } finally {
      setLoading(false)
    }
  }

  if (!user || !property) return null

  return (
    <div className="min-h-screen flex justify-center items-center py-12 px-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col md:flex-row text-white"
      >
        {/* Left Info */}
        <div className="md:w-1/2 p-8 sm:p-10 bg-slate-900/90 border-r border-amber-500/20 flex flex-col justify-between">
          <div>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 inline-block">
              Rental Checkout
            </span>
            <h2 className="text-3xl font-extrabold mb-2 text-white">{property.name}</h2>
            <p className="text-xs text-amber-200/80 mb-6">📍 {property.address || property.area}</p>
            <img src={getImageUrl(property.image)} alt={property.name} className="w-full h-48 object-cover rounded-2xl shadow-xl mb-6 border border-amber-500/20" />

            <p className="text-xs text-gray-300">Monthly Rent: <span className="font-extrabold text-amber-400">₹{monthlyRent.toLocaleString()}</span></p>
          </div>

          <div className="mt-8 pt-4 border-t border-amber-500/20">
            <p className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Total Amount Payable</p>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">₹{totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-extrabold text-amber-300 mb-6 flex items-center gap-2">
            <CreditCard size={22} /> Rent Payment Details
          </h3>

          <div className="mb-6">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">Lease Duration (Months)</label>
            <input
              type="number"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white font-bold"
            />
          </div>

          <div className="space-y-3 mb-8 border-t border-b border-amber-500/20 py-4 text-xs font-semibold">
            <div className="flex justify-between text-gray-300">
              <span>Rent x {months} Month(s)</span>
              <span className="font-bold text-white">₹{(monthlyRent * months).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Platform Processing Fee</span>
              <span className="font-bold text-white">₹{serviceFee}</span>
            </div>
            <div className="flex justify-between font-extrabold text-base text-amber-300 pt-2 border-t border-amber-500/20">
              <span>Total Payable</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all disabled:opacity-50 text-base"
          >
            {loading ? "Processing Encrypted Payment..." : "Pay Securely"}
          </motion.button>
          <button
            onClick={() => setCurrentPage("explore")}
            className="w-full mt-3 py-2 text-xs text-amber-200/70 hover:text-white transition font-bold"
          >
            Cancel Transaction
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default PayRent
