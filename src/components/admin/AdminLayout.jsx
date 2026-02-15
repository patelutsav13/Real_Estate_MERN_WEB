// import { useState, useEffect } from "react"
// import { useAuth } from "../../context/AuthContext"
// import AdminDashboard from "./AdminDashboard"
// import AdminUsers from "./AdminUsers"
// import AdminProperties from "./AdminProperties"
// import AdminAddProperty from "./AdminAddProperty" // NEW
// import AdminAddAgent from "./AdminAddAgent"       // NEW

// // ICONS
// const IconDashboard = () => <span>📊</span>
// const IconUsers = () => <span>👥</span>
// const IconHome = () => <span>🏠</span>
// const IconAddProp = () => <span>➕🏠</span>
// const IconAddUser = () => <span>➕👤</span>
// const IconLogout = () => <span>🚪</span>

// const AdminLayout = ({ setCurrentPage }) => {
//     const { user, logout } = useAuth()
//     const [activeTab, setActiveTab] = useState("dashboard")

//     useEffect(() => {
//         if (!user || user.role !== "admin") {
//             setCurrentPage("login")
//         }
//     }, [user, setCurrentPage])

//     if (!user || user.role !== "admin") return null

//     const renderContent = () => {
//         switch (activeTab) {
//             case "dashboard": return <AdminDashboard />
//             case "users": return <AdminUsers />
//             case "properties": return <AdminProperties />
//             case "add-property": return <AdminAddProperty setActiveTab={setActiveTab} />
//             case "add-agent": return <AdminAddAgent setActiveTab={setActiveTab} />
//             default: return <AdminDashboard />
//         }
//     }

//     const handleLogout = () => {
//         logout()
//         setCurrentPage("explore")
//     }

//     // PREMIUM SIDEBAR BUTTON COMPONENT
//     const SidebarBtn = ({ id, label, icon }) => (
//         <button
//             onClick={() => setActiveTab(id)}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
//             ${activeTab === id
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 transform scale-105"
//                     : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:pl-6"
//                 }`}
//         >
//             <div className="text-xl">{icon}</div>
//             <span>{label}</span>
//         </button>
//     )

//     return (
//         <div className="flex h-screen bg-[#f3f4f6] dark:bg-[#0f172a] font-sans selection:bg-purple-500 selection:text-white">

//             {/* GLASSMORPHISM SIDEBAR */}
//             <aside className="w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-white/20 dark:border-gray-800 shadow-2xl flex flex-col fixed h-full z-20">
//                 <div className="p-8">
//                     <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                         Admin<span className="font-light">Panel</span>
//                     </h1>
//                     <p className="text-xs text-gray-400 mt-1 tracking-widest uppercase">Premium Control</p>
//                 </div>

//                 <nav className="flex-1 px-4 space-y-3 overflow-y-auto custom-scrollbar">
//                     <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-4">Overview</p>
//                     <SidebarBtn id="dashboard" label="Dashboard" icon={<IconDashboard />} />

//                     <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-6">Management</p>
//                     <SidebarBtn id="users" label="Users & Agents" icon={<IconUsers />} />
//                     <SidebarBtn id="properties" label="All Properties" icon={<IconHome />} />

//                     <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-6">Actions</p>
//                     <SidebarBtn id="add-property" label="Add Property" icon={<IconAddProp />} />
//                     <SidebarBtn id="add-agent" label="Add Agent" icon={<IconAddUser />} />
//                 </nav>

//                 <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-bold"
//                     >
//                         <IconLogout />
//                         <span>Logout</span>
//                     </button>
//                 </div>
//             </aside>

//             {/* MAIN CONTENT AREA */}
//             <main className="flex-1 overflow-y-auto ml-72 p-8 relative">
//                 {/* Background Decor */}
//                 <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10 pointer-events-none"></div>
//                 <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
//                 <div className="fixed bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

//                 <div className="max-w-6xl mx-auto">
//                     {renderContent()}
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default AdminLayout


import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import AdminDashboard from "./AdminDashboard"
import AdminUsers from "./AdminUsers"
import AdminProperties from "./AdminProperties"
import AdminAddProperty from "./AdminAddProperty" // NEW
import AdminAddAgent from "./AdminAddAgent"       // NEW

// ICONS
// ICONS
const IconDashboard = () => <span>📊</span>
const IconUsers = () => <span>👥</span>
const IconHome = () => <span>🏠</span>
const IconAddProp = () => <span>➕🏠</span>
const IconAddUser = () => <span>➕👤</span>
const IconLogout = () => <span>🚪</span>
const IconMenu = () => <span>☰</span>
const IconClose = () => <span>✕</span>

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

    // PREMIUM SIDEBAR BUTTON COMPONENT
    const SidebarBtn = ({ id, label, icon }) => (
        <button
            onClick={() => {
                setActiveTab(id)
                setIsSidebarOpen(false)
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium
            ${activeTab === id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 transform scale-105"
                    : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:pl-6"
                }`}
        >
            <div className="text-xl">{icon}</div>
            <span>{label}</span>
        </button>
    )

    return (
        <div className="flex h-screen bg-[#f3f4f6] dark:bg-[#0f172a] font-sans selection:bg-purple-500 selection:text-white">

            {/* MOBILE HEADER */}
            <div className="md:hidden fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl z-30 px-6 py-4 flex justify-between items-center shadow-sm">
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Admin<span className="font-light">Panel</span>
                </h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl text-gray-700 dark:text-gray-200">
                    {isSidebarOpen ? <IconClose /> : <IconMenu />}
                </button>
            </div>

            {/* OVERLAY for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                ></div>
            )}

            {/* GLASSMORPHISM SIDEBAR */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                border-r border-white/20 dark:border-gray-800 shadow-2xl flex flex-col z-40
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            `}>
                <div className="p-8">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Admin<span className="font-light">Panel</span>
                    </h1>
                    <p className="text-xs text-gray-400 mt-1 tracking-widest uppercase">Premium Control</p>
                </div>

                <nav className="flex-1 px-4 space-y-3 overflow-y-auto custom-scrollbar">
                    <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-4">Overview</p>
                    <SidebarBtn id="dashboard" label="Dashboard" icon={<IconDashboard />} />

                    <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-6">Management</p>
                    <SidebarBtn id="users" label="Users & Agents" icon={<IconUsers />} />
                    <SidebarBtn id="properties" label="All Properties" icon={<IconHome />} />

                    <p className="text-xs font-bold text-gray-400 uppercase px-4 mb-2 mt-6">Actions</p>
                    <SidebarBtn id="add-property" label="Add Property" icon={<IconAddProp />} />
                    <SidebarBtn id="add-agent" label="Add Agent" icon={<IconAddUser />} />
                </nav>

                <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-bold"
                    >
                        <IconLogout />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto w-full md:ml-72 p-4 md:p-8 relative pt-20 md:pt-8">
                {/* Background Decor */}
                <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 -z-10 pointer-events-none"></div>
                <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="fixed bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}

export default AdminLayout

