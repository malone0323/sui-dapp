import React, { Fragment, useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import FormUploadFile from '../Form/FormUploadFile';
import { acceptDevOrderWeb3, createCoinWeb3, placeDevMath } from '../../Lib/web3';
import { useSuiClient, useWallet } from '@suiet/wallet-kit';
import { toast } from 'react-hot-toast';
import { buyMemeTokenWeb2, createMemeTokenWeb2 } from '../../Lib/web2';

const tempID1 = (Math.random() * 1000).toFixed(0)
const tempID2 = (Math.random() * 1000).toFixed(0)
const tempID3 = (Math.random() * 1000).toFixed(0)

const ModalCreateToken = ({ show, handleClose }) => {
    const [ToogleOption, setToogleOption] = useState(false);
    const [devData, setDevData] = useState({});

    const [token, setToken] = useState( {
        "decimals": 6,
        "symbol": "",
        "name": "",
        "description": "",
        "supply": 1, 
        "tempID": `${tempID1}${tempID2}${tempID3}`,
        "icon": "",
        "twitter": "https://twitter.com",
        "website": "https://mad.com",
        "telegram": "https://telegram.com",
        "percent": 0
    });
    const [icon, setIcon] = useState("");

    const wallet = useWallet()
    const client = useSuiClient();

    const createCoinHandle = async() => {
        if(!wallet?.account?.address){
            return toast.error("Wallet Connect");
        }

        console.log("token ", token);

        const tempID1 = (Math.random() * 1000).toFixed(0)
        const tempID2 = (Math.random() * 1000).toFixed(0)
        const tempID3 = (Math.random() * 1000).toFixed(0)

        setToken({...token, tempID: `${tempID1}${tempID2}${tempID3}`})

        if(token.name == ""){
            return toast.error("Input the token name");
        }
        if(token.symbol == ""){
            return toast.error("Input the ticker");
        }

        if(token.description == ""){
            return toast.error("Input the description");
        }
        if(token.icon == ""){
            return toast.error("Select the image");
        }

        // {
        //     const token = JSON.parse(localStorage.getItem("meme_token"));
        //     const data = {
        //         wallet: wallet.account?.address,
        //         token: JSON.stringify(token),
        //         bondingCurve: localStorage.getItem("bondingCurve"),
        //         publishedObject: localStorage.getItem("publishedObject"),
        //         coinMetadataObject: localStorage.getItem("coinMetadataObject"),
        //         connectorObject: localStorage.getItem("connectorObject"),
        //     }
        //     await createMemeTokenWeb2(data);
        //     return
        // }
        const balance = (await client.getBalance({owner:wallet.account?.address}))?.totalBalance/Number(1000000000)
        console.log("balance ", balance)

        if(localStorage.getItem("meme_step") == 1){
            const tt = toast.loading("Creating Meme (2/2)...");
            if(balance < (Number(JSON.parse(localStorage.getItem("dev_data"))[0])/Number(1000000000)-1)){
                return toast.error("Insufficient SUI Balance");
            }
            const token = JSON.parse(localStorage.getItem("meme_token"));
            if(await acceptDevOrderWeb3(wallet, client, token)){
                const data = {
                    wallet: wallet.account?.address,
                    token: JSON.stringify(token),
                    bondingCurve: localStorage.getItem("bondingCurve"),
                    publishedObject: localStorage.getItem("publishedObject"),
                    coinMetadataObject: localStorage.getItem("coinMetadataObject"),
                    connectorObject: localStorage.getItem("connectorObject"),
                }
                await createMemeTokenWeb2(data);
                const _data = {
                    wallet: wallet.account?.address,
                    token: JSON.parse(localStorage.getItem("publishedObject")).packageId,
                    tokenData: JSON.stringify(token),
                    type: "buy",
                    walletAlias: true,
                    suiAmount : (Number(JSON.parse(localStorage.getItem("dev_data"))[0])/Number(1000000000)-1),
                    tokenAmount : Number(JSON.parse(localStorage.getItem("dev_data"))[1])/Number(1000000),
                    tx: localStorage.getItem("tx")
                }
                await buyMemeTokenWeb2(_data);
                toast.success("Created successfully", { id: tt });
            }else{
                toast.error("Creating Meme Error", { id: tt });
            }
        }else {

            if(balance < (Number(devData[0])/Number(1000000000))){
                return toast.error("Insufficient SUI Balance");
            }
            
            const tt = toast.loading("Creating Meme (1/2)...");
            localStorage.setItem("meme_token", JSON.stringify(token))
            if(await createCoinWeb3(wallet, client, token)){
                toast.loading("Creating Meme (2/2)...", { id: tt });

                if(await acceptDevOrderWeb3(wallet, client, token)){
                    
                    const data = {
                        wallet: wallet.account?.address,
                        token: JSON.stringify(token),
                        bondingCurve: localStorage.getItem("bondingCurve"),
                        publishedObject: localStorage.getItem("publishedObject"),
                        coinMetadataObject: localStorage.getItem("coinMetadataObject"),
                        connectorObject: localStorage.getItem("connectorObject"),
                    }
                    await createMemeTokenWeb2(data);

                    const _data = {
                        wallet: wallet.account?.address,
                        token: JSON.parse(localStorage.getItem("publishedObject")).packageId,
                        tokenData: JSON.stringify(token),
                        type: "buy",
                        walletAlias: true,
                        suiAmount : (Number(devData[0])/Number(1000000000)-1),
                        tokenAmount : Number(devData[1])/Number(1000000),
                        tx: localStorage.getItem("tx")
                    }
                    await buyMemeTokenWeb2(_data);

                    toast.success("Created successfully", { id: tt });
                }else{
                    toast.error("Creating Meme Error", { id: tt });
                }
            }else{
                toast.error("Creating Meme Error", { id: tt });
            }
        }
    }

    const updateIcon = async(icon) => {
        setIcon(`https://amaranth-worthy-crocodile-444.mypinata.cloud/ipfs/${icon}`)
    }

    useEffect(() => {
        setToken({...token, icon})
    }, [icon])

    return (
        <Fragment>
            <ModalWrapper show={show} handleClose={handleClose}>
                <div className="p-4 grid grid-cols-1 gap-[30px]">

                    <div className="text-center">
                        <h3 className='font-medium text__28'>Create a Token</h3>
                        <p className='text__16 text-[#999999]'>Stimmy prevents rugs by making sure that all created tokens are safe.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-[14px]">

                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Token Name <span className='text-[#F6543E]'>*</span></label>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                <input 
                                value={token?.name}
                                onChange={(e)=>{setToken({...token, name: e.target.value})}}
                                type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' placeholder='e.x cat' />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Ticker <span className='text-[#F6543E]'>*</span></label>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                <input 
                                value={token?.symbol}
                                onChange={(e)=>{setToken({...token, symbol: e.target.value})}}
                                type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' placeholder='e.x CAT' />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Description</label>
                            <textarea
                            value={token?.description}
                            onChange={(e)=>{setToken({...token, description: e.target.value})}}
                             name="" rows={3} className='rounded-xl p-3 border !border-[rgba(255,255,255,0.20)] w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' placeholder='Enter description' id=""></textarea>
                        </div>
                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Upload Image or Video</label>
                            <FormUploadFile updateIcon={updateIcon}/>
                        </div>

                        <div className="text-center">
                            <p onClick={() => setToogleOption(!ToogleOption)} className='inline-block underline cursor-pointer text__16'>{ToogleOption ? "Hide" : "Show"} More Options</p>
                        </div>

                        <div className={"transition-all duration-300 overflow-hidden " + (ToogleOption ? "max-h-[100vh]" : "max-h-[0]")}>
                            <div className="grid grid-cols-1 gap-[14px]">
                                <div className="">
                                    <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Telegram (optional)</label>
                                    <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                        <input 
                                        onChange={(e)=>{setToken({...token, telegram: e.target.value})}}
                                        type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' placeholder='Enter URL...' />
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Website (optional)</label>
                                    <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                        <input 
                                        onChange={(e)=>{setToken({...token, website: e.target.value})}}
                                        type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' placeholder='Enter URL...' />
                                    </div>
                                </div>
                                <div className="">
                                    <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Twitter or X (optional)</label>
                                    <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                        <input 
                                        onChange={(e)=>{setToken({...token, twitter: e.target.value})}}
                                        type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' placeholder='Enter URL...' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Developer Wallet Buy <span className='text-[#F6543E]'></span></label>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                <input 
                                    onChange={(e)=>{
                                        const percent = e.target.value <= 100 ? e.target.value/100: 1;
                                        setToken({...token, percent})
                                        placeDevMath(percent).then(data => {
                                            if(e.target.value){
                                                localStorage.setItem("dev_data", JSON.stringify(data));
                                                setDevData(data);
                                            }else{
                                                setDevData(['','']);
                                            }
                                        }).catch(err => {
                                        })
                                }}
                                type="number" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' 
                                placeholder='Enter a percentage of total supply' />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Input amount of SUI required <span className='text-[#F6543E]'></span></label>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                <input 
                                disabled
                                value={devData&&devData[0]&&(devData[0]/Number(1000000000)).toFixed(3)}
                                type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' 
                                placeholder='Your expected amount' />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Amount of token <span className='text-[#F6543E]'></span></label>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                                <input 
                                disabled
                                value={devData&&devData[1]&&(devData[1]/Number(1000000)).toFixed(3)}
                                type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none' 
                                placeholder='Your expected amount' />
                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-[14px]">
                        <p className='text__14'>Tip: coin data cannot be changed after creation</p>
                        <button 
                        onClick={createCoinHandle}
                        className='rounded-full bg-[#A9E6BD] text-[#232323] p-[12px_32px] font-medium'>Create a coin</button>
                        <p className='text__14 text-center'>When your coin completes its bonding curve <br /> 
                        you receive 0.5 SUI</p>
                    </div>

                </div>
            </ModalWrapper>
        </Fragment>
    )
}

export default ModalCreateToken
