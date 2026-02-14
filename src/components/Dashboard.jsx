"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../config"
import { useAuth } from "../context/AuthContext"

const Dashboard = ({ setCurrentPage }) => {
  const { user } = useAuth()
  const [rentHistory, setRentHistory] = useState([])
  const [purchaseHistory, setPurchaseHistory] = useState([])
  const [myListings, setMyListings] = useState([])
  const [activeTab, setActiveTab] = useState("rent") // rent, buy, listings
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      setLoading(true)
      const token = localStorage.getItem("token")
      const config = { headers: { Authorization: `Bearer ${token}` } }

      try {
        // Fetch Rent History
        const rentRes = await axios.get(`${API}/api/rent/my-rentals`, config)
        setRentHistory(rentRes.data)

        // Fetch Purchase History
        const buyRes = await axios.get(`${API}/api/buy/my-purchases`, config)
        setPurchaseHistory(buyRes.data)

        // Fetch My Listings
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

  if (!user) return <div className="p-8 text-center text-red-500">Please Login first!</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* WELCOME SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="opacity-90">{user.email}</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 transform skew-x-12"></div>
        </div>

        {/* TABS */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-2 flex space-x-2">
          {[
            { id: "rent", label: "My Rentals" },
            { id: "buy", label: "My Purchases" },
            { id: "listings", label: "My Properties" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow min-h-[400px] p-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* RENTALS */}
              {activeTab === "rent" && (
                <div>
                  <h2 className="text-xl font-bold mb-4 dark:text-white">Active Rentals</h2>
                  {rentHistory.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No rentals found</p>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {rentHistory.map(item => (
                        <div key={item._id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition dark:bg-gray-900 group bg-white">
                          <div className="relative">
                            <img
                              src={item.property?.image || "https://via.placeholder.com/400x300?text=No+Image"}
                              alt={item.property?.name}
                              className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-semibold ${item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              item.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {item.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-lg dark:text-white truncate">{item.property?.name || "Unknown Property"}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.property?.address || "No Address"}</p>

                          <div className="flex justify-between items-center mt-3 pt-3 border-t dark:border-gray-700">
                            <div>
                              <p className="text-xs text-gray-500">Rent Amount</p>
                              <span className="font-bold text-blue-600">₹{item.amount.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Duration</p>
                              <span className="text-sm font-medium dark:text-gray-300">{item.months} Months</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-2 text-center">Rented on {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* PURCHASES */}
              {activeTab === "buy" && (
                <div>
                  <h2 className="text-xl font-bold mb-4 dark:text-white">Property Purchases</h2>
                  {purchaseHistory.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No purchases found</p>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {purchaseHistory.map(item => (
                        <div key={item._id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition dark:bg-gray-900 group bg-white">
                          <div className="relative">
                            <img
                              src={item.property?.image || "https://via.placeholder.com/400x300?text=No+Image"}
                              alt={item.property?.name}
                              className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-semibold ${item.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              item.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {item.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-lg dark:text-white truncate">{item.property?.name || "Unknown Property"}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.property?.address || "No Address"}</p>

                          <div className="flex justify-between items-center mt-3 pt-3 border-t dark:border-gray-700">
                            <div>
                              <p className="text-xs text-gray-500">Paid Amount</p>
                              <span className="font-bold text-purple-600">₹{item.amount.toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Method</p>
                              <span className="text-sm font-medium dark:text-gray-300">{item.paymentMethod}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-2 text-center">Purchased on {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* LISTINGS */}
              {activeTab === "listings" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold dark:text-white">My Properties for Sale/Rent</h2>
                    <button
                      onClick={() => setCurrentPage("sell")}
                      className="text-sm bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                    >
                      + Add New
                    </button>
                  </div>

                  {myListings.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">You haven't listed any properties</p>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {myListings.map(item => (
                        <div key={item._id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition dark:bg-gray-900 group">
                          <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-3" />
                          <h3 className="font-bold dark:text-white truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.address}</p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="font-bold text-blue-600">₹{item.priceValue.toLocaleString()}</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{item.status}</span>
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
