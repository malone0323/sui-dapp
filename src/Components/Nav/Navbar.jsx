import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ModalHowItWorks from '../Modal/ModalHowItWorks';
import ModalConnect from '../Modal/ModalConnect';
import ModalProfile from '../Modal/ModalProfile';
import { NavLink } from 'react-router-dom';
import {
    ConnectButton,
    useAccountBalance,
    useWallet,
    SuiChainId,
    ErrorCode,
    formatSUI,
    useSuiClient,
    AccountAssetManager,
    AccountCoinManager
} from "@suiet/wallet-kit";
import { useGlobalContext } from '../../Hook/GlobalProvider';
import { toast } from 'react-hot-toast';
import ModalCreateToken from '../Modal/ModalCreateToken';
import ModalThread from '../Modal/ModalThread';
import { SCAN_EXPLORER } from '../../config';
import { Twitter, Send, Layers } from "lucide-react";

const Navbar = () => {

    const { showCreateMemeModal, setShowCreateMemeModal, newMeme, setNewMeme, newTrade, setNewTrade } = useGlobalContext();

    const wallet = useWallet();

    // modal how it works
    const [showHowIt, setShowHowIt] = useState(false);
    const handleCloseHowIt = () => setShowHowIt(false);
    const handleShowHowIt = () => setShowHowIt(true);

    // modal COnnect
    const [showConnect, setShowConnect] = useState(false);
    const handleCloseConnect = () => setShowConnect(false);
    const handleShowConnect = () => setShowConnect(true);
    const handleCloseCreateToken = () => setShowCreateMemeModal(false);

    // modal Profile
    const [showProfile, setShowProfile] = useState(false);
    const handleCloseProfile = () => setShowProfile(false);

    const handleShowProfile = () => setShowProfile(true);
    const [ani, setAni] = useState(false);
    const [ani1, setAni1] = useState(false);

    useEffect(() => {
        setAni(true);
        setTimeout(() => {
            setAni(false)
        }, 1000);
    }, [newMeme]);

    useEffect(() => {
        setAni1(true);
        setTimeout(() => {
            setAni1(false)
        }, 1000);
    }, [newTrade])

    const handleShowProfileAfterConnect = () => {
        setShowConnect(false)
        setTimeout(() => {
            setShowProfile(true); // Buka modal kedua setelah modal pertama ditutup
        }, 300);
    };

    const [ToogleMenu, setToogleMenu] = useState(false);

    return (
        <Fragment>
            <div className="fixed z-[90] w-full bg-[#0A0A0A] border-b !border-[rgba(255,255,255,0.12)]">
                <div className="relative py-3 h-[112px] flex items-center md:py-4 header-stimmy_f">
                    <Container className='relative z-[1] bg-[#0A0A0A] header-stimmy_f_in'>
                        <div className="flex items-center justify-between header-logo">
                            <NavLink to={"/"} className='font-semibold text__14 text-white flex items-center gap-2'>
                                <img src={"./../stimmy.png"} alt="" className='w-[178px] h-[50px]' />
                            </NavLink>
                            <div className="lg:flex hidden items-center gap-[44px] font-medium text__14 head-s">
                                <div className='flex gap-[32px]'>
                                    <div className='text-black cursor-pointer head-s_in' onClick={handleShowHowIt}>HoW iT WoRkS</div>
                                    <a href="/staking" className='text-black head-s_in'>MeRgE LiQuIdiTy</a>
                                    <a href="http://docs.stimmy.io/" className='text-black head-s_in'>sTaKiNg</a>
                                </div>
                                {/* <div onClick={() => {
                                    if (!wallet?.connected) {
                                        return toast.error("Wallet Connect Please!")
                                    }
                                    setShowCreateMemeModal(true);
                                }} className="cursor-pointer text__16 font-medium p-[8px_20px] rounded-full bg-[#1F1F1F] border !border-[rgba(255,255,255,0.12)] md:block hidden">
                                    Create a coin
                                </div> */}
                                <div className='flex gap-[8px]'>
                                    <button className="bg-[#FFCC00] text-black rounded-[5.33px] border-[2.78px] border-black border-solid shadow-[2.96px_2.96px] w-[35px] h-[35px] flex items-center justify-center">
                                        <img
                                            src='./../twitter.svg'
                                            size={18}
                                            width={18} height={18}
                                        />
                                    </button>

                                    <button className="bg-[#FFCC00] text-black rounded-[5.33px] border-[2.78px] border-black border-solid shadow-[2.96px_2.96px] w-[35px] h-[35px] flex items-center justify-center">
                                        <Send size={18} />
                                    </button>

                                    <button className="bg-[#FFCC00] text-black rounded-[5.33px] border-[2.78px] border-black border-solid shadow-[2.96px_2.96px] w-[35px] h-[35px] flex items-center justify-center">
                                        <Layers size={18} />
                                    </button>

                                    <ConnectButton
                                        className='cursor-pointer text__16 font-medium p-[8px_20px] rounded-full bg-[#1F1F1F] border !border-[rgba(255,255,255,0.12)] md:block hidden connect_wallet'
                                        onConnectError={(error) => {
                                            if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                                                console.warn(
                                                    "user rejected the connection to " + error.details?.wallet
                                                );
                                            } else {
                                                console.warn("unknown connect error: ", error);
                                            }
                                        }}
                                    >
                                        cOnEcT wAlLet
                                    </ConnectButton>
                                </div>
                            </div>

                            <div onClick={() => setToogleMenu(!ToogleMenu)} className="cursor-pointer w-[40px] h-[40px] rounded-full bg-[#1F1F1F] border !border-[rgba(255,255,255,0.12)] relative flex items-center justify-center flex-wrap py-2 lg:hidden">
                                <div className={"w-[20px] inline-block h-[1px] transition-all duration-300 bg-white " + (ToogleMenu ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" : "")}></div>
                                <div className={"w-[20px] inline-block h-[1px] transition-all duration-300 bg-white " + (ToogleMenu ? "opacity-0" : "")}></div>
                                <div className={"w-[20px] inline-block h-[1px] transition-all duration-300 bg-white " + (ToogleMenu ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45" : "")}></div>
                            </div>
                        </div>
                    </Container>

                    <div className={"lg:hidden absolute w-full left-1/2 -translate-x-1/2 py-4 bg-[#0A0A0A] shadow-[0px_20px_30px_#e3e3e30a] transition-all duration-300 " + (ToogleMenu ? "top-[73px]" : "-top-[20rem] opacity-0 pointer-events-none")}>
                        <Container>
                            <div className="grid grid-cols-1 gap-3">
                                <div className='text-white cursor-pointer' onClick={handleShowHowIt}>How it works</div>
                                <a href="" className='text-white'>Profile</a>
                                <a href="http://docs.stimmy.io/" className='text-white'>Documentation</a>
                                <div className="">
                                    <ConnectButton
                                        className='cursor-pointer text__16 font-medium p-[8px_20px] rounded-full bg-[#1F1F1F] border !border-[rgba(255,255,255,0.12)] md:block hidden'
                                        onConnectError={(error) => {
                                            if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
                                                console.warn(
                                                    "user rejected the connection to " + error.details?.wallet
                                                );
                                            } else {
                                                console.warn("unknown connect error: ", error);
                                            }
                                        }}
                                    >
                                        Connect Wallet
                                    </ConnectButton>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>

                {/* <div className='flex justify-center'>
                    <a href={newTrade?.token? `/trading-view/${newTrade?.token}`:""}  className={`${ani1?"animated-button " :""} flex flex-row gap-1.5 items-center rounded-3xl text-cultured md:w-fit px-3 py-2 md:px-5 md:py-1.5 text-xs md:text-base font-medium transition-colors duration-1000 ease-in-out bg-indigo-700/60 `}>
                        {newTrade? 
                        `${newTrade?.wallet?.slice(0,5)}...${newTrade?.wallet.slice(-3)} ${newTrade?.type} ${Number(newTrade.suiAmount).toFixed(3)} SUI : ${Number(newTrade.tokenAmount).toFixed(0)} ${newTrade&&newTrade.tokenData&&JSON.parse(newTrade.tokenData).name}`
                        :"Merge"}
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <a href={newMeme?`/trading-view/${newMeme&&(JSON.parse(newMeme?.publishedObject)).packageId}`:""} className={`${ani? "animated-button ": "" } flex flex-row gap-1.5 items-center rounded-3xl text-cultured md:w-fit px-3 py-2 md:px-5 md:py-1.5 text-xs md:text-base font-medium transition-colors duration-500 ease-in-out bg-red-500/60  `}>
                        {newMeme? `${newMeme&&(JSON.parse(newMeme?.publishedObject)).packageId.slice(0,5)}...${newMeme&&(JSON.parse(newMeme?.publishedObject)).packageId.slice(-3)} created ${newMeme&&(JSON.parse(newMeme?.token)).name}`:"Stake"}
                    </a>
                </div>  */}
            </div>

            <ModalHowItWorks show={showHowIt} handleClose={handleCloseHowIt} />

            <ModalConnect show={showConnect} handleClose={handleCloseConnect} handleShowProfileAfterConnect={handleShowProfileAfterConnect} />

            <ModalProfile show={showProfile} handleClose={handleCloseProfile} />

            <ModalCreateToken show={showCreateMemeModal} handleClose={handleCloseCreateToken} />

        </Fragment>
    )
}

export default Navbar
