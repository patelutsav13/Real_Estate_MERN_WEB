import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { X, Upload } from "lucide-react"

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", password: "",
        title: "", address: "", experience: "", expertise: ""
    })
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get(`${API}/api/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUsers(res.data)
        } catch (error) {
            console.error("Error users", error)
        }
    }

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure?")) return
        const token = localStorage.getItem("token")
        try {
            await axios.delete(`${API}/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchUsers()
        } catch (error) {
            alert("Failed to delete user")
        }
    }

    const promoteUser = async (id, currentRole) => {
        const newRole = currentRole === "user" ? "agent" : currentRole === "agent" ? "admin" : "user"
        const token = localStorage.getItem("token")
        try {
            await axios.put(`${API}/api/admin/users/${id}/role`, { role: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchUsers()
        } catch (error) {
            alert("Failed to update role")
        }
    }

    const handleAddAgent = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem("token")
            const data = new FormData()
            Object.keys(formData).forEach(key => data.append(key, formData[key]))
            if (imageFile) data.append("image", imageFile)

            await axios.post(`${API}/api/admin/add-agent`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            alert("Agent added successfully!")
            setIsModalOpen(false)
            fetchUsers()
            setFormData({ name: "", email: "", phone: "", password: "", title: "", address: "", experience: "", expertise: "" })
            setImageFile(null)
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || "Error adding agent")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Manage Users & Agents
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                    + Add New Agent
                </button>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl overflow-hidden border border-white/20 dark:border-gray-700">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm border-b dark:border-gray-700">
                        <tr>
                            <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-700">
                        {users.map(user => (
                            <tr key={user._id} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200">
                                <td className="p-6 font-medium text-gray-900 dark:text-white">
                                    <div className="flex items-center gap-3">
                                        {user.role === 'agent' && user.image ? (
                                            <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                                                {user.name.charAt(0)}
                                            </div>
                                        )}
                                        {user.name}
                                    </div>
                                </td>
                                <td className="p-6 text-gray-500 dark:text-gray-400">{user.email}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' :
                                        user.role === 'agent' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800' :
                                            'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-6 text-right space-x-3">
                                    {user.role !== 'admin' && (
                                        <>
                                            <button
                                                onClick={() => promoteUser(user._id, user.role)}
                                                className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                            >
                                                Change Role
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user._id)}
                                                className="text-sm font-semibold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ADD AGENT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh] animate-scale-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Agent</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddAgent} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required type="text" placeholder="Full Name" className="p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                <input required type="email" placeholder="Email" className="p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                <input required type="text" placeholder="Phone" className="p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                <input required type="password" placeholder="Password" className="p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                <input required type="text" placeholder="Job Title" className="p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                <input required type="number" placeholder="Experience (Years)" className="p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                            </div>
                            <input required type="text" placeholder="Address" className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                            <textarea placeholder="Expertise (e.g. Residential, Commercial)" className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24"
                                value={formData.expertise} onChange={e => setFormData({ ...formData, expertise: e.target.value })}></textarea>

                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <label className="cursor-pointer">
                                    <span className="text-blue-600 font-semibold hover:underline">Upload Agent Photo</span>
                                    <input type="file" className="hidden" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
                                </label>
                                {imageFile && <p className="text-sm text-green-500 mt-2">{imageFile.name}</p>}
                            </div>

                            <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-transform hover:scale-[1.02]">
                                {loading ? "Creating Agent..." : "Create Agent"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminUsers

