import { useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Upload, X, Video, Image as ImageIcon, Link as LinkIcon, CheckCircle2 } from "lucide-react"

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
    area: "",
    imageUrl: "",
    video: ""
  })

  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [videoFile, setVideoFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle image files selection (supports all image extensions: PNG, JPG, WEBP, GIF, SVG, etc.)
  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length === 0) return

    if (imageFiles.length + selectedFiles.length > 5) {
      alert("⚠️ You can upload a maximum of 5 images per property.")
      return
    }

    const newFiles = [...imageFiles, ...selectedFiles].slice(0, 5)
    setImageFiles(newFiles)

    const previews = newFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index)
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index)
    setImageFiles(updatedFiles)
    setImagePreviews(updatedPreviews)
  }

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVideoFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (imageFiles.length < 1 && !formData.imageUrl.trim()) {
      alert("⚠️ Please upload at least 1 image file OR provide a valid Image URL.")
      return
    }

    setLoading(true)
    const token = localStorage.getItem("token")

    const data = new FormData()
    Object.keys(formData).forEach(key => data.append(key, formData[key]))

    imageFiles.forEach(file => {
      data.append("images", file)
    })

    if (videoFile) {
      data.append("videoFile", videoFile)
    }

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
      <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-amber-400 dark:to-yellow-500 mb-6">
        Add New Property
      </h2>

      <div className="bg-white dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-amber-500/20 text-gray-900 dark:text-white">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title & Address */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider">Property Title *</label>
              <input
                type="text" name="name" required
                value={formData.name} onChange={handleChange}
                placeholder="e.g. Royal Palace Villa in Satellite"
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-400 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider">Address / Area *</label>
              <input
                type="text" name="address" required
                value={formData.address} onChange={handleChange}
                placeholder="Satellite Road, Ahmedabad"
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider">Display Price *</label>
              <input
                type="text" name="price" required
                value={formData.price} onChange={handleChange}
                placeholder="e.g. 1.5 Cr or 45,000"
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-400 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider">Numeric Price (for filtering) *</label>
              <input
                type="number" name="priceValue" required
                value={formData.priceValue} onChange={handleChange}
                placeholder="15000000"
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
              <select
                name="type" value={formData.type} onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-3 py-3 outline-none"
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
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-3 py-3 outline-none"
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
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-3 py-3 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Bathrooms</label>
              <input
                type="number" name="bathrooms"
                value={formData.bathrooms} onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-600 dark:text-amber-400 uppercase tracking-wider">Description</label>
            <textarea
              name="description"
              value={formData.description} onChange={handleChange}
              placeholder="Property description..."
              className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-3 outline-none h-24"
            ></textarea>
          </div>

          {/* MULTI-IMAGE FILE UPLOAD OR IMAGE URL */}
          <div className="border-2 border-dashed border-blue-200 dark:border-amber-500/30 rounded-2xl p-6 bg-gray-50 dark:bg-slate-950/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600 dark:text-amber-400 font-bold">
                <ImageIcon size={20} />
                <span>Property Images (File Upload or Image URL)</span>
              </div>
              <span className="text-xs text-gray-500 font-semibold">{imageFiles.length} / 5 Uploaded</span>
            </div>

            {/* Option 1: File Upload (All Types: PNG, JPG, WEBP, GIF, SVG, etc.) */}
            <div>
              <label className="cursor-pointer block border border-gray-300 dark:border-amber-500/20 hover:border-blue-500 dark:hover:border-amber-400 bg-white dark:bg-slate-900 p-6 rounded-xl text-center transition-all">
                <Upload className="w-8 h-8 mx-auto text-blue-600 dark:text-amber-400 mb-2" />
                <span className="text-blue-600 dark:text-amber-300 font-bold hover:underline">Click to Upload Image Files</span>
                <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, JPEG, WEBP, GIF, SVG (up to 5 images)</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImagesChange}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-3 pt-2">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden border border-amber-400/50">
                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-rose-600 rounded-full text-white hover:scale-110 transition-transform"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Option 2: Image URL Input */}
            <div className="pt-2">
              <label className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1 font-semibold">
                <LinkIcon size={14} /> Option B: Direct Image Web URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-2.5 outline-none text-sm"
              />
            </div>
          </div>

          {/* VIDEO UPLOAD (OPTIONAL) */}
          <div className="border border-gray-200 dark:border-amber-500/20 rounded-2xl p-6 bg-gray-50 dark:bg-slate-950/60 space-y-3">
            <div className="flex items-center gap-2 text-rose-500 font-bold">
              <Video size={20} />
              <span>Property Video Tour (Optional)</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Video URL (YouTube / MP4 URL)</label>
                <input
                  type="url"
                  name="video"
                  value={formData.video}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-amber-500/20 rounded-xl px-4 py-2.5 outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-1">Video File Upload</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-rose-600 file:text-white"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-amber-400 dark:via-yellow-500 dark:to-amber-600 text-white dark:text-slate-950 font-extrabold rounded-2xl shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50 text-lg"
          >
            {loading ? "Publishing Property..." : "Publish Property"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddProperty
