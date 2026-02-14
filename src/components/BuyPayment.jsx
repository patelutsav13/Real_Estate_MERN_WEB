"use client"

import { useState, useEffect } from "react"
import config from "../config"
import { useAuth } from "../context/AuthContext"

const BuyPayment = ({ property, setCurrentPage }) => {
    const { user } = useAuth()
    const [paymentMethod, setPaymentMethod] = useState("COD")
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!user || !token) {
            setCurrentPage("login")
        }
    }, [user, setCurrentPage])

    if (!user) return null

    const handlePay = async () => {
        setProcessing(true)

        try {
            const token = localStorage.getItem("token")
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
            alert(`✅ ${data.message}`)
            setCurrentPage("explore")
        } catch (error) {
            console.error("Payment error:", error)
            alert(`❌ Payment failed: ${error.message}`)
        } finally {
            setProcessing(false)
        }
    }

    // Fees calculation (Mock)
    const price = property.priceValue
    const tax = price * 0.05 // 5% Tax
    const bookingFee = 50000
    const total = price + tax + bookingFee

    return (
        <div className="min-h-screen flex justify-center items-center py-12 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left: Property Details */}
                <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-600 to-purple-700 text-white flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">{property.name}</h2>
                        <p className="opacity-90 mb-6 flex items-center gap-2">
                            📍 {property.address}
                        </p>
                        <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-lg shadow-lg mb-6 border-4 border-white/20" />

                        <div className="space-y-2 text-sm opacity-90">
                            <p>🛏 {property.bedrooms} Bedrooms</p>
                            <p>🚿 {property.bathrooms} Bathrooms</p>
                            <p>📏 {property.area}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <p className="text-xs uppercase tracking-wider opacity-70">Total Amount</p>
                        <p className="text-4xl font-bold">₹{(total).toLocaleString()}</p>
                    </div>
                </div>

                {/* Right: Payment Form */}
                <div className="md:w-1/2 p-8 bg-white dark:bg-gray-800">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Confirm Purchase</h3>

                    {/* User Info */}
                    <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Buyer</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-8 border-t border-b border-gray-100 dark:border-gray-700 py-4">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Property Price</span>
                            <span>₹{price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Govt. Tax (5%)</span>
                            <span>₹{tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Booking Fee</span>
                            <span>₹{bookingFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-2">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Payment Method</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="COD">Cash / Cheque</option>
                            <option value="BankTransfer">Bank Transfer</option>
                            <option value="UPI">UPI (GPay/PhonePe)</option>
                        </select>
                    </div>

                    <button
                        onClick={handlePay}
                        disabled={processing}
                        className="w-full py-4 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
                    >
                        {processing ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
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

export default BuyPayment
