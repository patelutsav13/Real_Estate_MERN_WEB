import { useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { Upload, X, Video, Image as ImageIcon, Link as LinkIcon, CheckCircle2, Sparkles } from "lucide-react"

const AdminAddProperty = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    priceValue: "",
    address: "",
    description: "",
    type: "Apartment",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: "",
    imageUrl: "",
    video: ""
  })

  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [urlPreview, setUrlPreview] = useState("")
  const [videoFile, setVideoFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "imageUrl") {
      setUrlPreview(value.trim())
    }
  }

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length === 0) return

    if (imageFiles.length + selectedFiles.length > 5) {
      alert("⚠️ Maximum of 5 images allowed per property.")
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
      alert("⚠️ Please upload at least 1 image file OR provide a direct Image URL / Gemini Image.")
      return
    }

    setLoading(true)
    setSuccessMessage("")

    const rawToken = localStorage.getItem("token")
    const token = rawToken ? rawToken.trim().replace(/^["']|["']$/g, "") : ""
    const data = new FormData()

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key])
      }
    })

    imageFiles.forEach((file) => {
      data.append("images", file)
    })
    if (imageFiles.length > 0) {
      data.append("image", imageFiles[0])
    }

    if (videoFile) {
      data.append("videoFile", videoFile)
    }

    try {
      const res = await axios.post(`${API}/api/properties`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 201 || res.status === 200) {
        setSuccessMessage("🎉 Property Published Successfully!")
        alert("🎉 Property Published Successfully!")
        if (setActiveTab) {
          setActiveTab("properties")
        }
      }
    } catch (error) {
      console.error("Error publishing property:", error)
      alert(error.response?.data?.message || "Failed to publish property: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in text-white">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-amber-400" />
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Publish Luxury Property
        </h2>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl flex items-center gap-3 font-bold text-sm">
          <CheckCircle2 size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="bg-slate-950/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-amber-500/30 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Address */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                Property Title *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Royal Palace Villa in Satellite"
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                Address / Area *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Satellite Road, Ahmedabad"
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                Display Price *
              </label>
              <input
                type="text"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 1.5 Cr or 85 Lakhs"
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                Numeric Price (for sorting) *
              </label>
              <input
                type="number"
                name="priceValue"
                required
                value={formData.priceValue}
                onChange={handleChange}
                placeholder="15000000"
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm focus:border-amber-400"
              />
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase block mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-3 py-3 outline-none text-white text-xs font-bold focus:border-amber-400"
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Office">Office</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase block mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-3 py-3 outline-none text-white text-xs font-bold focus:border-amber-400"
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase block mb-1">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-3 py-3 outline-none text-white text-xs font-bold focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-amber-300 uppercase block mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-3 py-3 outline-none text-white text-xs font-bold focus:border-amber-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Luxury property details, high-end amenities, panoramic view..."
              className="w-full bg-slate-900 border border-amber-500/20 rounded-xl px-4 py-3 outline-none text-white text-sm h-24 focus:border-amber-400"
            ></textarea>
          </div>

          {/* MULTI-IMAGE FILE UPLOAD OR IMAGE URL */}
          <div className="border border-amber-500/30 rounded-2xl p-6 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <ImageIcon size={18} />
                <span>Property Images (Upload up to 5 Images OR Any URL / Gemini Image)</span>
              </div>
              <span className="text-xs text-amber-400 font-bold">
                {imageFiles.length} / 5 File(s)
              </span>
            </div>

            <div>
              <label className="cursor-pointer block border border-amber-500/30 hover:border-amber-400 bg-slate-950 p-6 rounded-xl text-center transition-all">
                <Upload className="w-8 h-8 mx-auto text-amber-400 mb-2" />
                <span className="text-amber-300 font-bold text-sm hover:underline">
                  Select Image Files (PNG, JPG, WEBP, GIF, SVG, AVIF, HEIC)
                </span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleImagesChange}
                  accept="image/*"
                />
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-3 pt-2">
                {imagePreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-video rounded-xl overflow-hidden border border-amber-400 shadow-md"
                  >
                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-rose-600 rounded-full text-white hover:scale-110"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <label className="text-xs text-amber-300 flex items-center gap-1 mb-1 font-bold">
                <LinkIcon size={14} /> Option B: Direct Image Web URL or Gemini Image Data (Base64)
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/... or data:image/png;base64,... (Gemini)"
                className="w-full bg-slate-950 border border-amber-500/20 rounded-xl px-4 py-2.5 outline-none text-xs text-white focus:border-amber-400"
              />
            </div>

            {urlPreview && imagePreviews.length === 0 && (
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-1">
                  URL Preview:
                </p>
                <div className="w-44 h-28 rounded-xl overflow-hidden border border-amber-400/40 shadow-lg">
                  <img
                    src={urlPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg"
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* VIDEO TOUR (OPTIONAL) */}
          <div className="border border-amber-500/30 rounded-2xl p-6 bg-slate-900/60 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Video size={18} />
              <span>Video Tour Upload (MP4 Video File OR Direct Video URL)</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-300 block mb-1 font-semibold">Video Web URL</label>
                <input
                  type="text"
                  name="video"
                  value={formData.video}
                  onChange={handleChange}
                  placeholder="https://...mp4 or https://www.youtube.com/embed/..."
                  className="w-full bg-slate-950 border border-amber-500/20 rounded-xl px-4 py-2.5 outline-none text-xs text-white focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1 font-semibold">Video File Upload</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-slate-950 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-950 font-extrabold rounded-2xl shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 text-base"
          >
            {loading ? "Publishing Property Listing..." : "Publish Luxury Property"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddProperty

