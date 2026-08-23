"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import config from "../config"
import { Mail, ArrowLeft } from "lucide-react"

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${config.API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setIsSubmitted(true)
      } else {
        alert(data.message || "Failed to send reset link")
      }
    } catch (err) {
      alert("Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-slate-950/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-2xl text-white">
          <button
            onClick={() => setCurrentPage("login")}
            className="flex items-center gap-2 text-amber-300 hover:text-amber-400 text-xs font-bold mb-6"
          >
            <ArrowLeft size={16} />
            <span>Back to Login</span>
          </button>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-amber-300 mb-2">Forgot Password?</h2>
                <p className="text-xs text-amber-200/70">Enter your registered email to reset your account password</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white text-sm"
                      placeholder="admin@realestate.com"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl transition-all disabled:opacity-50 text-base"
                >
                  {loading ? "Sending Link..." : "Send Password Reset Link"}
                </motion.button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <Mail size={32} />
              </div>
              <h2 className="text-xl font-extrabold text-white mb-2">Check Your Inbox</h2>
              <p className="text-xs text-amber-200/80 mb-6">
                Password reset instructions have been sent to <strong>{email}</strong>
              </p>
              <button
                onClick={() => setCurrentPage("login")}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 rounded-xl font-extrabold text-xs"
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
