import React, { Fragment, useEffect, useState } from 'react'
import { LoadFile } from '../../Helper/LoadFile';
import { buyMath, buyWeb3, sellMath, sellWeb3 } from '../../Lib/web3';
import { useSuiClient, useWallet } from '@suiet/wallet-kit';
import { buyMemeTokenWeb2, getSpecificMemeHolderWeb2, sellMemeTokenWeb2 } from '../../Lib/web2';
import { toast } from 'react-hot-toast';
import { SCAN_EXPLORER } from '../../config';
import { TailSpin } from 'react-loader-spinner'

const SideBuySell = ({memeData}) => {
    const [ToogleBuySell, setToogleBuySell] = useState("Buy");
    const [balance, setBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [Amount, setAmount] = useState(0);
    const [EstAmount, setEstAmount] = useState(0);
    const [MemeAmount, setMemeAmount] = useState(0);
    const [EstMemeAmount, setEstMemeAmount] = useState(0);
    const [realCurve, setRealCurve] = useState();
    const [holders, setHolders] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const wallet = useWallet();
    const client = useSuiClient();

    const copyToClipboard = () => {
        toast.success("copied")
        navigator.clipboard.writeText(JSON.parse(memeData.publishedObject).packageId)
    };

    const moreHolderHandle = async () => {
        setPage(page + 1);
    }

    const buyHandle = async () =>{
        if(!wallet?.account?.address){
            return toast.error("Wallet Connect");
        }
        if(Amount == 0 || Amount == ""){
            return toast.error("Input Amount");
        }
        const tt = toast.loading("Buying Meme ...");
        if(await buyWeb3(wallet, client, memeData, Amount, EstMemeAmount )){
            const data = {
                wallet: wallet.account?.address,
                token: memeData && JSON.parse(memeData.publishedObject).packageId,
                tokenData: memeData && memeData.token,
                type: "buy",
                walletAlias: memeData && memeData?.connectorObject?.includes(wallet.account?.address) ? true: false,
                suiAmount : Amount,
                tokenAmount : EstMemeAmount,
                tx: localStorage.getItem("tx")
            }
            await buyMemeTokenWeb2(data);
            setRefresh(!refresh)
            toast.success("Bought successfully", { id: tt });
        }else{
            toast.error("Buying Meme Error", { id: tt });
        }
    } 

    const sellHandle = async () => {
        if(!wallet?.account?.address){
            return toast.error("Wallet Connect");
        }
        if(MemeAmount == 0 || MemeAmount == ""){
            return toast.error("Input Amount");
        }
        const tt = toast.loading("Selling Meme ...");
        if(await sellWeb3(wallet, client, memeData, (MemeAmount * Number(1000000)).toFixed(0), (EstAmount * Number(1000000000) - 10).toFixed(0))){
            const data = {
                wallet: wallet.account?.address,
                token: memeData && JSON.parse(memeData.publishedObject).packageId,
                tokenData: memeData && memeData.token,
                type: "sell",
                walletAlias: memeData && memeData?.connectorObject?.includes(wallet.account?.address) ? true: false,
                suiAmount : EstAmount,
                tokenAmount : MemeAmount,
                tx: localStorage.getItem("tx")
            }
            await sellMemeTokenWeb2(data);
            setRefresh(!refresh)
            toast.success("Sold successfully", { id: tt });
        }else {
            toast.error("Selling Meme Error", { id: tt });
        }
    }

    const estimatedBuy = async () => {
        const out = await buyMath(realCurve, Amount * Number(1000000000));
        setEstMemeAmount(out/Number(1000000))
    }

    useEffect(() => {
        if(wallet.account?.address){
            (client.getBalance({owner:wallet.account?.address})).then(data=>{
                setBalance((data.totalBalance/Number(1000000000)).toFixed(3))
            }).catch(err=>{});
            client.getAllBalances({
                owner: wallet?.account?.address
            }).then(data=>{
                const tokenAddress = memeData && JSON.parse(memeData.publishedObject).packageId;
                const coin = data.filter(item => item.coinType.includes(tokenAddress));
                const totalBalance = coin.length > 0 ? (Number(coin[0].totalBalance)/ Number(1000000)).toFixed(3): 0;
                setTokenBalance(totalBalance);
            })
        } 
    }, [wallet, memeData, refresh])

    useEffect(() =>{
        if(realCurve && Amount)  estimatedBuy()
    }, [realCurve, Amount])

    useEffect(() =>{
        if(realCurve && MemeAmount) estimatedSell()
    }, [realCurve, MemeAmount])

    const estimatedSell = async () => {
        const [sell_token_amount, sui_out] = await sellMath(realCurve, MemeAmount * Number(1000000));
        setEstAmount(sui_out/Number(1000000000));
    }

    useEffect(() => {
        if(memeData){
            client.getObject({
                id: memeData&&JSON.parse(memeData.bondingCurve)[0].objectId,
                options: {
                  showContent: true
                }
              }).then(data => {
                console.log("curve ", data, memeData&&JSON.parse(memeData.bondingCurve)[0].objectId)
                setRealCurve(data) 
              })  
        }  
    }, [memeData]);     
    
    useEffect(() => {
        setLoading(true);
        const address = window.location.pathname.split("/").length > 1 && window.location.pathname.split("/")[2];
        if(page >= 100000000000) {setLoading(false);return;}
        getSpecificMemeHolderWeb2({address, page}).then(data => {
            if(page == 1) setHolders(data);
            else if(data.length > 0 && page < 100000000000) setHolders([...holders, ...data]);
            else {
                setPage(100000000000);
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        });
    }, [page]);


    return (
        <Fragment className="bg-black">
            <div className="grid grid-cols-1 gap-[24px]">

                <div className="grid grid-cols-2 rounded-[9px] !border-gray-400 border outline-none border-solid p-[2px]">
                    <div onClick={() => setToogleBuySell("Buy")} className={"font-[700] cursor-pointer text-center text-[15.41px] text__12 px-[20px] py-[6px] rounded-[9px] " + (ToogleBuySell === "Buy" ? "bg-[#FE6666] border !border-[rgba(221,221,221,0.12)]" : "")}>Buy</div>
                    <div onClick={() => setToogleBuySell("Sell")} className={"cursor-pointer text-center font-[700] text-[15.41px] text__12 px-[20px] py-[6px] rounded-[9px] " + (ToogleBuySell === "Sell" ? "bg-[#FE6666] border !border-[rgba(221,221,221,0.12)]" : "")}>Sell</div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                        {/* <img src={LoadFile("images/Swap.svg")} alt="" /> */}
                        {/* <p className='text__16 font-normal underline'>Switch to Token</p> */}
                    </div>
                    {/* <p className='text__16 font-normal underline cursor-pointer'>Set max slippage</p> */}
                </div>

                <div className="">
                    {
                        ToogleBuySell == "Buy" ? 
                        <>
                            <div className='flex justify-between'>
                                <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Amount (SUI)</label>
                                <label htmlFor="" className='text__14 text-[#B3B3B3]'> {balance} (SUI)</label>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] pr-3 border !border-[rgba(255,255,255,0.20)] overflow-hidden">
                                <div className="font-bold text__16 h-full px-2 bg-[#2E2E2E] border-r !border-[rgba(255,255,255,0.16)] flex items-center justify-center flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <img src={LoadFile("images/sui.svg")} alt="" />
                                        <p className='font-bold text__14'>SUI</p>
                                    </div>
                                </div>
                                <input onChange={(e) => setAmount(e.target.value)} type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none text-right' placeholder='00' value={Amount} />
                            </div>
                        </> : 
                        <>
                            <div className='flex justify-between'>
                                <label htmlFor="" className='text__14 text-[#B3B3B3] mb-1'>Amount ({memeData && JSON.parse(memeData.token).name})</label>
                                <label htmlFor="" className='text__14 text-[#B3B3B3]'> {tokenBalance} ({memeData && JSON.parse(memeData.token).name})</label>
                            </div>
                            <div className="flex items-center gap-2 rounded-xl h-[46px] pr-3 border !border-[rgba(255,255,255,0.20)] overflow-hidden">
                                <div className="font-bold text__16 h-full px-2 bg-[#2E2E2E] border-r !border-[rgba(255,255,255,0.16)] flex items-center justify-center flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <img src={memeData && JSON.parse(memeData.token).icon} alt="" className='w-6 rounded'/>
                                        <p className='font-bold text__14'>{memeData && JSON.parse(memeData.token).name}</p>
                                    </div>
                                </div>
                                <input onChange={(e) => setMemeAmount(e.target.value)} type="text" className='w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none text-right' placeholder='00' value={MemeAmount} />
                            </div>
                        </>
                    }
                </div>

                {
                    ToogleBuySell == "Buy" ? 
                    <div className="flex items-center justify-center lg:justify-between gap-2 xx:gap-3 lg:gap-2">
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setAmount(0)}>Reset</div>
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setAmount(0.1)}>0.1 SUI</div>
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setAmount(0.5)}>0.5 SUI</div>
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setAmount(1)}>1 SUI</div>
                    </div>
                    : 
                    <div className="flex items-center justify-center lg:justify-between gap-2 xx:gap-3 lg:gap-2">
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setMemeAmount(0)}>Reset</div>
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setMemeAmount(tokenBalance*0.01)}>1 % {memeData && JSON.parse(memeData.token).name}</div>
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setMemeAmount(tokenBalance*0.5)}>50 % {memeData && JSON.parse(memeData.token).name}</div>
                        <div className="cursor-pointer rounded-full font-medium text__14 border !border-[rgba(255,255,255,0.12)] p-[4px_12px]" onClick={() => setMemeAmount(tokenBalance)}>100% {memeData && JSON.parse(memeData.token).name}</div>
                    </div>
                }

                {
                    ToogleBuySell == "Buy" ? 
                    <>
                        <div className="flex items-center justify-center lg:justify-between gap-2 xx:gap-3 lg:gap-2">
                            You receive {EstMemeAmount.toFixed(3)} {memeData && JSON.parse(memeData.token).name}
                        </div>

                        <div onClick={()=>{
                            if(Number(balance) >= Number(Amount)) buyHandle();
                            }} 
                            className={`${Number(balance) >= Number(Amount)? "cursor-pointer": ""} bg-[#FFCC00] flex items-center text-center justify-between gap-2 rounded-[5.33px] w-full h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]`}>
                                <p className='w-full text__14 font-medium clamp-1'>
                                    <span className='text-[15.41px] font-[700] text-black'>
                                        {Number(balance) >= Number(Amount)?  "tRaDe" : "Insufficient Sui Balance"}
                                    </span> 
                                </p>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex items-center justify-center lg:justify-between gap-2 xx:gap-3 lg:gap-2">
                            You receive {EstAmount&&EstAmount.toFixed(3)} SUI
                        </div>

                        <div onClick={()=>{
                            if(Number(tokenBalance) >= Number(MemeAmount)) sellHandle();
                            }}
                           className={`${Number(tokenBalance) >= Number(MemeAmount)?"cursor-pointer":""} bg-[#FFCC00] flex items-center text-center justify-between gap-2 rounded-[5.33px] w-full h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]`}>
                                <p className='w-full text__14 font-medium clamp-1'>
                                    <span className='text-black text-[15.41px] font-[700]'>
                                        {Number(tokenBalance) >= Number(MemeAmount)?  "tRaDe" : `Insufficient Balance`}
                                    </span> 
                                </p>
                        </div>
                    </>
                }


                <div className="rounded-[12px] border !border-[rgba(255,255,255,0.12)] p-4">
                    <img src={memeData && JSON.parse(memeData.token).icon} className='rounded-[8px] object-cover w-[88px] h-[88px]' alt="" />

                    <div className="mt-4">
                        <h5 className='font-medium text__20 mb-1'>
                            {memeData && JSON.parse(memeData.token).name}
                        </h5>
                        <p className='text__14 text-[#999999]'>
                            {memeData && JSON.parse(memeData.token).description}    
                        </p>
                    </div>
                </div>


                <div className="grid grid-cols-1 gap-[12px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <p>BoNdInG cUrVe PrOgResS</p>
                            <img src={LoadFile("images/Info.svg")} alt="" />
                        </div>
                        <h5 className='font-medium text__16'>
                            {realCurve && (((800_000_000_000_000 - realCurve?.data?.content?.fields?.available_token_reserves) / 800_000_000_000_000) * 100).toFixed(3)}%</h5>
                    </div>

                    <div className="relative w-full h-[16px] rounded-full overflow-hidden bg-[rgba(255,255,255,0.16)]">
                        <div className="absolute left-0 top-0 h-full rounded-full bg-[#A9E6BD]" style={{ width: `${realCurve && (((800_000_000_000_000 - realCurve?.data?.content?.fields?.available_token_reserves) / 800_000_000_000_000) * 100).toFixed(3)}%` }}></div>
                    </div>

                    <p className='text__14 text-[#B3B3B3]'>When the total liquidity reaches, 6,000 SUI, all the liquidity from the bonding curve will be deposited into Cetus and burned. Progression increases as the price goes up.There is {realCurve && (Number(realCurve?.data?.content?.fields?.sui_balance)/Number(1000000000)).toFixed(3)} SUI in the bonding curve.</p>
                </div>

                {/* <div className="grid grid-cols-1 gap-[12px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <p>King of the hill progress</p>
                            <img src={LoadFile("images/Info.svg")} alt="" />
                        </div>
                        <h5 className='font-medium text__16'>89%</h5>
                    </div>

                    <div className="relative w-full h-[16px] rounded-full overflow-hidden bg-[rgba(255,255,255,0.16)]">
                        <div className="absolute left-0 top-0 h-full rounded-full bg-[#F9AB00]" style={{ width: "89%" }}></div>
                    </div>

                    <p className='text__14 text-[#B3B3B3]'>Dethrone the current king at $41,110 market cap.</p>
                </div> */}


                <div className="grid grid-cols-1 gap-[10px]">
                    <div className="grid grid-cols-2 gap-3">
                        <a href={memeData && JSON.parse(memeData.token).twitter} target='_blank' className='inline-block w-full text-[#F3F3F3] border !border-[rgba(255,255,255,0.16)] py-[8px] px-[8px] rounded-full'>
                            <div className="flex items-center justify-center gap-2">
                                <img src={LoadFile("images/XLogo.svg")} alt="" />
                                <p className='font-medium text__14'>Twitter</p>
                            </div>
                        </a>
                        <a href={memeData && JSON.parse(memeData.token).website} target='_blank' className='inline-block w-full text-[#F3F3F3] border !border-[rgba(255,255,255,0.16)] py-[8px] px-[8px] rounded-full'>
                            <div className="flex items-center justify-center gap-2">
                                <img src={LoadFile("images/Globe.svg")} alt="" />
                                <p className='font-medium text__14'>Website</p>
                            </div>
                        </a>
                    </div>

                    <div className="flex items-center justify-between gap-2 rounded-full w-full h-[46px] px-3 border !border-[rgba(255,255,255,0.20)]">
                        <p className='w-full text__14 font-medium clamp-1'><span className='text-[#999999]'>Contract address:</span> 
                            <a href={`${SCAN_EXPLORER}/object/${memeData && JSON.parse(memeData?.publishedObject)?.packageId}`} target='_blank'>
                                &nbsp; {memeData && JSON.parse(memeData?.publishedObject)?.packageId.slice(0, 5)}...
                                {memeData && JSON.parse(memeData?.publishedObject)?.packageId.slice(-3)}
                            </a>
                        </p>
                        <img src={LoadFile("images/Copy.svg")} onClick={copyToClipboard} className='cursor-pointer' alt="" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">

                    <div className=""> 
                        <h4 className='font-medium text__20 mb-1'>Holder distribution</h4>
                        <a href='' className='inline-block underline text-white text__16'>Generate bubble map</a>
                    </div>

                    {loading&&
                        <div className='flex justify-center'>
                            <TailSpin
                                    visible={true}
                                    height="80"
                                    width="80"
                                    color="#4fa94d"
                                    ariaLabel="tail-spin-loading"
                                    radius="1"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    />
                        </div>
                    }
                    <div className="grid grid-cols-1 gap-[14px]">
                        {
                            !loading && holders.map((obj, i) => {
                                return <Fragment key={i}>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text__16">
                                            <a href={`${SCAN_EXPLORER}/account/${obj.wallet}`} target='_blank' className=''>
                                                {i + 1}. {obj.wallet.slice(0,5)}...{obj.wallet.slice(-3)}
                                            </a>
                                        </div>
                                        <div className="text__16 font-medium">{((obj.totalAmount * Number(1000000) * 100 / 800_000_000_000_000)).toFixed(3)} %</div>
                                    </div>
                                    {
                                        i < holders.length - 1 ? <div className='w-full h-[1px] bg-[rgba(255,255,255,0.12)]'></div> : ""
                                    }
                                </Fragment>
                            })
                        }
                    </div>

                    <div className="text-center" onClick={moreHolderHandle}>
                        <p className='text__16 underline cursor-pointer'>See All</p>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}

export default SideBuySell
