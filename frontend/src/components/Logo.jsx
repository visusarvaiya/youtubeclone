import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className="flex items-center gap-1 sm:gap-1.5 flex-row">
      <div className="flex h-6 w-9 sm:h-7 sm:w-10 items-center justify-center rounded-lg bg-[#FF0000]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 text-white"
        >
          <path d="M9.5 15.5V8.5L16 12L9.5 15.5Z" fill="currentColor" />
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white flex items-center">
        YouTube
      </span>
    </div>
  )
}

export default Logo