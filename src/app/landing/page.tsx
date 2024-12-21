import Background from '@/components/Background'
import CustomScroll from '@/components/CustomScroll'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Testimonials from '@/components/Testimonials'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Navbar />
      <Background />
      <Hero />
      <CustomScroll />
      <Testimonials />
    </div>
  )
}

export default Page