"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import admin from "../assets/logo.png"

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  // Handle scroll effect
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer flex items-center gap-2"
            onClick={() => setCurrentPage("explore")}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-300 shadow-lg">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              RealEstate<span className="font-extrabold">Pro</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
            {(user?.role === "admin" ? [] : navItems).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${currentPage === item.id
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md transform scale-105"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 fill-current" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* AUTH BUTTONS */}
            {!user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage("login")}
                  className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:text-blue-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setCurrentPage("Dashboard")}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <img
                    src={admin}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-blue-600 transition-all duration-300"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Welcome</span>
                    <span className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
                      {user.name.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {user.role === "admin" && (
                  <button
                    onClick={() => setCurrentPage("admin")}
                    className="p-2 text-purple-600 bg-purple-50 dark:bg-purple-900/30 rounded-full hover:bg-purple-100 transition-all"
                    title="Admin Panel"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></svg>
                  </button>
                )}

                <button
                  onClick={() => {
                    logout()
                    setCurrentPage("login")
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-600 hover:shadow-lg transition-all duration-300"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-200"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col p-6 space-y-4">
          {(user?.role === "admin" ? [] : navItems).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id)
                setIsMenuOpen(false)
              }}
              className={`text-lg font-semibold px-4 py-3 rounded-xl transition-all ${currentPage === item.id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {item.name}
            </button>
          ))}

          <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />

          {user && (
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2">
              <img
                src={admin}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Welcome</p>
                  {user.role === "admin" && (
                    <span
                      onClick={() => {
                        setCurrentPage("admin")
                        setIsMenuOpen(false)
                      }}
                      className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full cursor-pointer font-bold border border-purple-200"
                    >
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {!user ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setCurrentPage("login")
                  setIsMenuOpen(false)
                }}
                className="w-full py-3 text-center border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-white"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setCurrentPage("signup")
                  setIsMenuOpen(false)
                }}
                className="w-full py-3 text-center bg-blue-600 text-white rounded-xl font-bold shadow-lg"
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
              className="w-full py-3 flex justify-center items-center gap-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-xl font-bold"
            >
              <LogOut size={20} />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar


