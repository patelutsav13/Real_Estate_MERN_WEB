

// "use client"

// import { useState } from "react"
// import { Heart, Bed, Bath, MapPin } from "lucide-react"

// const PropertyCard = ({ property }) => {
//   const [liked, setLiked] = useState(false)

//   return (
//     <div
//       tabIndex={0}
//       className="
//         bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg
//         transform transition-all duration-300
//         hover:-translate-y-2 hover:shadow-2xl
//         focus:-translate-y-2 focus:shadow-2xl
//         focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
//       "
//     >
//       {/* Image Container */}
//       <div className="relative overflow-hidden group">
//         <img
//           src={property.image || "/placeholder.svg"}
//           alt={property.name}
//           className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
//         />

//         {/* Property Status Badge */}
//         {property.status && (
//           <div
//             className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
//               property.status === "For Rent"
//                 ? "bg-green-500"
//                 : property.status === "For Buy"
//                 ? "bg-blue-500"
//                 : "bg-purple-500"
//             }`}
//           >
//             {property.status}
//           </div>
//         )}

//         {/* Like Button */}
//         <button
//           onClick={() => setLiked(!liked)}
//           className="
//             absolute top-4 right-4 p-2 rounded-full
//             bg-white dark:bg-gray-800
//             hover:scale-110 transition-all duration-300
//             focus:ring-2 focus:ring-blue-500 outline-none
//           "
//         >
//           <Heart
//             className={`w-5 h-5 ${
//               liked
//                 ? "fill-red-500 text-red-500"
//                 : "text-gray-600 dark:text-gray-300"
//             }`}
//           />
//         </button>
//       </div>

//       {/* Property Details */}
//       <div className="p-5">
//         <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 truncate">
//           {property.name}
//         </h3>

//         <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
//           <MapPin className="w-4 h-4 mr-1" />
//           <span className="text-sm truncate">{property.address}</span>
//         </div>

//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-1">
//               <Bed className="w-4 h-4 text-blue-600" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 {property.bedrooms}
//               </span>
//             </div>

//             <div className="flex items-center space-x-1">
//               <Bath className="w-4 h-4 text-blue-600" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">
//                 {property.bathrooms}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div>
//             <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//               ₹{property.price}
//             </span>
//             {property.priceType && (
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 /{property.priceType}
//               </span>
//             )}
//           </div>

//           <button
//             className="
//               px-4 py-2 text-sm font-semibold rounded-lg
//               bg-blue-600 text-white
//               hover:bg-blue-700 hover:scale-105 transition-all duration-300
//               focus:ring-2 focus:ring-blue-500 outline-none
//             "
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PropertyCard

"use client"

import { useState } from "react"
import { Heart, Bed, Bath, MapPin } from "lucide-react"

const PropertyCard = ({ property, onViewDetails }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div
      tabIndex={0}
      className="
        bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg
        transform transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
        focus:-translate-y-2 focus:shadow-2xl
        focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
      "
    >
      {/* Image Container */}
      <div className="relative overflow-hidden group">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Property Status Badge */}
        {property.status && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${property.status === "For Rent"
                ? "bg-green-500"
                : property.status === "For Buy" || property.status === "For Sale"
                  ? "bg-blue-500"
                  : (property.status === "Booked" || property.status === "Rented")
                    ? "bg-gray-500"
                    : "bg-purple-500"
              }`}
          >
            {property.status}
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="
            absolute top-4 right-4 p-2 rounded-full
            bg-white dark:bg-gray-800
            hover:scale-110 transition-all duration-300
            focus:ring-2 focus:ring-blue-500 outline-none
          "
        >
          <Heart
            className={`w-5 h-5 ${liked
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-300"
              }`}
          />
        </button>
      </div>

      {/* Property Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 truncate">
          {property.name}
        </h3>

        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm truncate">{property.address}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {property.bedrooms}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {property.bathrooms}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ₹{property.price}
            </span>
            {property.priceType && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                /{property.priceType}
              </span>
            )}
          </div>

          <button
            onClick={() => onViewDetails(property)}
            className="
              px-4 py-2 text-sm font-semibold rounded-lg
              bg-blue-600 text-white
              hover:bg-blue-700 hover:scale-105 transition-all duration-300
              focus:ring-2 focus:ring-blue-500 outline-none
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard