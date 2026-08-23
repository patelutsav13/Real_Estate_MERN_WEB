"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Trash2, ExternalLink, MessageSquare, Plus, Menu, Sparkles } from "lucide-react"
import axios from "axios"
import { API } from "../config"

const AIChatbot = ({ openDetails, setCurrentPage }) => {
  const [chats, setChats] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)

  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [propertyData, setPropertyData] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const messagesEndRef = useRef(null)

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

  useEffect(() => {
    const savedChats = localStorage.getItem("realEstateChats")
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats)
      setChats(parsedChats)
      if (parsedChats.length > 0) {
        setActiveChatId(parsedChats[0].id)
        setMessages(parsedChats[0].messages)
      } else {
        createNewChat()
      }
    } else {
      createNewChat()
    }
  }, [])

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("realEstateChats", JSON.stringify(chats))
    }
  }, [chats])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createNewChat = () => {
    const newId = Date.now()
    const newChat = {
      id: newId,
      title: "New Chat",
      date: new Date().toISOString(),
      messages: [{
        id: 1,
        text: "Hello! I am PrimeEstate AI Assistant. How can I help you discover your luxury dream property today?",
        sender: "bot",
      }]
    }

    setChats(prev => [newChat, ...prev])
    setActiveChatId(newId)
    setMessages(newChat.messages)
    setIsSidebarOpen(false)
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

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputMessage("")

    updateChatHistory(activeChatId, newMessages, inputMessage)

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

  const updateChatHistory = (chatId, updatedMessages, userFirstMessage = null) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
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

    if (input.match(/^(hi|hello|hey|greetings)/)) {
      const user = JSON.parse(localStorage.getItem("user"))
      const name = user ? user.name : "User"
      return { text: `Hello ${name}! 👋 Welcome to PrimeEstate AI Concierge. What property details can I pull up for you?`, type: "text" }
    }

    if (input.includes("rent")) {
      return {
        text: "Here is our Rent collection. Browse verified luxury rental properties.",
        type: "nav-link",
        data: { label: "Explore Rent Page", page: "rent" }
      }
    }
    if (input.includes("buy") || input.includes("sale")) {
      return {
        text: "Explore properties available for acquisition.",
        type: "nav-link",
        data: { label: "Explore Buy Page", page: "buy" }
      }
    }
    if (input.includes("agent")) {
      return {
        text: "Connect live with certified PrimeEstate advisors.",
        type: "nav-link",
        data: { label: "Find Agents", page: "agent" }
      }
    }

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

    return { text: "I am your PrimeEstate AI Assistant. You can ask me about properties for rent, buy, or sell in Ahmedabad!", type: "text" }
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-transparent text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-950/95 backdrop-blur-2xl text-white transform transition-transform duration-300 ease-in-out border-r border-amber-500/20
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 flex flex-col h-full">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl transition-all mb-4 shadow-lg hover:scale-105"
          >
            <Plus size={20} />
            <span>New AI Session</span>
          </button>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => loadChat(chat.id)}
                className={`
                  group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all text-xs font-semibold
                  ${activeChatId === chat.id ? 'bg-slate-900 border border-amber-500/40 text-amber-300' : 'hover:bg-slate-900/60 border border-transparent text-gray-300'}
                `}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <MessageSquare size={16} className="text-amber-400 shrink-0" />
                  <span className="truncate">{chat.title}</span>
                </div>
                <button
                  onClick={(e) => deleteChat(e, chat.id)}
                  className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-1 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-amber-500/20">
            <div className="flex items-center gap-3 px-2 text-xs">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <User size={16} />
              </div>
              <span className="font-bold text-gray-200">PrimeEstate AI Concierge</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full relative bg-transparent">

        {/* Mobile Header */}
        <div className="md:hidden p-4 bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-amber-400 rounded-lg">
            <Menu size={24} />
          </button>
          <span className="font-extrabold text-base text-amber-300">AI Concierge</span>
          <div className="w-8" />
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth bg-transparent">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-60">
              <Bot size={64} className="mb-4 text-amber-400 animate-bounce" />
              <p className="text-xl font-extrabold text-amber-300">How may PrimeEstate AI assist you?</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${message.sender === "bot" ? "bg-amber-500/20 border border-amber-500/40 text-amber-400" : "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950"}`}>
                {message.sender === "bot" ? <Bot size={20} /> : <User size={20} />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl backdrop-blur-xl ${message.sender === "bot" ? "bg-slate-950/80 text-white border border-amber-500/30 rounded-tl-none shadow-xl" : "bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-semibold rounded-tr-none shadow-xl"}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

                {message.sender === "bot" && message.type === "nav-link" && (
                  <button
                    onClick={() => setCurrentPage(message.data.page)}
                    className="mt-3 flex items-center gap-2 bg-slate-900 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-xl text-xs hover:bg-slate-800 transition font-bold"
                  >
                    <ExternalLink size={14} />
                    {message.data.label}
                  </button>
                )}

                {message.sender === "bot" && message.type === "property-link" && (
                  <div className="mt-3 bg-slate-900 p-3 rounded-2xl border border-amber-500/30 max-w-sm">
                    <img src={message.data.image} alt="prop" className="w-full h-32 object-cover rounded-xl mb-2 shadow-md" />
                    <h4 className="font-extrabold text-amber-300 text-sm truncate">{message.data.name}</h4>
                    <p className="text-xs text-gray-300 mb-2">{message.data.address}</p>
                    <button
                      onClick={() => {
                        if (openDetails) openDetails(message.data, "ai-chatbot")
                      }}
                      className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs py-2 rounded-xl hover:scale-105 transition font-extrabold"
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

        {/* Input Bar */}
        <div className="p-4 bg-slate-950/90 backdrop-blur-2xl border-t border-amber-500/20">
          <div className="max-w-4xl mx-auto flex items-center space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask PrimeEstate AI about luxury properties..."
              className="flex-1 px-5 py-3.5 bg-slate-900 border border-amber-500/20 rounded-full outline-none text-white text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`p-3.5 rounded-full transition-all shadow-lg ${inputMessage.trim() ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 hover:scale-105' : 'bg-slate-800 text-gray-600 cursor-not-allowed'}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChatbot
