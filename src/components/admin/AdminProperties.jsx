import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../../config"
import { getImageUrl } from "../../utils/getImageUrl"
import { Trash2, Sparkles, MapPin } from "lucide-react"

const AdminProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API}/api/properties`)
      setProperties(res.data)
    } catch (error) {
      console.error("Error properties", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to remove this property listing?")) return
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`${API}/api/admin/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Listing deleted successfully")
      fetchProperties()
    } catch (error) {
      alert("Failed to delete property")
    }
  }

  return (
    <div className="animate-fade-in text-white">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-8 h-8 text-amber-400" />
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Manage All Properties ({properties.length})
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-amber-400 font-bold py-12">Loading Property Database...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map(property => (
            <div key={property._id} className="group relative bg-slate-950/80 backdrop-blur-2xl rounded-3xl border border-amber-500/30 overflow-hidden hover:border-amber-400/60 transition-all duration-300 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="h-48 overflow-hidden relative bg-slate-950">
                  <img
                    src={getImageUrl(property.image)}
                    alt={property.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-white text-[10px] font-extrabold px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest ${
                      property.status === 'For Rent' ? 'bg-emerald-600' : 'bg-gradient-to-r from-amber-500 to-yellow-600'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-extrabold text-lg text-white mb-1 truncate">{property.name}</h3>
                  <p className="text-amber-200/70 text-xs mb-4 flex items-center gap-1 truncate">
                    <MapPin size={14} className="text-amber-400 shrink-0" />
                    <span>{property.address || property.area}</span>
                  </p>

                  <div className="flex justify-between items-center mb-4 text-xs">
                    <span className="text-xl font-extrabold text-amber-400">
                      ₹{Number(property.priceValue || 0).toLocaleString()}
                    </span>
                    <div className="text-gray-300 font-bold bg-slate-900 px-3 py-1.5 rounded-xl border border-amber-500/20">
                      {property.bedrooms} Beds • {property.bathrooms} Baths
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => deleteProperty(property._id)}
                  className="w-full py-3 bg-rose-600/90 text-white font-extrabold rounded-2xl hover:bg-rose-500 transition-all text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Trash2 size={16} /> Remove Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminProperties
