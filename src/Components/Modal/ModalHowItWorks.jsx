import React, { Fragment } from 'react'
import ModalWrapper from './ModalWrapper'
import { Dot } from 'lucide-react'

const ModalHowItWorks = ({ show, handleClose }) => {
  return (
    <Fragment>
      <ModalWrapper show={show} handleClose={handleClose}>

        <div className="text-center p-[12px]">
          <h4 className='font-medium text__28 mb-3'>How it works</h4>
          <div className="grid grid-cols-1 gap-2 text__16">
            <p>SAFU AF 🔒</p>
            {/* <p>Sick of getting rugged? Stimmy's got your back, fren. We make sure every token launched here is clean as fuck - no backdoors, no sketchy shit, no dev wallet nonsense.</p>
            <p>Based Tokenomics Only</p>
            <ul className='list-none'>
              <li className='flex items-top justify-center gap-2'><div className="flex-shrink-0 mt-[1.6vh] w-[4px] h-[4px] rounded-full bg-[#F3F3F3]"></div> Every launch is SAFU (we actually check the code)</li>
              <li className='flex items-top justify-center gap-2'><div className="flex-shrink-0 mt-[1.6vh] w-[4px] h-[4px] rounded-full bg-[#F3F3F3]"></div> Jeets are penalised with a 25% sale tax that’s distributed to the diamond handed holders</li>
              <li className='flex items-top justify-center gap-2'><div className="flex-shrink-0 mt-[1.6vh] w-[4px] h-[4px] rounded-full bg-[#F3F3F3]"></div> No more presale degeneracy - fair launches only</li>
              <li className='flex items-top justify-center gap-2'><div className="flex-shrink-0 mt-[1.6vh] w-[4px] h-[4px] rounded-full bg-[#F3F3F3]"></div> Zero team tokens - 100% for the community</li>
              <li className='flex items-top justify-center gap-2'><div className="flex-shrink-0 mt-[1.6vh] w-[4px] h-[4px] rounded-full bg-[#F3F3F3]"></div> Locked liquidity so devs can't pull the rug</li>
            </ul> */}

            {/* <p>Ape in with confidence. No more cope, just hope. 🚀</p> */}
          </div>

          <div className="mt-8">

            <p className='text__16 relative z-[1]'>
              Sick of getting rugged? Pump's got your back, fren. We make sure
              every token launched here is clean as fuck - no backdoors, no
              sketchy shit, no dev wallet nonsense.
            </p>

            <p className='text__16 relative z-[1] mt-[5px]'>
              Based Tokenomics Only
            </p>

            <p className='text__16 relative z-[1] mt-[5px] flex flex-row justify-center'>
              <Dot />
              Every launch is SAFU (we actually check the code)
            </p>

            <p className='text__16 relative z-[1] mt-[5px] flex flex-row justify-center'>
              <Dot />
              Jeets are penalised with a 25% sale tax that’s distributed to the
              diamond handed holders
            </p>

            <p className='text__16 relative z-[1] mt-[5px] flex flex-row justify-center'>
              <Dot />
              No more presale degeneracy - fair launches only
            </p>

            <p className='text__16 relative z-[1] mt-[5px] flex flex-row justify-center'>
              <Dot />
              Zero team tokens - 100% for the community
            </p>

            <p className='text__16 relative z-[1] mt-[5px] flex flex-row justify-center'>
              <Dot />
              Locked liquidity so devs can't pull the rug
            </p>

            <p className='text__16 relative z-[1] mt-[5px]'>
              Ape in with confidence. No more cope, just hope. 🚀
            </p>

            <div className="grid grid-cols-1 gap-3 ss:px-4 mt-[32px]">

              <div className="grid grid-cols-1 gap-2 relative  ss:px-8 px-4">
                <div className="absolute top-[1rem] h-[5rem] w-full rounded-lg border !border-[rgba(255,255,255,0.2]" style={{
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 50% 0)",
                }}></div>

                <div className="relative z-[1]">
                  <div className="text__12 p-[2px_8px] inline-block rounded-full border  !border-[rgba(255,255,255,0.2)] bg-[#FFCC00] shadow-[2.07px_2.07px_black] text-black font-[700]">STEP 1</div>
                </div>
                <p className='text__16 relative z-[1]'>Pick a coin that you like</p>
              </div>
              <div className="grid grid-cols-1 gap-2 relative px-8">
                <div className="absolute top-[1rem] h-[5rem] w-full rounded-lg border !border-[rgba(255,255,255,0.2]" style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%, 0 0)", // Memotong setengah kanan
                }}></div>

                <div className="relative z-[1]">
                  <div className="text__12 p-[2px_8px] inline-block rounded-full border !border-[rgba(255,255,255,0.2)] bg-[#FFCC00] shadow-[2.07px_2.07px_black] text-black font-[700]">STEP 2</div>
                </div>
                <p className='text__16 relative z-[1]'>Buy the coin on the bonding curve</p>
              </div>
              <div className="grid grid-cols-1 gap-2 relative px-8">
                <div className="absolute top-[1rem] h-[5rem] w-full rounded-lg border !border-[rgba(255,255,255,0.2]" style={{
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 50% 0)",
                }}></div>

                <div className="relative z-[1]">
                  <div className="text__12 p-[2px_8px] inline-block rounded-full border !border-[rgba(255,255,255,0.2)] bg-[#FFCC00] shadow-[2.07px_2.07px_black] text-black font-[700]">STEP 3</div>
                </div>
                <p className='text__16 relative z-[1]'>Sell at any time to lock in your profits or losses</p>
              </div>
              <div className="grid grid-cols-1 gap-2 relative px-8">
                <div className="absolute top-[1rem] h-[6.5rem] w-full rounded-lg border !border-[rgba(255,255,255,0.2]" style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%, 0 0)", // Memotong setengah kanan
                }}></div>

                <div className="relative z-[1]">
                  <div className="text__12 p-[2px_8px] inline-block rounded-full border !border-[rgba(255,255,255,0.2)]  bg-[#FFCC00] shadow-[2.07px_2.07px_black] text-black font-[700]">STEP 4</div>
                </div>
                <p className='text__16 relative z-[1]'>When enough people buy on the bonding curve it
                  reaches a market cap of $100k</p>
              </div>
              <div className="grid grid-cols-1 gap-2 relative px-8">
                {/* <div className="absolute top-[1rem] h-[6.4rem] w-full rounded-lg border !border-[rgba(255,255,255,0.2]" ></div> */}
                <div className="relative z-[1]">
                  <div className="text__12 p-[2px_8px] inline-block rounded-full border !border-[rgba(255,255,255,0.2)]  bg-[#FFCC00] shadow-[2.07px_2.07px_black] text-black font-[700]">STEP 5 </div>
                </div>
                <p className='text__16 relative z-[1]'>$17k of liquidity is then deposited in ceteus and burned</p>
              </div>
              {/* <div className="grid grid-cols-1 gap-2 relative px-8">               
                <div className="absolute top-[1rem] h-[9.5rem] w-full rounded-lg border !border-[rgba(255,255,255,0.2]" style={{
                    clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%, 0 0)", // Memotong setengah kanan
                  }}></div>
                <div className="relative z-[1]">
                  <div className="text__12 p-[2px_8px] inline-block rounded-full border !border-[rgba(255,255,255,0.2)] bg-[#1F1F1F]">STEP 6</div>
                </div>
                <p className='text__16 relative z-[1]'>Liquidity Merger- The Liquidity Merger is a mechanism in Stimmy that consolidates liquidity from non-graduated tokens
                  into a new, stronger asset. This ensures that liquidity remains efficient, benefiting both users and the ecosystem.
                </p>
              </div> */}
            </div>

            {/* <div>
              <br/>
              <img src='diagram.jpg'/>
            </div> */}

            <div className="mt-8 flex justify-center">
              <div onClick={handleClose} className='cursor-pointer flex justify-center items-center border-[1.78px] border-solid shadow-[2.96px_2.96px_black] leading-[15.4px] font-[700] text-[14px] border-black text-[#232323] p-[12px_32px] w-[146px] h-[35px] rounded-[5.33px] bg-[#FFCC00]'>LeT Me iN</div>
            </div>
          </div>
        </div>

      </ModalWrapper>
    </Fragment>
  )
}

export default ModalHowItWorks
