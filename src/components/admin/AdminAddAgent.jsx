import { useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Upload } from "lucide-react"

const AdminAddAgent = ({ setActiveTab }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        title: "",
        address: "",
        experience: "",
        expertise: ""
    })
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!imageFile) {
            alert("Please upload an agent photo.")
            return
        }

        setLoading(true)
        const token = localStorage.getItem("token")

        const data = new FormData()
        Object.keys(formData).forEach(key => data.append(key, formData[key]))
        data.append("image", imageFile)

        try {
            await axios.post(`${API}/api/admin/add-agent`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            alert("✅ Agent Created Successfully!")
            setFormData({ name: "", email: "", phone: "", password: "", title: "", address: "", experience: "", expertise: "" })
            setImageFile(null)
            setActiveTab("users") // Redirect to users list
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || "Failed to create agent")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                Register New Agent
            </h2>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-gray-700 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text" name="name" required
                                value={formData.name} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Job Title</label>
                            <input
                                type="text" name="title" required
                                value={formData.title} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                                placeholder="e.g. Senior Real Estate Agent"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email" name="email" required
                                value={formData.email} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                                placeholder="agent@company.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Phone Number</label>
                            <input
                                type="text" name="phone" required
                                value={formData.phone} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Address</label>
                            <input
                                type="text" name="address" required
                                value={formData.address} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                                placeholder="Office Address"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Experience (Years)</label>
                            <input
                                type="number" name="experience" required
                                value={formData.experience} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                                placeholder="e.g. 5"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Expertise</label>
                        <textarea
                            name="expertise" required
                            value={formData.expertise} onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white h-24"
                            placeholder="e.g. Specialized in Luxury Villas and Commercial Properties"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Password</label>
                        <input
                            type="password" name="password" required
                            value={formData.password} onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 transition-all dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-900/50">
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                        <label className="cursor-pointer">
                            <span className="text-blue-600 font-bold text-lg hover:underline">Upload Profile Photo</span>
                            <input type="file" className="hidden" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
                        </label>
                        {imageFile ? (
                            <p className="text-sm text-green-500 mt-2 font-medium">{imageFile.name}</p>
                        ) : (
                            <p className="text-xs text-gray-500 mt-2">SVG, PNG, JPG (MAX. 5MB)</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {loading ? "Creating..." : "Create Agent Account"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminAddAgent
