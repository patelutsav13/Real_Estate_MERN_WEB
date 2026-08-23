import React from "react"

export const PrimeEstateLogo = ({ className = "h-10", showTagline = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="h-full w-auto aspect-square drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
          <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6416" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <circle cx="60" cy="60" r="56" stroke="url(#goldGrad1)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
        <path
          d="M 12 76 Q 60 48 108 76"
          stroke="url(#goldGrad1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          filter="url(#goldGlow)"
        />
        <path d="M 22 76 L 36 64 L 50 76 Z" fill="url(#goldGrad2)" opacity="0.9" />
        <path d="M 70 76 L 84 64 L 98 76 Z" fill="url(#goldGrad2)" opacity="0.9" />
        <path d="M 38 66 L 38 34 L 48 26 L 48 66 Z" fill="url(#goldGrad1)" stroke="#8A6416" strokeWidth="0.5" />
        <path d="M 52 66 L 52 20 L 60 10 L 68 20 L 68 66 Z" fill="url(#goldGrad2)" stroke="#FFF" strokeWidth="0.5" />
        <path d="M 72 66 L 72 32 L 82 24 L 82 66 Z" fill="url(#goldGrad1)" stroke="#8A6416" strokeWidth="0.5" />
        <rect x="56" y="26" width="3" height="4" fill="#111827" opacity="0.7" />
        <rect x="56" y="34" width="3" height="4" fill="#111827" opacity="0.7" />
        <rect x="56" y="42" width="3" height="4" fill="#111827" opacity="0.7" />
        <path d="M 60 4 L 62 8 L 66 10 L 62 12 L 60 16 L 58 12 L 54 10 L 58 8 Z" fill="#FFF" />
      </svg>

      <div className="flex flex-col">
        <span className="font-extrabold tracking-wider text-xl sm:text-2xl uppercase bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-sm font-serif">
          PRIME<span className="text-gray-800 dark:text-white ml-1 font-sans">ESTATE</span>
        </span>
        {showTagline && (
          <span className="text-[10px] sm:text-xs tracking-widest uppercase text-amber-500 font-medium -mt-1">
            Find Your Dream Property
          </span>
        )}
      </div>
    </div>
  )
}

export default PrimeEstateLogo
