import React from 'react'
import { ContainerScroll } from './ui/container-scroll-animation'

const CustomScroll = () => {
  return (
      <div>
          <ContainerScroll
          titleComponent={
              <>
                      <h1 className="text-4xl demo-video font-semiboldtext-white">
                      Unleash the power with <br />
                          <span className="text-4xl  md:text-[6rem] font-bold mt-1 leading-none">
                          Your Fingertips
                      </span>
                  </h1>
              </>
          }
      >
              <div className='h-full w-full'>
                  <iframe
                      src="https://www.youtube.com/embed/P2QhoWrxFjE?autoplay=1&controls=0"
                      allow="autoplay"
                      allowFullScreen
                      width="100%"
                      height="100%"
                      loading="eager"
                  ></iframe>
              </div>

             
          </ContainerScroll>

      </div>
  )
}

export default CustomScroll