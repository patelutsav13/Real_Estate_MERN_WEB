"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Trash2, MapPin, ExternalLink, MessageSquare, Plus, Menu, X } from "lucide-react"
import axios from "axios"
import { API } from "../config"

const AIChatbot = ({ openDetails, setCurrentPage }) => {
  // --- STATE ---
  const [chats, setChats] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)

  const [messages, setMessages] = useState([]) // Current active messages
  const [inputMessage, setInputMessage] = useState("")
  const [propertyData, setPropertyData] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const messagesEndRef = useRef(null)

  // --- INITIALIZATION ---
  // Load properties
  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await axios.get(`${API}/api/properties`)
        setPropertyData(res.data)
      } catch (err) {
        console.error("Chatbot failed to load properties")
      }
    }
    fetchProps()
  }, [])

  // Load chats from LocalStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem("realEstateChats")
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats)
      setChats(parsedChats)
      if (parsedChats.length > 0) {
        // Load the most recent chat
        setActiveChatId(parsedChats[0].id)
        setMessages(parsedChats[0].messages)
      } else {
        createNewChat()
      }
    } else {
      createNewChat()
    }
  }, [])

  // Save chats to LocalStorage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("realEstateChats", JSON.stringify(chats))
    }
  }, [chats])

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // --- ACTIONS ---

  const createNewChat = () => {
    const newId = Date.now()
    const newChat = {
      id: newId,
      title: "New Chat",
      date: new Date().toISOString(),
      messages: [{
        id: 1,
        text: "Hello! I'm your AI Real Estate Assistant. How can I help you find your dream property today?",
        sender: "bot",
      }]
    }

    setChats(prev => [newChat, ...prev])
    setActiveChatId(newId)
    setMessages(newChat.messages)
    setIsSidebarOpen(false) // Close sidebar on mobile after selection
  }

  const loadChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId)
    if (chat) {
      setActiveChatId(chatId)
      setMessages(chat.messages)
      setIsSidebarOpen(false)
    }
  }

  const deleteChat = (e, chatId) => {
    e.stopPropagation()
    const updatedChats = chats.filter(c => c.id !== chatId)
    setChats(updatedChats)
    localStorage.setItem("realEstateChats", JSON.stringify(updatedChats))

    // If we deleted the active chat, switch to another or create new
    if (chatId === activeChatId) {
      if (updatedChats.length > 0) {
        setActiveChatId(updatedChats[0].id)
        setMessages(updatedChats[0].messages)
      } else {
        createNewChat()
      }
    }
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    }

    // Update messages local state
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputMessage("")

    // Update Chats State (for persistence) & Title if it's the first user message
    updateChatHistory(activeChatId, newMessages, inputMessage)

    // Simulate AI response
    setTimeout(() => {
      const response = generateBotResponse(inputMessage)
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: "bot",
        type: response.type,
        data: response.data
      }

      const updatedMessagesWithBot = [...newMessages, botMessage]
      setMessages(updatedMessagesWithBot)
      updateChatHistory(activeChatId, updatedMessagesWithBot)
    }, 800)
  }

  // Helper to update specific chat in the chats array
  const updateChatHistory = (chatId, updatedMessages, userFirstMessage = null) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        // If it's the "New Chat" title and we have a user message, update title
        let newTitle = chat.title
        if (chat.title === "New Chat" && userFirstMessage) {
          newTitle = userFirstMessage.slice(0, 30) + (userFirstMessage.length > 30 ? "..." : "")
        }
        return { ...chat, messages: updatedMessages, title: newTitle }
      }
      return chat
    }))
  }

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase()

    // 1. ABUSE DETECTION
    const abuseWords = ["idiot", "stupid", "dumb", "fuck", "shit", "bitch", "rubbish", "useless", "shut up"]
    if (abuseWords.some(word => input.includes(word))) {
      return { text: "😡 That is not very nice! I am trying to help you. Please be respectful.", type: "text" }
    }

    // 2. GREETINGS
    if (input.match(/^(hi|hello|hey|greetings)/)) {
      const user = JSON.parse(localStorage.getItem("user"))
      const name = user ? user.name : "User"
      return { text: `Hello ${name}! 👋 How are you doing today? What can I help you with?`, type: "text" }
    }

    if (input.includes("how are you")) {
      return { text: "I am just a bot, but I am functioning perfectly! 🤖 Ready to help you find a home.", type: "text" }
    }

    // 3. NAVIGATION REQUESTS
    if (input.includes("rent page") || (input.includes("want to rent") && !input.includes("property"))) {
      return {
        text: "Here is the Rent Page. You can find all verified rental listings here.",
        type: "nav-link",
        data: { label: "Go to Rent Page", page: "rent" }
      }
    }
    if (input.includes("buy page") || (input.includes("want to buy") && !input.includes("property"))) {
      return {
        text: "Check out our Buy Page for the best properties for sale.",
        type: "nav-link",
        data: { label: "Go to Buy Page", page: "buy" }
      }
    }
    if (input.includes("sell page") || (input.includes("want to sell") && !input.includes("property"))) {
      return {
        text: "Sell your property quickly! Visit our Sell Page to list your property.",
        type: "nav-link",
        data: { label: "Go to Sell Page", page: "sell" }
      }
    }
    if (input.includes("agent")) {
      return {
        text: "Need expert advice? Connect with our top agents.",
        type: "nav-link",
        data: { label: "Find Agents", page: "agent" }
      }
    }

    // 4. SPECIFIC PROPERTY SEARCH
    const foundProperty = propertyData.find(p =>
      input.includes(p.name.toLowerCase()) ||
      (input.includes(p.type.toLowerCase()) && input.includes(p.address.toLowerCase()))
    )

    if (foundProperty) {
      return {
        text: `I found "${foundProperty.name}"! It is a ${foundProperty.bedrooms}BHK ${foundProperty.type} in ${foundProperty.area}.`,
        type: "property-link",
        data: foundProperty
      }
    }

    // 5. GENERAL KNOWLEDGE
    const qa = [
      { q: "investment", a: "Real estate in Ahmedabad is booming. Areas like Shela and Gota are seeing 15% annual appreciation." },
      { q: "documents", a: "To buy a house, you need: PAN Card, Aadhar Card, Income Proof, and Address Proof." },
      { q: "loan", a: "We have tie-ups with HDFC, SBI, and ICICI for home loans at attractive rates starting 8.5%." },
      { q: "deposit", a: "Standard security deposit for rentals is usually 2 months of rent." },
      { q: "brokerage", a: "Our brokerage charges are: 1% for Buy/Sell and 1 month rent for Rentals. No hidden charges!" },
      { q: "stamp duty", a: "Stamp duty in Gujarat is approximately 4.9% and Registration fee is 1% of the property value." },
      { q: "rera", a: "All our new projects are RERA registered. This ensures transparency and timely delivery for you." },
      { q: "possession", a: "Possession depends on the project status. Ready-to-move homes are available immediately. Under-construction takes 1-3 years." },
      { q: "emi", a: "You can calculate EMI using P x R x (1+R)^N / [(1+R)^N-1]. Or just ask our agents for a quote!" },
      { q: "vastu", a: "Many of our properties are Vastu compliant. Look for the 'Vastu' tag in property details." },
      { q: "amenities", a: "Most reliable societies offer Gym, Club House, Garden, and 24/7 Security." },
      { q: "school", a: "We list properties near top schools like DPS, Udgam, and Zydus. perfect for families!" },
      { q: "metro", a: "Properties near Metro stations (Thaltej, East-West corridor) are in high demand." },
      { q: "nri", a: "Yes, NRIs can buy both residential and commercial properties in India under FEMA guidelines." },
      { q: "resale", a: "Resale properties often come fully furnished but require checking utility dues and society transfer fees." },
    ]

    const foundQA = qa.find(item => input.includes(item.q))
    if (foundQA) return { text: foundQA.a, type: "text" }

    return { text: "I can help you Rent, Buy, or Sell. You can ask me about specific properties (e.g., 'Luxury Villa') or pages.", type: "text" }
  }


  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 overflow-hidden">

      {/* --- SIDEBAR (History) --- */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 flex flex-col h-full">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors mb-4 border border-blue-500 shadow-md"
          >
            <Plus size={20} />
            <span className="font-semibold">New Chat</span>
          </button>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => loadChat(chat.id)}
                className={`
                            group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                            ${activeChatId === chat.id ? 'bg-gray-800 border border-gray-700' : 'hover:bg-gray-800 border border-transparent'}
                        `}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageSquare size={18} className="text-gray-400 shrink-0" />
                  <span className="truncate text-sm text-gray-200">{chat.title}</span>
                </div>
                <button
                  onClick={(e) => deleteChat(e, chat.id)}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400 p-1 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm font-medium">User Account</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- MAIN CHAT AREA --- */}
      <div className="flex-1 flex flex-col h-full relative">

        {/* Toggle Button (Mobile) */}
        <div className="md:hidden p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Menu size={24} className="dark:text-white" />
          </button>
          <span className="font-bold text-lg dark:text-white">AI Assistant</span>
          <div className="w-8" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 dark:bg-gray-900 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-50">
              <Bot size={64} className="mb-4 text-blue-600" />
              <p className="text-xl font-bold dark:text-white">How can I help you?</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "bot" ? "bg-blue-600" : "bg-purple-600"}`}>
                {message.sender === "bot" ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${message.sender === "bot" ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm" : "bg-blue-600 text-white rounded-tr-none shadow-md"}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

                {/* BUTTONS / LINKS for Bot */}
                {message.sender === "bot" && message.type === "nav-link" && (
                  <button
                    onClick={() => setCurrentPage(message.data.page)}
                    className="mt-3 flex items-center gap-2 bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm hover:bg-blue-100 dark:hover:bg-gray-600 transition font-medium border border-blue-100 dark:border-gray-600"
                  >
                    <ExternalLink size={16} />
                    {message.data.label}
                  </button>
                )}

                {message.sender === "bot" && message.type === "property-link" && (
                  <div className="mt-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600 max-w-sm">
                    <img src={message.data.image} alt="prop" className="w-full h-32 object-cover rounded-md mb-2 shadow-sm" />
                    <h4 className="font-bold text-gray-900 dark:text-white truncate">{message.data.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{message.data.address}</p>
                    <button
                      onClick={() => {
                        if (openDetails) openDetails(message.data, "ai-chatbot")
                      }}
                      className="w-full bg-blue-600 text-white text-xs py-2 rounded-md hover:bg-blue-700 transition font-medium"
                    >
                      View Details
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto flex items-center space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask about properties, rents, or say Hi..."
              className="flex-1 px-5 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200 transition-all shadow-inner"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`p-3 rounded-full transition-all shadow-lg ${inputMessage.trim() ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">AI can make mistakes. Please verify important info.</p>
        </div>
      </div>
    </div>
  )
}

export default AIChatbot
