// "use client"

// import { Phone, Mail, MapPin, Award, Briefcase, Video, Mic, MicOff, PhoneOff, Camera, CameraOff } from "lucide-react"
// import { useState, useEffect, useRef } from "react"
// import config from "../config"
// import Agent1 from "../assets/agent1.png";
// import Agent2 from "../assets/agent2.png";
// import Agent3 from "../assets/agent3.png";
// import Agent4 from "../assets/agent4.png";
// import Agent5 from "../assets/agent5.png";

// const AgentCard = ({ agent }) => {
//   const [showDetails, setShowDetails] = useState(false)
//   const [isCalling, setIsCalling] = useState(false)
//   const [isMuted, setIsMuted] = useState(false)
//   const [isCameraOn, setIsCameraOn] = useState(true)

//   // Start Call
//   const startCall = () => {
//     setIsCalling(true)
//   }

//   // End Call
//   const endCall = () => {
//     setIsCalling(false)
//     setIsMuted(false)
//   }

//   return (
//     <>
//       <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
//         <div className="p-6">
//           <div className="flex items-start space-x-4">
//             <img
//               src={agent.image || "/placeholder.svg"}
//               alt={agent.name}
//               className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
//             />
//             <div className="flex-1">
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{agent.name}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{agent.title}</p>
//               <div className="flex items-center space-x-2 mb-2">
//                 <Phone className="w-4 h-4 text-blue-600" />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">{agent.phone}</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Mail className="w-4 h-4 text-blue-600" />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">{agent.email}</span>
//               </div>
//             </div>
//           </div>

//           {showDetails && (
//             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 animate-fade-in">
//               <div className="flex items-start space-x-2">
//                 <MapPin className="w-5 h-5 text-blue-600 mt-1" />
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white">Address</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{agent.address}</p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <Briefcase className="w-5 h-5 text-blue-600 mt-1" />
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white">Experience</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{agent.experience} Years</p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-2">
//                 <Award className="w-5 h-5 text-blue-600 mt-1" />
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white">Expertise</p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{agent.expertise}</p>
//                 </div>
//               </div>

//               {/* Video Call Button */}
//               <button
//                 onClick={startCall}
//                 className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-semibold shadow-md"
//               >
//                 <Video className="w-5 h-5" />
//                 Start Video Call
//               </button>
//             </div>
//           )}

//           <button
//             onClick={() => setShowDetails(!showDetails)}
//             className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
//           >
//             {showDetails ? "Hide Details" : "View More Details"}
//           </button>
//         </div>
//       </div>

//       {/* 📹 VIDEO CALL MODAL OVERLAY */}
//       {isCalling && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center p-4">

//           {/* Main Call Container */}
//           <div className="relative w-full max-w-lg h-[80vh] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col">

//             {/* Agent Video (Main Screen) */}
//             <div className="flex-1 relative">
//               <img
//                 src={agent.image || "/placeholder.svg"}
//                 alt="Agent"
//                 className="w-full h-full object-cover opacity-90"
//               />
//               <div className="absolute top-4 left-4 bg-black/50 px-4 py-2 rounded-full text-white backdrop-blur-md">
//                 <h3 className="font-bold">{agent.name}</h3>
//                 <span className="text-xs text-green-400 flex items-center gap-1">
//                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                   On Call
//                 </span>
//               </div>
//             </div>

//             {/* User Camera (PIP) */}
//             <div className="absolute top-4 right-4 w-32 h-44 bg-black rounded-xl border-2 border-white/20 overflow-hidden shadow-xl">
//               {isCameraOn ? (
//                 <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
//                   {/* In a real app, this would be <video> from getUserMedia */}
//                   <span className="text-center p-2">User Camera Feed <br /> (You)</span>
//                 </div>
//               ) : (
//                 <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
//                   <CameraOff className="w-8 h-8 opacity-50" />
//                 </div>
//               )}
//             </div>

//             {/* Call Controls */}
//             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-black/60 backdrop-blur-md rounded-full">

//               {/* Mute Toggle */}
//               <button
//                 onClick={() => setIsMuted(!isMuted)}
//                 className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-black' : 'bg-gray-700/80 text-white hover:bg-gray-600'}`}
//               >
//                 {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
//               </button>

//               {/* End Call */}
//               <button
//                 onClick={endCall}
//                 className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
//               >
//                 <PhoneOff className="w-8 h-8" />
//               </button>

//               {/* Camera Toggle */}
//               <button
//                 onClick={() => setIsCameraOn(!isCameraOn)}
//                 className={`p-4 rounded-full transition-all ${!isCameraOn ? 'bg-white text-black' : 'bg-gray-700/80 text-white hover:bg-gray-600'}`}
//               >
//                 {isCameraOn ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
//               </button>

//             </div>

//           </div>

//           <p className="text-white/50 mt-4 text-sm">End-to-End Encrypted</p>
//         </div>
//       )}
//     </>
//   )
// }

// const Agent = () => {
//   const [agents, setAgents] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const res = await fetch(`${config.API_URL}/api/auth/agents`)
//         const data = await res.json()
//         setAgents(data)
//         setLoading(false)
//       } catch (err) {
//         console.error("Error fetching agents:", err)
//         setLoading(false)
//       }
//     }
//     fetchAgents()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//             Our Expert{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Agents</span>
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400">
//             Meet our professional real estate agents ready to help you
//           </p>
//         </div>

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {loading ? (
//             <p className="text-center col-span-full">Loading Agents...</p>
//           ) : agents.length > 0 ? (
//             agents.map((agent) => (
//               <AgentCard key={agent._id} agent={agent} />
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-500">No agents found.</p>
//           )}
//         </div>

//         {/* Contact CTA */}
//         <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
//           <h2 className="text-3xl font-bold mb-4">Need Personalized Assistance?</h2>
//           <p className="text-lg mb-6 opacity-90">
//             Our agents are here to guide you through every step of your property journey
//           </p>
//           <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
//             Schedule a Consultation
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Agent



"use client"

import { Phone, Mail, MapPin, Award, Briefcase, Video, Mic, MicOff, PhoneOff, Camera, CameraOff } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import config from "../config"
import Agent1 from "../assets/agent1.png";
import Agent2 from "../assets/agent2.png";
import Agent3 from "../assets/agent3.png";
import Agent4 from "../assets/agent4.png";
import Agent5 from "../assets/agent5.png";

const AgentCard = ({ agent }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)

  // Start Call
  const startCall = () => {
    setIsCalling(true)
  }

  // End Call
  const endCall = () => {
    setIsCalling(false)
    setIsMuted(false)
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <img
              src={agent.image?.startsWith("/uploads") ? `${config.API_URL}${agent.image}` : agent.image || "/placeholder.svg"}
              alt={agent.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{agent.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{agent.title}</p>
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{agent.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{agent.email}</span>
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 animate-fade-in">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Address</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{agent.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Briefcase className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Experience</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{agent.experience} Years</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Expertise</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{agent.expertise}</p>
                </div>
              </div>

              {/* Video Call Button */}
              <button
                onClick={startCall}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-semibold shadow-md"
              >
                <Video className="w-5 h-5" />
                Start Video Call
              </button>
            </div>
          )}

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
          >
            {showDetails ? "Hide Details" : "View More Details"}
          </button>
        </div>
      </div>

      {/* 📹 VIDEO CALL MODAL OVERLAY */}
      {isCalling && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center p-4">

          {/* Main Call Container */}
          <div className="relative w-full max-w-lg h-[80vh] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col">

            {/* Agent Video (Main Screen) */}
            <div className="flex-1 relative">
              <img
                src={agent.image?.startsWith("/uploads") ? `${config.API_URL}${agent.image}` : agent.image || "/placeholder.svg"}
                alt="Agent"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 bg-black/50 px-4 py-2 rounded-full text-white backdrop-blur-md">
                <h3 className="font-bold">{agent.name}</h3>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  On Call
                </span>
              </div>
            </div>

            {/* User Camera (PIP) */}
            <div className="absolute top-4 right-4 w-32 h-44 bg-black rounded-xl border-2 border-white/20 overflow-hidden shadow-xl">
              {isCameraOn ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-xs">
                  {/* In a real app, this would be <video> from getUserMedia */}
                  <span className="text-center p-2">User Camera Feed <br /> (You)</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
                  <CameraOff className="w-8 h-8 opacity-50" />
                </div>
              )}
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-black/60 backdrop-blur-md rounded-full">

              {/* Mute Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-black' : 'bg-gray-700/80 text-white hover:bg-gray-600'}`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              {/* End Call */}
              <button
                onClick={endCall}
                className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
              >
                <PhoneOff className="w-8 h-8" />
              </button>

              {/* Camera Toggle */}
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-4 rounded-full transition-all ${!isCameraOn ? 'bg-white text-black' : 'bg-gray-700/80 text-white hover:bg-gray-600'}`}
              >
                {isCameraOn ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
              </button>

            </div>

          </div>

          <p className="text-white/50 mt-4 text-sm">End-to-End Encrypted</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Expert{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Agents</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Meet our professional real estate agents ready to help you
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-center col-span-full">Loading Agents...</p>
          ) : agents.length > 0 ? (
            agents.map((agent) => (
              <AgentCard key={agent._id} agent={agent} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No agents found.</p>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Assistance?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our agents are here to guide you through every step of your property journey
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  )
}

export default Agent

