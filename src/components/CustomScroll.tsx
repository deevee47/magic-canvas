import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'
import Image from 'next/image'

const CustomScroll = () => {
  return (
      <div>
          <ContainerScroll
          titleComponent={
              <>
                  <h1 className="text-4xl font-semiboldtext-white">
                      Unleash the power with <br />
                      <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                          Your Fingertips
                      </span>
                  </h1>
              </>
          }
      >
              <div>
                  <video src="/demo.mp4" muted loop autoPlay playsInline controls></video>
              </div>              
          </ContainerScroll>

      </div>
  )
}

export default CustomScroll