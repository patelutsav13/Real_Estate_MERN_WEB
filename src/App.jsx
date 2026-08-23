"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Explore from "./components/Explore"
import Rent from "./components/Rent"
import PayRent from "./components/PayRent"
import BuyPayment from "./components/BuyPayment"
import Buy from "./components/Buy"
import Sell from "./components/Sell"
import Agent from "./components/Agent"
import AIChatbot from "./components/AIChatbot"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import AdminLayout from "./components/admin/AdminLayout"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import PropertyDetail from "./components/PropertyDetail"
import "./App.css"

import { ThemeProvider } from "./context/ThemeContext"

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname
    if (path === "/reset-password") return "reset-password"
    return "explore"
  })

  const [selectedProperty, setSelectedProperty] = useState(null)
  const [previousPage, setPreviousPage] = useState("explore")

  const openDetails = (property, sourcePage) => {
    setPreviousPage(currentPage)
    setSelectedProperty({ ...property, source: sourcePage })
    setCurrentPage("property-details")
  }

  const goBack = () => {
    setSelectedProperty(null)
    setCurrentPage(previousPage)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "explore":
        return <Explore openDetails={(prop) => openDetails(prop, "explore")} />
      case "rent":
        return (
          <Rent
            openDetails={(prop) => openDetails(prop, "rent")}
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        )
      case "pay-rent":
        return <PayRent property={selectedProperty} setCurrentPage={setCurrentPage} />
      case "buy-payment":
        return <BuyPayment property={selectedProperty} setCurrentPage={setCurrentPage} />
      case "buy":
        return <Buy openDetails={(prop) => openDetails(prop, "buy")} />
      case "sell":
        return <Sell openDetails={(prop) => openDetails(prop, "buy")} setCurrentPage={setCurrentPage} />
      case "agent":
        return <Agent />
      case "ai-chatbot":
        return (
          <AIChatbot
            openDetails={(prop) => openDetails(prop, "explore")}
            setCurrentPage={setCurrentPage}
          />
        )
      case "about":
        return <About />
      case "contact":
        return <Contact />
      case "login":
        return <Login setCurrentPage={setCurrentPage} />
      case "signup":
        return <Signup setCurrentPage={setCurrentPage} />
      case "Dashboard":
        return <Dashboard setCurrentPage={setCurrentPage} />
      case "admin":
        return <AdminLayout setCurrentPage={setCurrentPage} />
      case "forgot-password":
        return <ForgotPassword setCurrentPage={setCurrentPage} />
      case "reset-password":
        return <ResetPassword setCurrentPage={setCurrentPage} />
      case "property-details":
        return (
          <PropertyDetail
            property={selectedProperty}
            setCurrentPage={setCurrentPage}
            goBack={goBack}
          />
        )
      default:
        return <Explore openDetails={(prop) => openDetails(prop, "explore")} />
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <main className={currentPage === "property-details" ? "pt-0" : "pt-20"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {currentPage !== "property-details" && currentPage !== "ai-chatbot" && (
          <Footer setCurrentPage={setCurrentPage} />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
