import React from 'react'



function LlmBox() {
  return (
    <div className=' flex flex-col lg:flex-row gap-4 md:gap-8 max-w-7xl mx-3 my-4 md:my-8 p-4 md:p-8 border-2 border-white/20 backdrop-blur-lg shadow-lg rounded-lg relative'>
       <section class="mt-[100px] md:mt-[140px]">
      <div>
        <div class="relative text-center">
          <div class="w-full md:w-[750px] h-[300px] md:h-[500px] rounded-[20px] bg-gradient-radial from-white/80 to-white/20 overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
           
          </div>
          <button class="mt-4 md:mt-[30px] md:ml-[600px] px-4 md:px-5 py-2 md:py-2.5 border border-white/40 rounded-full shadow-lg bg-white/20 text-white cursor-pointer transition-colors hover:bg-white/30">
            add here
          </button>
        </div>
      </div>
    </section>
    </div>
  )
}

export default LlmBox
