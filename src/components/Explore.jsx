

// "use client"

// import { useState } from "react"
// import SearchBar from "./SearchBar"
// import PropertyCard from "./PropertyCard"
// import FilterPanel from "./FilterPanel"

// import Img1 from "../assets/image1.png"
// import Img2 from "../assets/image2.png"
// import Img3 from "../assets/image3.png"
// import Img4 from "../assets/image4.png"
// import Img5 from "../assets/image5.png"
// import Img6 from "../assets/image6.png"

// import { Building2, Users, Home, TrendingUp } from "lucide-react"

// const Explore = () => {
//   /* =========================
//      STATS (UNCHANGED)
//   ========================= */
//   const stats = [
//     { icon: Building2, label: "Properties", value: "20+", color: "blue" },
//     { icon: Users, label: "Agents", value: "15+", color: "purple" },
//     { icon: Home, label: "Sold Properties", value: "50+", color: "green" },
//     { icon: TrendingUp, label: "Active Listings", value: "30+", color: "orange" },
//   ]

//   /* =========================
//      ALL PROPERTIES
//   ========================= */
//   const allProperties = [
//     {
//       id: 1,
//       name: "Luxury Villa in Satellite",
//       address: "Satellite Road, Ahmedabad",
//       price: "1.5 Cr",
//       priceValue: 15000000,
//       bedrooms: 13,
//       bathrooms: 7,
//       image: Img1,
//       area: "Satellite",
//       type: "Villa",
//     },
//     {
//       id: 2,
//       name: "Modern Apartment",
//       address: "Sindhu Bhavan Road, Ahmedabad",
//       price: "45000",
//       priceValue: 45000,
//       bedrooms: 6,
//       bathrooms: 3,
//       image: Img2,
//       area: "Sindhu Bhavan Road",
//       type: "Apartment",
//     },
//     {
//       id: 3,
//       name: "Premium House Iscon",
//       address: "Iscon Circle, Ahmedabad",
//       price: "95 Lac",
//       priceValue: 9500000,
//       bedrooms: 12,
//       bathrooms: 5,
//       image: Img3,
//       area: "Iscon",
//       type: "House",
//     },
//     {
//       id: 4,
//       name: "Spacious Villa",
//       address: "Prahlad Nagar, Ahmedabad",
//       price: "2 Cr",
//       priceValue: 20000000,
//       bedrooms: 18,
//       bathrooms: 8,
//       image: Img4,
//       area: "Prahlad Nagar",
//       type: "Villa",
//     },
//     {
//       id: 5,
//       name: "Cozy Apartment",
//       address: "Sola, Ahmedabad",
//       price: "35000",
//       priceValue: 35000,
//       bedrooms: 8,
//       bathrooms: 2,
//       image: Img5,
//       area: "Sola",
//       type: "Apartment",
//     },
//     {
//       id: 6,
//       name: "Executive House",
//       address: "Gota, Ahmedabad",
//       price: "75 Lac",
//       priceValue: 7500000,
//       bedrooms: 10,
//       bathrooms: 3,
//       image: Img6,
//       area: "Gota",
//       type: "House",
//     },
//   ]

//   /* =========================
//      STATES
//   ========================= */
//   const [properties, setProperties] = useState(allProperties)
//   const [searchFilters, setSearchFilters] = useState({ area: "", type: "" })
//   const [panelFilters, setPanelFilters] = useState({
//     priceRange: [0, 100000000],
//     propertyTypes: [],
//   })

//   /* =========================
//      APPLY ALL FILTERS
//   ========================= */
//   const applyAllFilters = (search, panel) => {
//     const filtered = allProperties.filter((property) => {
//       const matchArea =
//         !search.area || property.area === search.area

//       const matchType =
//         !search.type || property.type === search.type

//       const matchPrice =
//         property.priceValue >= panel.priceRange[0] &&
//         property.priceValue <= panel.priceRange[1]

//       const matchPanelTypes =
//         panel.propertyTypes.length === 0 ||
//         panel.propertyTypes.includes(property.type)

//       return matchArea && matchType && matchPrice && matchPanelTypes
//     })

//     setProperties(filtered)
//   }

//   /* =========================
//      SEARCH BAR HANDLER
//   ========================= */
//   const handleSearch = (searchData) => {
//     setSearchFilters(searchData)
//     applyAllFilters(searchData, panelFilters)
//   }

//   /* =========================
//      FILTER PANEL HANDLER
//   ========================= */
//   const handleFilter = (filterData) => {
//     setPanelFilters(filterData)
//     applyAllFilters(searchFilters, filterData)
//   }

//   /* =========================
//      JSX
//   ========================= */
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
//       {/* Hero */}
//       <div className="max-w-7xl mx-auto mb-12">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//             Find Your{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Dream Home
//             </span>
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400">
//             Discover the best properties in Ahmedabad
//           </p>
//         </div>

//         <SearchBar onSearch={handleSearch} />

//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
//           {stats.map((stat, i) => (
//             <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//               <stat.icon className="w-6 h-6 text-blue-600 mb-2" />
//               <h3 className="text-3xl font-bold">{stat.value}</h3>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Properties */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between mb-6">
//           <h2 className="text-2xl font-bold">All Properties</h2>
//           <FilterPanel onFilter={handleFilter} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {properties.length > 0 ? (
//             properties.map((property) => (
//               <PropertyCard key={property.id} property={property} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               No properties found
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Explore

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { API } from "../config"
import SearchBar from "./SearchBar"
import PropertyCard from "./PropertyCard"
import FilterPanel from "./FilterPanel"

import { Building2, Users, Home, TrendingUp } from "lucide-react"

const Explore = ({ openDetails }) => {
  /* =========================
     STATS (UNCHANGED)
  ========================= */
  const stats = [
    { icon: Building2, label: "Properties", value: "20+", color: "blue" },
    { icon: Users, label: "Agents", value: "15+", color: "purple" },
    { icon: Home, label: "Sold Properties", value: "50+", color: "green" },
    { icon: TrendingUp, label: "Active Listings", value: "30+", color: "orange" },
  ]

  /* =========================
     STATES
  ========================= */
  const [allProperties, setAllProperties] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchFilters, setSearchFilters] = useState({ area: "", type: "" })
  const [panelFilters, setPanelFilters] = useState({
    priceRange: [0, 100000000],
    propertyTypes: [],
  })

  /* =========================
     FETCH PROPERTIES
  ========================= */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API}/api/properties`)
        setAllProperties(res.data)
        setProperties(res.data) // Initial display
      } catch (err) {
        console.error("Error fetching properties:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  /* =========================
     APPLY ALL FILTERS
  ========================= */
  const applyAllFilters = (search, panel) => {
    const filtered = allProperties.filter((property) => {
      const matchArea =
        !search.area || property.area === search.area

      const matchType =
        !search.type || property.type === search.type

      const matchPrice =
        property.priceValue >= panel.priceRange[0] &&
        property.priceValue <= panel.priceRange[1]

      const matchPanelTypes =
        panel.propertyTypes.length === 0 ||
        panel.propertyTypes.includes(property.type)

      return matchArea && matchType && matchPrice && matchPanelTypes
    })

    setProperties(filtered)
  }

  /* =========================
     SEARCH BAR HANDLER
  ========================= */
  const handleSearch = (searchData) => {
    setSearchFilters(searchData)
    applyAllFilters(searchData, panelFilters)
  }

  /* =========================
     FILTER PANEL HANDLER
  ========================= */
  const handleFilter = (filterData) => {
    setPanelFilters(filterData)
    applyAllFilters(searchFilters, filterData)
  }

  /* =========================
     JSX
  ========================= */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dream Home
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover the best properties in Ahmedabad
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <stat.icon className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Properties */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">All Properties</h2>
          <FilterPanel onFilter={handleFilter} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={openDetails}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No properties found
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Explore