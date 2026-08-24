"use client"

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Sparkles, ArrowRight, ShieldCheck } from "lucide-react"

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="relative bg-slate-950 text-white mt-24 border-t border-amber-500/30 overflow-hidden">
      {/* Background Architectural Luxury Image with Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury Architecture Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Top VIP Banner */}
        <div className="mb-14 p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest mb-2">
              <Sparkles size={14} className="text-amber-400 animate-pulse" /> Prime VIP Real Estate Access
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Looking to Buy, Rent, or List an Exclusive Asset?
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
              Connect directly with verified luxury agents and AI valuation specialists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentPage("sell")}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-black rounded-2xl shadow-xl hover:scale-105 transition-all text-xs flex items-center gap-2"
            >
              <span>List Your Property</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => setCurrentPage("explore")}
              className="px-6 py-3.5 bg-slate-950 border border-amber-500/40 text-amber-300 font-bold rounded-2xl hover:bg-slate-900 transition-all text-xs"
            >
              Browse Catalog
            </button>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* 1. Company Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-black tracking-tight text-white">
                PRIME<span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">ESTATE</span>
              </h3>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Ahmedabad’s premier AI-integrated luxury real estate destination. Delivering verified ultra-luxury villas, sky penthouses, and high-yield commercial assets since 2014.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                className="p-2.5 bg-slate-900/90 border border-amber-500/30 rounded-xl text-amber-400 hover:text-white hover:bg-amber-500 hover:scale-110 transition-all shadow-md"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-slate-900/90 border border-amber-500/30 rounded-xl text-amber-400 hover:text-white hover:bg-amber-500 hover:scale-110 transition-all shadow-md"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-slate-900/90 border border-amber-500/30 rounded-xl text-amber-400 hover:text-white hover:bg-amber-500 hover:scale-110 transition-all shadow-md"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-slate-900/90 border border-amber-500/30 rounded-xl text-amber-400 hover:text-white hover:bg-amber-500 hover:scale-110 transition-all shadow-md"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div>
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider mb-4">
              Curated Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage("explore")}
                  className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Featured Estates</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("buy")}
                  className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Properties for Sale</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("rent")}
                  className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Luxury Residences for Rent</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("sell")}
                  className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Publish Property Listing</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Client Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 3. AI Advisory & Services */}
          <div>
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider mb-4">
              AI & Client Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage("ai-chatbot")}
                  className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-bold"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span>AI Real Estate Advisor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("agent")}
                  className="text-gray-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Certified Advisory Agents</span>
                </button>
              </li>
              <li className="text-gray-400 hover:text-gray-200 transition-colors">
                RERA Legal Verification
              </li>
              <li className="text-gray-400 hover:text-gray-200 transition-colors">
                High-Yield Portfolio Management
              </li>
              <li className="text-gray-400 hover:text-gray-200 transition-colors">
                4K Virtual Video Tours
              </li>
            </ul>
          </div>

          {/* 4. Luxury HQ Contact */}
          <div>
            <h4 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider mb-4">
              Prime Headquarters
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Suite 1204, Signature Tower, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 font-bold">+91 79 4800 9900</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300">concierge@primeestate.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-amber-400" />
            <span>© {new Date().getFullYear()} PRIME ESTATE INC. All Rights Reserved. RERA Registered Gujarat.</span>
          </div>

          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-amber-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-amber-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-amber-300 transition">RERA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

