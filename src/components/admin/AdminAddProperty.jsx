import { useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Upload } from "lucide-react"

const AdminAddProperty = ({ setActiveTab }) => {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        priceValue: "",
        address: "",
        description: "",
        type: "Apartment",
        status: "For Sale",
        bedrooms: 2,
        bathrooms: 1,
        area: ""
    })
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                alert("Invalid file type! Please upload only JPG, JPEG, PNG, or WEBP images.");
                e.target.value = "";
                setImageFile(null);
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert("File too large! Please upload an image smaller than 5MB.");
                e.target.value = "";
                setImageFile(null);
                return;
            }

            setImageFile(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!imageFile) {
            alert("Please upload a property image.")
            return
        }

        setLoading(true)
        const token = localStorage.getItem("token")

        const data = new FormData()
        Object.keys(formData).forEach(key => data.append(key, formData[key]))
        data.append("image", imageFile)

        try {
            await axios.post(`${API}/api/properties`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            alert("✅ Property Listed Successfully!")
            setActiveTab("properties")
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || "Failed to create property")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
                Add New Property
            </h2>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* TOP SECTION */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase">Property Title</label>
                            <input
                                type="text" name="name" required
                                value={formData.name} onChange={handleChange}
                                placeholder="e.g. Luxury Villa in Bali"
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 transition-all dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase">Address</label>
                            <input
                                type="text" name="address" required
                                value={formData.address} onChange={handleChange}
                                placeholder="Full street address"
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 transition-all dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase">Price (Display Text)</label>
                            <input
                                type="text" name="price" required
                                value={formData.price} onChange={handleChange}
                                placeholder="e.g. ₹2,50,00,000"
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 transition-all dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase">Numeric Price</label>
                            <input
                                type="number" name="priceValue" required
                                value={formData.priceValue} onChange={handleChange}
                                placeholder="25000000"
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 transition-all dark:text-white"
                            />
                        </div>
                    </div>

                    {/* DETAILS GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
                            <select
                                name="type" value={formData.type} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-3 focus:ring-2 focus:ring-pink-500 dark:text-white"
                            >
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                                <option value="Office">Office</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
                            <select
                                name="status" value={formData.status} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-3 focus:ring-2 focus:ring-pink-500 dark:text-white"
                            >
                                <option value="For Sale">For Sale</option>
                                <option value="For Rent">For Rent</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Bedrooms</label>
                            <input
                                type="number" name="bedrooms"
                                value={formData.bedrooms} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-3 focus:ring-2 focus:ring-pink-500 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Bathrooms</label>
                            <input
                                type="number" name="bathrooms"
                                value={formData.bathrooms} onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-3 py-3 focus:ring-2 focus:ring-pink-500 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                        <textarea
                            name="description"
                            value={formData.description} onChange={handleChange}
                            placeholder="Property description..."
                            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 transition-all dark:text-white h-24"
                        ></textarea>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-900/50">
                        <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                        <label className="cursor-pointer">
                            <span className="text-purple-600 font-bold text-lg hover:underline">Click to Upload Property Image</span>
                            <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                        </label>
                        {imageFile ? (
                            <p className="text-sm text-green-500 mt-2 font-medium">{imageFile.name}</p>
                        ) : (
                            <p className="text-xs text-gray-500 mt-2">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 transition-all disabled:opacity-50 text-lg"
                    >
                        {loading ? "Listing..." : "Publish Property"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminAddProperty

