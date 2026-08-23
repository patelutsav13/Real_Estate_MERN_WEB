"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react"
import config from "../config"
import PrimeEstateLogo from "./PrimeEstateLogo"

const Signup = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${config.API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Registration failed")
        setLoading(false)
        return
      }

      alert("🎉 Account created successfully! Please Sign In.")
      setCurrentPage("login")
    } catch (error) {
      alert("Server connection error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-amber-500/20 shadow-2xl text-gray-900 dark:text-white relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <PrimeEstateLogo className="h-12" showTagline={true} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Create Account</h2>
            <p className="text-xs text-gray-500 dark:text-amber-200/70 uppercase tracking-widest mt-1">Join PrimeEstate luxury network</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="admin@realestate.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:via-yellow-500 dark:to-amber-600 text-white dark:text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all disabled:opacity-50 text-base mt-2"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 dark:border-slate-800 pt-5">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => setCurrentPage("login")}
                className="text-blue-600 dark:text-amber-400 font-bold hover:underline ml-1"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
