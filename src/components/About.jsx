"use client"

import { motion } from "framer-motion"
import { Award, Users, Building2, Target, Sparkles } from "lucide-react"
import amd_Estate from "../assets/amd_real.png"

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Excellence",
      description: "Over 10 years of excellence in luxury real estate services in Ahmedabad",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "15+ professional agents with local high-end market expertise",
    },
    {
      icon: Building2,
      title: "Exclusive Estates",
      description: "50+ luxury villas, apartments, and penthouses",
    },
    {
      icon: Target,
      title: "Client First",
      description: "100% transparent transactions with personalized guidance",
    },
  ]

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
            <Sparkles size={14} className="animate-pulse" /> Legacy of Distinction
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">PRIMEESTATE</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-amber-200/80 max-w-3xl mx-auto font-serif">
            Your premier partner in luxury living, estate acquisitions, and real estate investments.
          </p>
        </motion.div>

        {/* Hero Image Banner with Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-amber-500/20 max-h-[480px] relative"
        >
          <img src={amd_Estate} alt="PrimeEstate Ahmedabad" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </motion.div>

        {/* Features Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-amber-500/20 shadow-xl hover:border-amber-400/50 transition-all text-gray-900 dark:text-white"
            >
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 mb-4 text-amber-500 dark:text-amber-400">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-slate-900 to-amber-950 p-8 sm:p-10 rounded-3xl text-white border border-amber-500/30 shadow-2xl"
          >
            <h3 className="text-2xl font-extrabold mb-4 text-amber-300 font-serif">Our Mission</h3>
            <p className="leading-relaxed text-amber-100/90 text-sm sm:text-base">
              To curate exceptional real estate experiences, connecting discerning buyers and investors with high-value, verified properties across prime locations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-slate-900 to-yellow-950 p-8 sm:p-10 rounded-3xl text-white border border-amber-500/30 shadow-2xl"
          >
            <h3 className="text-2xl font-extrabold mb-4 text-amber-300 font-serif">Our Vision</h3>
            <p className="leading-relaxed text-amber-100/90 text-sm sm:text-base">
              To remain Ahmedabad's most trusted luxury real estate platform, distinguished by integrity, technological innovation, and architectural appreciation.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default About
