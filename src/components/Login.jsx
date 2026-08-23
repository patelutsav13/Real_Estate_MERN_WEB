"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import config from "../config"
import PrimeEstateLogo from "./PrimeEstateLogo"

const Login = ({ setCurrentPage }) => {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${config.API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Invalid email or password")
        setLoading(false)
        return
      }

      login(data.user, data.token)
      alert("🎉 Login successful!")
      setCurrentPage("explore")
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
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
            <p className="text-xs text-gray-500 dark:text-amber-200/70 uppercase tracking-widest mt-1">Sign in to your luxury account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="admin@realestate.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-300">
                <input type="checkbox" className="w-4 h-4 accent-amber-500 rounded" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setCurrentPage("forgot-password")}
                className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:via-yellow-500 dark:to-amber-600 text-white dark:text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all disabled:opacity-50 text-base"
            >
              {loading ? "Authenticating..." : "Sign In to PrimeEstate"}
            </motion.button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 dark:border-slate-800 pt-6">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => setCurrentPage("signup")}
                className="text-blue-600 dark:text-amber-400 font-bold hover:underline ml-1"
              >
                Register Now
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
