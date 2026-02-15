// import { useEffect, useState } from "react"
// import axios from "axios"
// import { API } from "../../config"
// import { X, Upload, Plus } from "lucide-react"

// const AdminProperties = () => {
//     const [properties, setProperties] = useState([])
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [formData, setFormData] = useState({
//         name: "", address: "", price: "", priceValue: "", bedrooms: "", bathrooms: "", area: "",
//         type: "Apartment", status: "For Sale", description: ""
//     })
//     const [imageFile, setImageFile] = useState(null)
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         fetchProperties()
//     }, [])

//     const fetchProperties = async () => {
//         try {
//             const res = await axios.get(`${API}/api/properties`)
//             setProperties(res.data)
//         } catch (error) {
//             console.error("Error properties", error)
//         }
//     }

//     const deleteProperty = async (id) => {
//         if (!window.confirm("Are you sure?")) return
//         const token = localStorage.getItem("token")
//         try {
//             await axios.delete(`${API}/api/admin/properties/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             fetchProperties()
//         } catch (error) {
//             alert("Failed to delete property")
//         }
//     }

//     const handleAddProperty = async (e) => {
//         e.preventDefault()
//         setLoading(true)
//         try {
//             const token = localStorage.getItem("token")
//             const data = new FormData()
//             // Append all text fields
//             Object.keys(formData).forEach(key => data.append(key, formData[key]))
//             // Append image if selected
//             if (imageFile) data.append("image", imageFile)

//             await axios.post(`${API}/api/properties`, data, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 }
//             })

//             alert("Property added successfully!")
//             setIsModalOpen(false)
//             fetchProperties()
//             setFormData({
//                 name: "", address: "", price: "", priceValue: "", bedrooms: "", bathrooms: "", area: "",
//                 type: "Apartment", status: "For Sale", description: ""
//             })
//             setImageFile(null)
//         } catch (error) {
//             console.error(error)
//             alert(error.response?.data?.message || "Error adding property")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="animate-fade-in-up">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//                     Manage Properties
//                 </h1>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold"
//                 >
//                     <Plus className="w-5 h-5" /> Add New Property
//                 </button>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {properties.map(property => (
//                     <div key={property._id} className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
//                         {/* Image Overlay */}
//                         <div className="h-48 overflow-hidden relative">
//                             <img src={property.image || "/placeholder.svg"} alt={property.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                             <div className="absolute bottom-4 left-4">
//                                 <span className={`text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/30 uppercase tracking-widest ${property.status === 'For Rent' ? 'bg-green-500' : 'bg-blue-500'
//                                     }`}>
//                                     {property.status}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="p-6">
//                             <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2 truncate group-hover:text-blue-600 transition-colors">{property.name}</h3>
//                             <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center gap-1">
//                                 📍 {property.address}
//                             </p>

//                             <div className="flex justify-between items-end mb-6">
//                                 <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
//                                     ₹{Number(property.priceValue).toLocaleString()}
//                                 </span>
//                                 <div className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
//                                     {property.bedrooms} Beds • {property.bathrooms} Baths
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={() => deleteProperty(property._id)}
//                                 className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-500 hover:text-white dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white transition-all transform active:scale-95"
//                             >
//                                 Remove Listing
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* ADD PROPERTY MODAL */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
//                     <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-4xl shadow-2xl animate-scale-in my-8">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Property</h2>
//                             <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>

//                         <form onSubmit={handleAddProperty} className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <input required type="text" placeholder="Property Title" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                     value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
//                                 <input required type="text" placeholder="Address" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                     value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />

//                                 <div className="grid grid-cols-2 gap-4">
//                                     <input required type="text" placeholder="Display Price (e.g. 1 Cr)" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                         value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
//                                     <input required type="number" placeholder="Numeric Price" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                         value={formData.priceValue} onChange={e => setFormData({ ...formData, priceValue: e.target.value })} />
//                                 </div>

//                                 <div className="grid grid-cols-3 gap-4">
//                                     <input required type="number" placeholder="Beds" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                         value={formData.bedrooms} onChange={e => setFormData({ ...formData, bedrooms: e.target.value })} />
//                                     <input required type="number" placeholder="Baths" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                         value={formData.bathrooms} onChange={e => setFormData({ ...formData, bathrooms: e.target.value })} />
//                                     <input required type="text" placeholder="Area (Sq ft)" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                         value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
//                                 </div>

//                                 <select className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                     value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
//                                     <option value="Apartment">Apartment</option>
//                                     <option value="House">House</option>
//                                     <option value="Villa">Villa</option>
//                                     <option value="Office">Office</option>
//                                 </select>

//                                 <select className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
//                                     value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
//                                     <option value="For Sale">For Sale</option>
//                                     <option value="For Rent">For Rent</option>
//                                 </select>
//                             </div>

//                             <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-900/50">
//                                 <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
//                                 <label className="cursor-pointer">
//                                     <span className="text-blue-600 font-bold text-lg hover:underline">Click to Upload Property Image</span>
//                                     <input type="file" className="hidden" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
//                                 </label>
//                                 {imageFile ? (
//                                     <p className="text-sm text-green-500 mt-2 font-medium">{imageFile.name}</p>
//                                 ) : (
//                                     <p className="text-xs text-gray-500 mt-2">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
//                                 )}
//                             </div>

//                             <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-transform hover:scale-[1.01] active:scale-95">
//                                 {loading ? "Adding Property..." : "Add Property"}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default AdminProperties



import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { X, Upload, Plus } from "lucide-react"

const AdminProperties = () => {
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "/placeholder.svg";
        if (imagePath.startsWith("http")) return imagePath; // Already absolute (e.g. Unsplash or Cloudinary)
        // If it's a relative path from our backend (starts with /uploads or just uploads)
        // Ensure it starts with /
        const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
        return `${API}${cleanPath}`;
    }

    const [properties, setProperties] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "", address: "", price: "", priceValue: "", bedrooms: "", bathrooms: "", area: "",
        type: "Apartment", status: "For Sale", description: ""
    })
    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        try {
            const res = await axios.get(`${API}/api/properties`)
            setProperties(res.data)
        } catch (error) {
            console.error("Error properties", error)
        }
    }

    const deleteProperty = async (id) => {
        if (!window.confirm("Are you sure?")) return
        const token = localStorage.getItem("token")
        try {
            await axios.delete(`${API}/api/admin/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchProperties()
        } catch (error) {
            alert("Failed to delete property")
        }
    }

    const handleAddProperty = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const token = localStorage.getItem("token")
            const data = new FormData()
            // Append all text fields
            Object.keys(formData).forEach(key => data.append(key, formData[key]))
            // Append image if selected
            if (imageFile) data.append("image", imageFile)

            await axios.post(`${API}/api/properties`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })

            alert("Property added successfully!")
            setIsModalOpen(false)
            fetchProperties()
            setFormData({
                name: "", address: "", price: "", priceValue: "", bedrooms: "", bathrooms: "", area: "",
                type: "Apartment", status: "For Sale", description: ""
            })
            setImageFile(null)
        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || "Error adding property")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Manage Properties
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-semibold"
                >
                    <Plus className="w-5 h-5" /> Add New Property
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {properties.map(property => (
                    <div key={property._id} className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        {/* Image Overlay */}
                        <div className="h-48 overflow-hidden relative">
                            <img src={getImageUrl(property.image)} alt={property.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className={`text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/30 uppercase tracking-widest ${property.status === 'For Rent' ? 'bg-green-500' : 'bg-blue-500'
                                    }`}>
                                    {property.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2 truncate group-hover:text-blue-600 transition-colors">{property.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center gap-1">
                                📍 {property.address}
                            </p>

                            <div className="flex justify-between items-end mb-6">
                                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                                    ₹{Number(property.priceValue).toLocaleString()}
                                </span>
                                <div className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                    {property.bedrooms} Beds • {property.bathrooms} Baths
                                </div>
                            </div>

                            <button
                                onClick={() => deleteProperty(property._id)}
                                className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-500 hover:text-white dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white transition-all transform active:scale-95"
                            >
                                Remove Listing
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ADD PROPERTY MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-4xl shadow-2xl animate-scale-in my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Property</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProperty} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input required type="text" placeholder="Property Title" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                <input required type="text" placeholder="Address" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                    value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />

                                <div className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="Display Price (e.g. 1 Cr)" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                    <input required type="number" placeholder="Numeric Price" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        value={formData.priceValue} onChange={e => setFormData({ ...formData, priceValue: e.target.value })} />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <input required type="number" placeholder="Beds" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        value={formData.bedrooms} onChange={e => setFormData({ ...formData, bedrooms: e.target.value })} />
                                    <input required type="number" placeholder="Baths" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        value={formData.bathrooms} onChange={e => setFormData({ ...formData, bathrooms: e.target.value })} />
                                    <input required type="text" placeholder="Area (Sq ft)" className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                        value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
                                </div>

                                <select className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                    value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option value="Apartment">Apartment</option>
                                    <option value="House">House</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Office">Office</option>
                                </select>

                                <select className="p-4 rounded-xl border dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
                                    value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                    <option value="For Sale">For Sale</option>
                                    <option value="For Rent">For Rent</option>
                                </select>
                            </div>

                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-900/50">
                                <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                                <label className="cursor-pointer">
                                    <span className="text-blue-600 font-bold text-lg hover:underline">Click to Upload Property Image</span>
                                    <input type="file" className="hidden" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
                                </label>
                                {imageFile ? (
                                    <p className="text-sm text-green-500 mt-2 font-medium">{imageFile.name}</p>
                                ) : (
                                    <p className="text-xs text-gray-500 mt-2">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                                )}
                            </div>

                            <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-transform hover:scale-[1.01] active:scale-95">
                                {loading ? "Adding Property..." : "Add Property"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProperties

