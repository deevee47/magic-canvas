"use client"
import React from 'react'

const DemoButton = () => {
  return (
      <button
          onClick={() => {
              document.querySelector('.demo-video')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="px-4 py-2 rounded-xl bg-gray-800 text-white border-2 border-transparent hover:border-gray-800/50 transition-colors"
      >
          Watch Demo
      </button>
  )
}

export default DemoButton