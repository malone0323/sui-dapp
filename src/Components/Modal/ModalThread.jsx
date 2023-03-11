import React, { Fragment, useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import FormUploadFile from '../Form/FormUploadFile';
import { acceptDevOrderWeb3, createCoinWeb3, placeDevMath } from '../../Lib/web3';
import { useSuiClient, useWallet } from '@suiet/wallet-kit';
import { toast } from 'react-hot-toast';
import { sendMsgWeb2 } from '../../Lib/web2';
import { useGlobalContext } from '../../Hook/GlobalProvider';

const ModalThread = ({ show, replyMsg, handleClose }) => {
    const wallet = useWallet()
    const [msg, setMsg] = useState("");
    const {reloadThread, setReloadThread} = useGlobalContext();

    const createMessageHandle = async() => {
        try{
            if(!wallet?.account?.address){
                return toast.error("Wallet Connect");
            }
            if(!localStorage.getItem("signature")){
                const signedMessage = await wallet.signPersonalMessage({
                    message: new TextEncoder().encode("Welcome to stimmy.fun.sui")
                });
                localStorage.setItem("signature", signedMessage.signature)
                console.log(signedMessage);
            }            

            if(msg == ""){
                return toast.error("Input the msg");
            }
            if(!wallet.account?.address){
                return toast.error("Wallet Connect");
            }

            const tt = toast.loading("Creating Post ...");
            const data = {
                wallet: wallet.account.address, 
                token: window.location.pathname.split("/").length > 1 && window.location.pathname.split("/")[2],
                msg, 
            }
            sendMsgWeb2(data).then(data=>{
                toast.success("Created successfully", { id: tt });
                setReloadThread(!reloadThread);
            }).catch(err=>{
                toast.error("Server Error", { id: tt });
            })
            handleClose()
        }catch(err){
            console.log(err);
        }
    }

    const replyMessageHandle = async() => {
        try{
            console.log("reply msg ", replyMsg)
            if(!wallet?.account?.address){
                return toast.error("Wallet Connect");
            }
            if(!localStorage.getItem("signature")){
                const signedMessage = await wallet.signPersonalMessage({
                    message: new TextEncoder().encode("Welcome to stimmy.fun.sui")
                });
                localStorage.setItem("signature", signedMessage.signature)
                console.log(signedMessage);
            }            

            if(msg == ""){
                return toast.error("Input the msg");
            }
            if(!wallet.account?.address){
                return toast.error("Wallet Connect");
            }

            const tt = toast.loading("Creating reply ...");
            const data = {
                wallet: wallet.account.address, 
                token: window.location.pathname.split("/").length > 1 && window.location.pathname.split("/")[2],
                msg, 
                toId: replyMsg._id
            }
            sendMsgWeb2(data).then(data=>{
                toast.success("Created successfully", { id: tt });
            }).catch(err=>{
                toast.error("Server Error", { id: tt });
            })
            setReloadThread(!reloadThread);
            handleClose()
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Fragment>
            <ModalWrapper show={show} handleClose={handleClose}>
                <div className="p-4 grid grid-cols-1 gap-[30px]">

                    <div className="text-center">
                        <h3 className='font-medium text__28'>{replyMsg ? "Reply": "New Post"} </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-[14px]">

                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'></label>
                            <textarea
                                value={msg}
                                onChange={(e)=>{setMsg(e.target.value)}}
                                name="" rows={3} className='rounded-xl p-3 border !border-[rgba(255,255,255,0.20)] w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' 
                                placeholder='Enter description' id=""></textarea>
                        </div>
                        {/* <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Upload Image or Video</label>
                            <FormUploadFile updateIcon={updateIcon}/>
                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 gap-[14px]">
                        <p className='text__14'>Tip: Lets go to the moon</p>
                        <button 
                        onClick={()=>replyMsg? replyMessageHandle(): createMessageHandle()}
                        className='rounded-[3.5px] bg-[#FFCC00] font-[700] text-[#232323] p-[12px_32px]'>
                            {replyMsg ? "Reply" : "Create a post"}
                        </button>
                        <p className='text__14 text-center'></p>
                    </div>

                </div>
            </ModalWrapper>
        </Fragment>
    )
}

export default ModalThread
