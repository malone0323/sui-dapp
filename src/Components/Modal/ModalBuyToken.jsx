import React, { Fragment, useState } from 'react'
import { LoadFile } from '../../Helper/LoadFile';
import ModalWrapper from './ModalWrapper'
import Turnstile from 'react-turnstile';
const ModalBuyToken = ({ show, handleClose }) => {
    const [token, setToken] = useState("");

    const handleVerify = (token) => {
        console.log("Turnstile token:", token);
        setToken(token);
        // Kirim token ke server untuk verifikasi lebih lanjut
    };
    return (
        <Fragment>
            <ModalWrapper show={show} handleClose={handleClose}>
                <div className="p-4 grid grid-cols-1 gap-[32px]">

                    <div className="text-center">
                        <h3 className='font-medium text__28'>Choose how many [$TICKR] you want to buy (optional)</h3>
                        <p className='text__16 text-[#999999]'>Tip: its optional but buying a small amount of coins helps protect your coin from snipers.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-[16px]">

                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center gap-2 cursor-pointer">
                                <img src={LoadFile("images/Swap.svg")} alt="" />
                                <p className='text__16 font-normal underline'>Switch to 1am</p>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Amount (SUI)</label>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] pr-3 border !border-[rgba(255,255,255,0.20)] overflow-hidden">
                                <div className="font-bold text__16 h-full px-2 bg-[#2E2E2E] border-r !border-[rgba(255,255,255,0.16)] flex items-center justify-center flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <img src="./../../images/sol.svg" alt="" />
                                        <p className='font-bold text__14'>SUI</p>
                                    </div>
                                </div>
                                <input type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none text-right' placeholder='00' />
                            </div>
                        </div>
                    </div>

                    <button className='rounded-full bg-[#A9E6BD] text-[#232323] p-[12px_32px] font-medium w-full'>Create a coin</button>

                    <div className="w-full">
                        <Turnstile
                            sitekey="1x00000000000000000000AA" // Ganti dengan Site Key dari Cloudflare
                            onVerify={handleVerify}
                            options={{
                                theme: "light", // Pilihan tema: light, dark, atau auto
                                action: "Buy $TICKR", // Aksi spesifik untuk verifikasi
                            }}
                            style={{ display: "block", width: "100%" }}
                            className="customTurnstile"
                        />
                    </div>

                </div>
            </ModalWrapper>
        </Fragment>
    )
}

export default ModalBuyToken
