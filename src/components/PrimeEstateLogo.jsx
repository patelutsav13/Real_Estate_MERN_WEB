import React from "react"
import logoImg from "../assets/prime_estate_logo.png"

export const PrimeEstateLogo = ({ className = "h-12", showTagline = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative h-full aspect-square flex items-center justify-center overflow-hidden rounded-xl">
        <img
          src={logoImg}
          alt="PrimeEstate PE Crown Logo"
          className="h-full w-auto object-contain drop-shadow-[0_4px_12px_rgba(212,175,55,0.6)]"
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className="font-extrabold tracking-wider text-xl sm:text-2xl uppercase bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif drop-shadow-sm">
          PRIME<span className="text-white ml-1 font-sans">ESTATE</span>
        </span>
        {showTagline && (
          <span className="text-[10px] sm:text-xs tracking-widest uppercase text-amber-400 font-semibold -mt-1">
            Find Your Dream Property
          </span>
        )}
      </div>
    </div>
  )
}

export default PrimeEstateLogo
