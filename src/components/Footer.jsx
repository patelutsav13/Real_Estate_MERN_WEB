"use client"

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              RealEstate Pro
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Your trusted partner for finding the perfect property in Ahmedabad. Excellence in real estate since 2014.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage("explore")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Explore Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("rent")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  For Rent
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("buy")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  For Buy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("sell")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  For Sell
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("agent")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Our Agents
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Property Valuation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Legal Assistance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home Loans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Property Management
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("ai-chatbot")}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">Office No. 501, Silver Plaza, Satellite Road, Ahmedabad</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@realestatepro.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* View All Properties Button */}
        <div className="text-center py-8 border-t border-gray-800">
          <button
            onClick={() => setCurrentPage("explore")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
          >
            View All Properties
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © 2025 RealEstate Pro. All rights reserved. | Privacy Policy | Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
