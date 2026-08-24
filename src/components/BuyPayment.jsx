"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import config from "../config"
import { useAuth } from "../context/AuthContext"
import { getImageUrl } from "../utils/getImageUrl"
import { ShieldCheck, CreditCard, Sparkles } from "lucide-react"

const BuyPayment = ({ property, setCurrentPage }) => {
    const { user } = useAuth()
    const [paymentMethod, setPaymentMethod] = useState("BankTransfer")
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!user || !token) {
            setCurrentPage("login")
        }
    }, [user, setCurrentPage])

    if (!user || !property) return null

    const price = property.priceValue || 15000000
    const tax = price * 0.05
    const bookingFee = 50000
    const total = price + tax + bookingFee

    const handlePay = async () => {
        setProcessing(true)

        try {
            const rawToken = localStorage.getItem("token")
            const token = rawToken ? rawToken.trim().replace(/^["']|["']$/g, "") : ""

            const response = await fetch(`${config.API_URL}/api/buy/pay`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    propertyId: property._id || property.id,
                    amount: total,
                    paymentMethod
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Payment failed")
            }

            const data = await response.json()
            alert(`🎉 Property Acquisition Confirmed!\nRedirecting to your dashboard to view your purchase record.`)
            setCurrentPage("dashboard")
        } catch (error) {
            console.error("Payment error:", error)
            alert(`❌ Payment failed: ${error.message}`)
        } finally {
            setProcessing(false)
        }
    }

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
                            Property Acquisition
                        </span>
                        <h2 className="text-3xl font-extrabold mb-2 text-white">{property.name}</h2>
                        <p className="text-xs text-amber-200/80 mb-6">📍 {property.address || property.area}</p>
                        <img src={getImageUrl(property.image)} alt={property.name} className="w-full h-48 object-cover rounded-2xl shadow-xl mb-6 border border-amber-500/20" />

                        <div className="space-y-1 text-xs text-gray-300 font-semibold">
                            <p>🛏 {property.bedrooms} Bedrooms</p>
                            <p>🚿 {property.bathrooms} Bathrooms</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-amber-500/20">
                        <p className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Total Acquisition Cost</p>
                        <p className="text-4xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">₹{total.toLocaleString()}</p>
                    </div>
                </div>

                {/* Right Form */}
                <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl font-extrabold text-amber-300 mb-6 flex items-center gap-2">
                        <CreditCard size={22} /> Confirm Acquisition
                    </h3>

                    <div className="mb-6 bg-slate-900 p-4 rounded-2xl border border-amber-500/20 text-xs">
                        <p className="text-amber-400 font-bold uppercase tracking-wider mb-1">Buyer Details</p>
                        <p className="font-extrabold text-white text-sm">{user.name}</p>
                        <p className="text-gray-300">{user.email}</p>
                    </div>

                    <div className="space-y-3 mb-8 border-t border-b border-amber-500/20 py-4 text-xs font-semibold">
                        <div className="flex justify-between text-gray-300">
                            <span>Base Property Value</span>
                            <span className="font-bold text-white">₹{price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                            <span>Govt. Tax (5%)</span>
                            <span className="font-bold text-white">₹{tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                            <span>Registration & Escrow Fee</span>
                            <span className="font-bold text-white">₹{bookingFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-extrabold text-base text-amber-300 pt-2 border-t border-amber-500/20">
                            <span>Total Payable</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">Select Payment Option</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white font-bold text-xs"
                        >
                            <option value="BankTransfer" className="bg-slate-950">Wire Bank Transfer</option>
                            <option value="UPI" className="bg-slate-950">UPI (GPay / PhonePe / BHIM)</option>
                            <option value="COD" className="bg-slate-950">Cheque / Cash Deposit</option>
                        </select>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePay}
                        disabled={processing}
                        className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all disabled:opacity-50 text-base"
                    >
                        {processing ? "Processing Transfer..." : `Pay ₹${total.toLocaleString()}`}
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

export default BuyPayment
