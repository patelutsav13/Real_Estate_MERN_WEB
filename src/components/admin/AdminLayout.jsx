import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import AdminDashboard from "./AdminDashboard"
import AdminUsers from "./AdminUsers"
import AdminProperties from "./AdminProperties"
import AdminAddProperty from "./AdminAddProperty"
import AdminAddAgent from "./AdminAddAgent"
import PrimeEstateLogo from "../PrimeEstateLogo"
import { LayoutDashboard, Users, Home, PlusCircle, UserPlus, LogOut, Menu, X, ShieldAlert } from "lucide-react"

const AdminLayout = ({ setCurrentPage }) => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "admin") {
      setCurrentPage("login")
    }
  }, [user, setCurrentPage])

  if (!user || user.role !== "admin") return null

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <AdminDashboard />
      case "users": return <AdminUsers />
      case "properties": return <AdminProperties />
      case "add-property": return <AdminAddProperty setActiveTab={setActiveTab} />
      case "add-agent": return <AdminAddAgent setActiveTab={setActiveTab} />
      default: return <AdminDashboard />
    }
  }

  const handleLogout = () => {
    logout()
    setCurrentPage("explore")
  }

  const SidebarBtn = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveTab(id)
        setIsSidebarOpen(false)
      }}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-extrabold text-xs tracking-wider uppercase
      ${activeTab === id
        ? "bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 shadow-xl scale-105"
        : "text-gray-300 hover:text-white hover:bg-slate-900 border border-transparent"
      }`}
    >
      <Icon size={18} className={activeTab === id ? "text-slate-950" : "text-amber-400"} />
      <span>{label}</span>
    </button>
  )

  return (
    <div className="flex h-screen bg-transparent text-white font-sans overflow-hidden">

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 w-full bg-slate-950/90 backdrop-blur-2xl z-30 px-6 py-4 flex justify-between items-center border-b border-amber-500/20 shadow-xl">
        <PrimeEstateLogo className="h-10" showTagline={false} />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-amber-400 p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
        ></div>
      )}

      {/* GLASSMORPHISM SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-slate-950/95 backdrop-blur-2xl 
        border-r border-amber-500/30 shadow-2xl flex flex-col z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>
        <div className="p-8">
          <PrimeEstateLogo className="h-12" showTagline={true} />
          <div className="mt-3 px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest rounded-full inline-flex items-center gap-1.5">
            <ShieldAlert size={12} /> Admin Console
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest px-4 mb-2 mt-4">Overview</p>
          <SidebarBtn id="dashboard" label="Dashboard" icon={LayoutDashboard} />

          <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest px-4 mb-2 mt-6">Management</p>
          <SidebarBtn id="users" label="Users & Agents" icon={Users} />
          <SidebarBtn id="properties" label="All Properties" icon={Home} />

          <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest px-4 mb-2 mt-6">Actions</p>
          <SidebarBtn id="add-property" label="Add Property" icon={PlusCircle} />
          <SidebarBtn id="add-agent" label="Add Agent" icon={UserPlus} />
        </nav>

        <div className="p-6 border-t border-amber-500/20 bg-slate-950/60">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-rose-400 hover:bg-rose-900/30 rounded-2xl transition-all font-extrabold text-xs"
          >
            <LogOut size={18} />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto w-full md:ml-72 p-4 md:p-8 relative pt-24 md:pt-8 bg-transparent">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
