"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, LogOut, ShieldAlert } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import PrimeEstateLogo from "./PrimeEstateLogo"
import admin from "../assets/logo.png"

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Explore", id: "explore" },
    { name: "Rent", id: "rent" },
    { name: "Buy", id: "buy" },
    { name: "Sell", id: "sell" },
    { name: "Agent", id: "agent" },
    { name: "AI Chatbot", id: "ai-chatbot" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
    ...(user ? [{ name: "Dashboard", id: "Dashboard" }] : []),
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-amber-500/20 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* PrimeEstate Logo */}
          <div
            className="cursor-pointer flex items-center gap-2 group"
            onClick={() => setCurrentPage("explore")}
          >
            <PrimeEstateLogo className="h-10 sm:h-12" showTagline={true} />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 bg-gray-100/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200 dark:border-amber-500/20 shadow-sm">
            {(user?.role === "admin" ? [] : navItems).map((item) => {
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white dark:text-amber-300 font-extrabold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-blue-600 dark:bg-gradient-to-r dark:from-amber-500 dark:to-yellow-600 rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-amber-500/20 text-gray-700 dark:text-amber-400 hover:scale-110 transition-all shadow-sm"
              title="Toggle Light / Dark Mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400 fill-current" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Auth Buttons */}
            {!user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage("login")}
                  className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-amber-400 transition-colors"
                >
                  Login
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage("signup")}
                  className="px-6 py-2 text-sm font-bold text-white dark:text-slate-950 bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500 rounded-full shadow-lg transition-all"
                >
                  Sign Up
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setCurrentPage("Dashboard")}
                  className="flex items-center gap-3 cursor-pointer bg-gray-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-gray-200 dark:border-amber-500/20"
                >
                  <img
                    src={admin}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-500 dark:border-amber-400"
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 dark:text-amber-300 font-medium">Welcome</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white truncate max-w-[90px]">
                      {user.name.split(" ")[0]}
                    </span>
                  </div>
                </div>

                {user.role === "admin" && (
                  <button
                    onClick={() => setCurrentPage("admin")}
                    className="p-2.5 text-purple-600 dark:text-amber-400 bg-purple-50 dark:bg-amber-500/10 rounded-full border border-purple-200 dark:border-amber-500/30"
                    title="Admin Panel"
                  >
                    <ShieldAlert size={18} />
                  </button>
                )}

                <button
                  onClick={() => {
                    logout()
                    setCurrentPage("login")
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-full hover:bg-rose-700 transition-all shadow-md"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-400"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-amber-400"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-gray-200 dark:border-amber-500/20 px-6 py-6 space-y-3"
          >
            {(user?.role === "admin" ? [] : navItems).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setIsMenuOpen(false)
                }}
                className={`w-full text-left text-base font-semibold px-4 py-3 rounded-xl transition-all ${
                  currentPage === item.id
                    ? "bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500 text-white dark:text-slate-950 font-bold"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </button>
            ))}

            {!user ? (
              <div className="flex flex-col gap-3 pt-3">
                <button
                  onClick={() => {
                    setCurrentPage("login")
                    setIsMenuOpen(false)
                  }}
                  className="w-full py-3 text-center border border-gray-300 dark:border-amber-500/30 rounded-xl font-bold text-gray-800 dark:text-amber-300"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setCurrentPage("signup")
                    setIsMenuOpen(false)
                  }}
                  className="w-full py-3 text-center bg-blue-600 dark:bg-gradient-to-r dark:from-amber-400 dark:to-yellow-500 text-white dark:text-slate-950 rounded-xl font-extrabold shadow-md"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  logout()
                  setCurrentPage("login")
                  setIsMenuOpen(false)
                }}
                className="w-full py-3 flex justify-center items-center gap-2 bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300 rounded-xl font-bold mt-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
