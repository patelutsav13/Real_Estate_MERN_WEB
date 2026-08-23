"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { API } from "../config"
import { useAuth } from "../context/AuthContext"
import { Sparkles, Key, ShoppingBag, Plus, Home } from "lucide-react"
import { getImageUrl } from "../utils/getImageUrl"

const Dashboard = ({ setCurrentPage }) => {
  const { user } = useAuth()
  const [rentHistory, setRentHistory] = useState([])
  const [purchaseHistory, setPurchaseHistory] = useState([])
  const [myListings, setMyListings] = useState([])
  const [activeTab, setActiveTab] = useState("rent")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      setLoading(true)
      const token = localStorage.getItem("token")
      const config = { headers: { Authorization: `Bearer ${token}` } }

      try {
        const rentRes = await axios.get(`${API}/api/rent/my-rentals`, config)
        setRentHistory(rentRes.data)

        const buyRes = await axios.get(`${API}/api/buy/my-purchases`, config)
        setPurchaseHistory(buyRes.data)

        const listRes = await axios.get(`${API}/api/properties/my-listings`, config)
        setMyListings(listRes.data)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (!user) return <div className="p-8 text-center text-amber-400 font-bold">Please Sign In to view your Dashboard</div>

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* WELCOME BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-2xl text-white relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles size={14} className="animate-pulse" /> PrimeEstate Member Account
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                Welcome back, <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">{user.name}</span>!
              </h1>
              <p className="text-xs text-amber-200/70 mt-1">{user.email}</p>
            </div>

            <button
              onClick={() => setCurrentPage("sell")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl hover:scale-105 transition-all text-xs"
            >
              <Plus size={16} />
              <span>Publish Property</span>
            </button>
          </div>
        </motion.div>

        {/* TABS */}
        <div className="bg-slate-950/80 backdrop-blur-2xl rounded-2xl p-2 border border-amber-500/20 shadow-xl flex space-x-2">
          {[
            { id: "rent", label: "My Rentals", icon: Key },
            { id: "buy", label: "My Purchases", icon: ShoppingBag },
            { id: "listings", label: "My Published Estates", icon: Home }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-slate-900"
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-amber-500/30 shadow-2xl min-h-[400px] p-6 sm:p-8 text-white">
          {loading ? (
            <div className="flex justify-center items-center h-48 text-amber-400 font-bold">
              Loading your dashboard data...
            </div>
          ) : (
            <>
              {/* RENTALS */}
              {activeTab === "rent" && (
                <div>
                  <h2 className="text-xl font-extrabold text-amber-300 mb-6">Active Rentals</h2>
                  {rentHistory.length === 0 ? (
                    <p className="text-amber-200/70 text-center py-12 font-semibold">No rental history found</p>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {rentHistory.map(item => (
                        <div key={item._id} className="bg-slate-900 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-400/50 transition shadow-lg">
                          <div className="relative mb-3">
                            <img
                              src={getImageUrl(item.property?.image)}
                              alt={item.property?.name}
                              className="w-full h-40 object-cover rounded-xl"
                            />
                            <span className="absolute top-2 right-2 text-[10px] px-3 py-1 rounded-full font-bold bg-emerald-600 text-white">
                              {item.status || "Active"}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-base text-white truncate">{item.property?.name || "Rental Property"}</h3>
                          <p className="text-xs text-amber-200/70 truncate">{item.property?.address || "Ahmedabad"}</p>

                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-amber-500/20 text-xs">
                            <div>
                              <p className="text-[10px] text-gray-400">Rent Amount</p>
                              <span className="font-extrabold text-amber-400">₹{item.amount?.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-gray-400">Duration</p>
                              <span className="font-bold text-white">{item.months} Months</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PURCHASES */}
              {activeTab === "buy" && (
                <div>
                  <h2 className="text-xl font-extrabold text-amber-300 mb-6">Property Acquisitions</h2>
                  {purchaseHistory.length === 0 ? (
                    <p className="text-amber-200/70 text-center py-12 font-semibold">No purchase history found</p>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {purchaseHistory.map(item => (
                        <div key={item._id} className="bg-slate-900 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-400/50 transition shadow-lg">
                          <div className="relative mb-3">
                            <img
                              src={getImageUrl(item.property?.image)}
                              alt={item.property?.name}
                              className="w-full h-40 object-cover rounded-xl"
                            />
                            <span className="absolute top-2 right-2 text-[10px] px-3 py-1 rounded-full font-bold bg-emerald-600 text-white">
                              {item.status || "Completed"}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-base text-white truncate">{item.property?.name || "Acquired Estate"}</h3>
                          <p className="text-xs text-amber-200/70 truncate">{item.property?.address || "Ahmedabad"}</p>

                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-amber-500/20 text-xs">
                            <div>
                              <p className="text-[10px] text-gray-400">Amount Paid</p>
                              <span className="font-extrabold text-amber-400">₹{item.amount?.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-gray-400">Method</p>
                              <span className="font-bold text-white">{item.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* MY LISTINGS */}
              {activeTab === "listings" && (
                <div>
                  <h2 className="text-xl font-extrabold text-amber-300 mb-6">Published Property Listings</h2>
                  {myListings.length === 0 ? (
                    <p className="text-amber-200/70 text-center py-12 font-semibold">You haven't published any properties yet</p>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {myListings.map(item => (
                        <div key={item._id} className="bg-slate-900 border border-amber-500/20 rounded-2xl p-4 hover:border-amber-400/50 transition shadow-lg">
                          <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-40 object-cover rounded-xl mb-3" />
                          <h3 className="font-extrabold text-base text-white truncate">{item.name}</h3>
                          <p className="text-xs text-amber-200/70 truncate">{item.address}</p>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-amber-500/20">
                            <span className="font-extrabold text-amber-400">₹{item.priceValue?.toLocaleString()}</span>
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full font-bold">{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard
