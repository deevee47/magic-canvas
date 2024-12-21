import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'

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
                  <video controls muted loop autoPlay playsInline preload='none'> <source type="video/mp4" src="/demo.mp4"></source>Your browser does not support the video tag.  </video>
              </div>              
          </ContainerScroll>

      </div>
  )
}

export default CustomScroll