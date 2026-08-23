import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Sparkles, Trash2, ShieldCheck, UserPlus, X, Upload } from "lucide-react"

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
    if (!window.confirm("Are you sure you want to remove this user?")) return
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`${API}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("User removed successfully")
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
      alert(`User role updated to: ${newRole.toUpperCase()}`)
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

      alert("🎉 Certified Agent Added Successfully!")
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
    <div className="animate-fade-in text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-400" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            User & Agent Directory ({users.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-2xl shadow-xl hover:scale-105 transition-all text-xs"
        >
          <UserPlus size={16} /> + Register New Agent
        </button>
      </div>

      <div className="bg-slate-950/80 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-amber-500/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 border-b border-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
              <tr>
                <th className="p-5">User / Agent Name</th>
                <th className="p-5">Email Address</th>
                <th className="p-5">System Role</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10 text-sm">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-5 font-bold text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-extrabold text-base shadow-md">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-extrabold">{u.name}</p>
                        {u.title && <p className="text-[10px] text-amber-300 font-semibold">{u.title}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-gray-300 text-xs">{u.email}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                      u.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      u.role === 'agent' ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40' :
                      'bg-slate-800 text-gray-300 border-amber-500/10'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-5 text-right space-x-3 text-xs">
                    {u.role !== 'admin' && (
                      <>
                        <button
                          onClick={() => promoteUser(u._id, u.role)}
                          className="font-bold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          Change Role
                        </button>
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="font-bold text-rose-400 hover:text-rose-300 transition-colors"
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
      </div>

      {/* ADD AGENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4">
          <div className="bg-slate-950 rounded-3xl p-8 w-full max-w-2xl border border-amber-500/40 shadow-2xl overflow-y-auto max-h-[90vh] text-white">
            <div className="flex justify-between items-center mb-6 border-b border-amber-500/20 pb-3">
              <h2 className="text-xl font-extrabold text-amber-300">Register Certified Agent</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-amber-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddAgent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <input required type="text" placeholder="Full Name" className="p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input required type="email" placeholder="Email Address" className="p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input required type="text" placeholder="Phone Number" className="p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white"
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <input required type="password" placeholder="Account Password" className="p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white"
                  value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                <input required type="text" placeholder="Designation (e.g. Senior Luxury Specialist)" className="p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white"
                  value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                <input required type="number" placeholder="Years of Experience" className="p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-white"
                  value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
              </div>
              <input required type="text" placeholder="Office Address" className="w-full p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-xs text-white"
                value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
              <textarea placeholder="Expertise (e.g. Luxury Villas, Commercial High-rises)" className="w-full p-3.5 bg-slate-900 border border-amber-500/20 rounded-xl outline-none text-xs text-white h-20"
                value={formData.expertise} onChange={e => setFormData({ ...formData, expertise: e.target.value })}></textarea>

              <div className="border border-amber-500/30 rounded-xl p-4 text-center bg-slate-900/60">
                <Upload className="w-6 h-6 mx-auto text-amber-400 mb-2" />
                <label className="cursor-pointer">
                  <span className="text-amber-300 font-bold text-xs hover:underline">Upload Agent Photo</span>
                  <input type="file" className="hidden" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
                </label>
                {imageFile && <p className="text-xs text-emerald-400 mt-2 font-bold">{imageFile.name}</p>}
              </div>

              <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 py-3.5 rounded-2xl font-extrabold text-sm shadow-xl">
                {loading ? "Registering..." : "Register Agent"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
