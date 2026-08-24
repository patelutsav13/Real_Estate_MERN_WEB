import { useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Upload, Sparkles, Link as LinkIcon } from "lucide-react"

const AdminAddAgent = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    title: "",
    address: "",
    experience: "",
    expertise: "",
    imageUrl: ""
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const rawToken = localStorage.getItem("token")
    const token = rawToken ? rawToken.trim().replace(/^["']|["']$/g, "") : ""

    const data = new FormData()
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key])
      }
    })
    if (imageFile) {
      data.append("image", imageFile)
    }

    try {
      await axios.post(`${API}/api/admin/add-agent`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      alert("🎉 Certified Agent Account Created Successfully!")
      setFormData({ name: "", email: "", phone: "", password: "", title: "", address: "", experience: "", expertise: "", imageUrl: "" })
      setImageFile(null)
      if (setActiveTab) setActiveTab("users")
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Failed to create agent")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in text-white">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Register Certified Advisor / Agent
        </h2>
      </div>

      <div className="bg-slate-950/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-2xl max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-amber-300 uppercase tracking-wider">Full Name *</label>
              <input
                type="text" name="name" required
                value={formData.name} onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm"
                placeholder="e.g. Alexander Wright"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-amber-300 uppercase tracking-wider">Job Title *</label>
              <input
                type="text" name="title" required
                value={formData.title} onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm"
                placeholder="Senior Luxury Estate Advisor"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-amber-300 uppercase tracking-wider">Email Address *</label>
              <input
                type="email" name="email" required
                value={formData.email} onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm"
                placeholder="agent@primeestate.com"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-amber-300 uppercase tracking-wider">Phone Number *</label>
              <input
                type="text" name="phone" required
                value={formData.phone} onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-amber-300 uppercase tracking-wider">Office Address *</label>
              <input
                type="text" name="address" required
                value={formData.address} onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm"
                placeholder="SG Highway, Ahmedabad"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-amber-300 uppercase tracking-wider">Experience (Years) *</label>
              <input
                type="number" name="experience" required
                value={formData.experience} onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm"
                placeholder="8"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-amber-300 uppercase tracking-wider">Expertise & Specializations *</label>
            <textarea
              name="expertise" required
              value={formData.expertise} onChange={handleChange}
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm h-24"
              placeholder="Specialized in Luxury Penthouses, Sea-facing Villas & Commercial Investments"
            />
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-amber-300 uppercase tracking-wider">Account Password *</label>
            <input
              type="password" name="password" required
              value={formData.password} onChange={handleChange}
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="border border-amber-500/30 rounded-2xl p-6 bg-slate-900/60 space-y-3">
            <label className="font-bold text-amber-300 uppercase text-xs tracking-wider block">Agent Profile Image</label>
            <div className="text-center p-4 border border-dashed border-amber-500/30 rounded-xl bg-slate-950">
              <Upload className="w-6 h-6 mx-auto text-amber-400 mb-2" />
              <label className="cursor-pointer">
                <span className="text-amber-300 font-extrabold text-xs hover:underline">Select Image File (PNG, JPG, WEBP)</span>
                <input type="file" className="hidden" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
              </label>
              {imageFile && <p className="text-xs text-emerald-400 font-bold mt-2">{imageFile.name}</p>}
            </div>

            <div className="pt-2">
              <label className="text-xs text-gray-300 flex items-center gap-1 mb-1 font-bold">
                <LinkIcon size={14} /> Option B: Direct Image Web URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-slate-950 border border-amber-500/20 rounded-xl px-4 py-2.5 outline-none text-xs text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 text-base"
          >
            {loading ? "Registering Agent..." : "Create Agent Account"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddAgent
