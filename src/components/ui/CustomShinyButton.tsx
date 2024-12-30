"use client"
import React from 'react'
import ShinyButton from './shiny-button'


const CustomShinyButton = () => {

    return (
      <div className="relative flex items-center justify-center">
          {/* Glow effect */}
          <div
              className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-lg"
          ></div>
          <div
              className="absolute inset-0 translate-y-2 rounded-lg bg-purple-500 opacity-50 blur-[20px]"
          ></div>

          {/* Button */}
          <ShinyButton className="relative rounded-xl bg-black shadow-lg px-12 py-3 font-bold">
              Try Now
          </ShinyButton>
      </div>
  )
}

export default CustomShinyButton