"use client"

import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("🎉 Thank you for reaching out to PrimeEstate! Our luxury advisor will contact you shortly.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="animate-pulse" /> Direct Concierge Service
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Contact <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">PRIMEESTATE</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-amber-200/80 max-w-xl mx-auto font-serif">
            Get in touch with our luxury estate advisory team for personal consultations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-amber-500/20 shadow-2xl text-gray-900 dark:text-white"
          >
            <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-amber-400">Send an Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="e.g. Utsav Patel"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Subject / Inquiry Type *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none"
                  placeholder="Villa Acquisition / Estate Rental"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Message Details *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl outline-none resize-none"
                  placeholder="Tell us about your property preferences..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:via-yellow-500 dark:to-amber-600 text-white dark:text-slate-950 rounded-2xl font-extrabold shadow-xl text-base"
              >
                <Send size={18} />
                <span>Submit Inquiry</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-amber-500/20 shadow-xl text-gray-900 dark:text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded-2xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Direct Phone</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">+91 98765 43211</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-amber-500/20 shadow-xl text-gray-900 dark:text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded-2xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email Concierge</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">concierge@primeestate.com</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">support@primeestate.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 dark:border-amber-500/20 shadow-xl text-gray-900 dark:text-white">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Headquarters</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    PrimeEstate Tower, 501 Luxury Plaza,<br />
                    Satellite Road, Ahmedabad - 380015,<br />
                    Gujarat, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
