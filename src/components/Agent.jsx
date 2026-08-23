"use client"

import { Phone, Mail, MapPin, Award, Briefcase, Video, Mic, MicOff, PhoneOff, Camera, CameraOff, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import config from "../config"
import { getImageUrl } from "../utils/getImageUrl"

const AgentCard = ({ agent }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)

  const startCall = () => {
    setIsCalling(true)
  }

  const endCall = () => {
    setIsCalling(false)
    setIsMuted(false)
  }

  const agentImg = getImageUrl(agent.image)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-950/80 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 text-white hover:border-amber-400/60 transition-all duration-300"
      >
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <img
              src={agentImg}
              alt={agent.name}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/placeholder.svg"
              }}
              className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-extrabold text-white mb-1">{agent.name}</h3>
              <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-3">{agent.title}</p>
              <div className="flex items-center space-x-2 mb-2 text-xs text-gray-300">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{agent.email}</span>
              </div>
            </div>
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-amber-500/20 space-y-3 text-xs text-gray-200"
            >
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Address</p>
                  <p>{agent.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Briefcase className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Experience</p>
                  <p>{agent.experience} Years</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Expertise</p>
                  <p>{agent.expertise}</p>
                </div>
              </div>

              {/* Video Call Button */}
              <button
                onClick={startCall}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all font-extrabold shadow-lg"
              >
                <Video className="w-5 h-5" />
                Start Live Video Consultation
              </button>
            </motion.div>
          )}

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full mt-4 px-4 py-2.5 bg-slate-900 border border-amber-500/30 text-amber-300 rounded-xl hover:bg-slate-800 transition-all font-bold text-xs"
          >
            {showDetails ? "Hide Agent Details" : "View Agent Details"}
          </button>
        </div>
      </motion.div>

      {/* 📹 VIDEO CALL MODAL */}
      {isCalling && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-lg h-[80vh] bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-amber-500/40 flex flex-col">
            
            {/* Main Video View */}
            <div className="flex-1 relative bg-slate-900">
              <img
                src={agentImg}
                alt="Agent"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 px-4 py-2 rounded-full text-white backdrop-blur-md border border-amber-500/30">
                <h3 className="font-extrabold text-sm text-white">{agent.name}</h3>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Live Encrypted Stream
                </span>
              </div>
            </div>

            {/* User PIP Feed */}
            <div className="absolute top-4 right-4 w-32 h-44 bg-slate-900 rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-2xl flex items-center justify-center text-xs text-amber-200">
              {isCameraOn ? (
                <div className="w-full h-full bg-slate-950 flex items-center justify-center text-center p-2 font-bold text-[10px] text-amber-300">
                  User Camera Feed <br /> (Live HD)
                </div>
              ) : (
                <CameraOff className="w-8 h-8 opacity-50" />
              )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-slate-950/90 backdrop-blur-md rounded-full border border-amber-500/30">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3.5 rounded-full transition-all ${isMuted ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-white'}`}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <button
                onClick={endCall}
                className="p-4 bg-rose-600 text-white rounded-full hover:scale-110 transition-all shadow-xl"
              >
                <PhoneOff size={24} />
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-3.5 rounded-full transition-all ${!isCameraOn ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-white'}`}
              >
                {isCameraOn ? <Camera size={20} /> : <CameraOff size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Agent = () => {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(`${config.API_URL}/api/auth/agents`)
        const data = await res.json()
        setAgents(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching agents:", err)
        setLoading(false)
      }
    }
    fetchAgents()
  }, [])

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
            <Sparkles size={14} className="animate-pulse" /> Certified Luxury Advisors
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
            Our Expert <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">Agents</span>
          </h1>

          <p className="text-lg text-amber-200/80 max-w-xl mx-auto font-serif">
            Professional estate advisors dedicated to finding your dream villa or penthouse.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            <p className="text-center col-span-full text-amber-400 font-bold">Loading Certified Agents...</p>
          ) : agents.length > 0 ? (
            agents.map((agent) => (
              <AgentCard key={agent._id} agent={agent} />
            ))
          ) : (
            <p className="text-center col-span-full text-amber-200/70 font-semibold">No agents found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Agent
