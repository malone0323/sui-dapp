import React, { Fragment, useState, useEffect } from 'react'
import { LoadFile } from '../../Helper/LoadFile'
import Pagination from '../Widget/Pagination'
import SelectFilter from '../Widget/SelectFilter'
import { getSpecificMemeTokenTradeWeb2 } from '../../Lib/web2'
import { SCAN_EXPLORER } from '../../config'
import moment from 'moment/moment'
import { TailSpin } from 'react-loader-spinner'

const Trades = () => {
    const [sortBy, setsortBy] = useState("Time (asc)");
    const [txns, setTxns] = useState([]);
    const [page, setPage] = useState(1);
    const [temp, setTemp] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const address = window.location.pathname.split("/").length > 1 && window.location.pathname.split("/")[2]
        if(temp >= 10000000000) {setLoading(false);return;}
        getSpecificMemeTokenTradeWeb2({address, page}).then(data=>{
            console.log("getSpecificMemeTokenTradeWeb2 ", data);
            if(page == 1) setTxns(data);
            else if(data.length > 0) setTxns(data);
            else { setTemp(10000000000); setTxns(data);}
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
        })
    }, [page, temp]);

    const changePage = async(type, pageData) => {
        console.log("pageData ", pageData);
        if(type == "t" && temp >= 10000000000){
            setTemp(0)
            setPage(pageData);
        }
        else if(type == "n" && temp >= 10000000000){}
        else{
            setPage(pageData);
        }
    }

    return (
        <Fragment>

            <div className="grid grid-cols-1 gap-[24px]">
                <div className="flex items-center justify-between">
                    {/* <div className="flex items-center flex-shrink-0 gap-2">
                        <p className='text__12 text-[#B3B3B3] flex-shrink-0'>Sort by:</p>
                        <SelectFilter minWidth="min-w-[105px] xs:min-w-[140px]" sortBy={sortBy} setsortBy={(e) => setsortBy(e)} list={["Time (asc)", "Time (desc)", "Most Liked"]} />
                    </div> */}

                    {/* <div className="cursor-pointer flex items-center gap-2 bg-white rounded-full p-[6px_12px] xx:p-[6px_16px] ss:p-[8px_20px] flex-shrink-0">
                        <img src={LoadFile("images/PencilSimpleLine2.svg")} className='flex-shrink-0' alt="" />
                        <p className='font-medium text__16 text-[#232323]'>Post a Reply</p>
                    </div> */}
                </div>

                <div className="w-full p-3 rounded-2xl border !border-[rgba(221,221,221,0.12)]">
                    <div className="grid grid-cols-1 gap-2">

                        <div className="grid grid-cols-6 xs:grid-cols-7">
                            <div className="col-span-2 text__14 text-[#999999] p-[4px_12px]">Account</div>
                            <div className=" text__14 text-[#999999] p-[4px_12px]">Type</div>
                            <div className=" text__14 text-[#999999] p-[4px_12px]">SUI</div>
                            <div className=" text__14 text-[#999999] p-[4px_12px]">Token</div>
                            <div className=" text__14 text-[#999999] p-[4px_12px] hidden md:block">Date</div>
                            <div className="text__14 text-[#999999] p-[4px_12px] text-right xs:col-span-2 md:col-span-1"><span className='xs:block hidden'>Transaction</span><span className='xs:hidden'>txn</span></div>
                        </div>

                        <div className='w-full h-[1px] bg-[rgba(255,255,255,0.12)]'></div>
                        
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

                        { 
                            !loading && txns.map((obj, i) => {
                                return <div key={i}>
                                        <div className="grid grid-cols-6 xs:grid-cols-7">
                                            <div className="col-span-2 p-[4px_12px]">

                                                <div className="w-full flex gap-2">
                                                    <img src={obj?.tokenData && JSON.parse(obj.tokenData).icon} className='w-[30px] h-[30px] rounded-full object-cover ss:block hidden' alt="" />
                                                    <div className="font-medium text__16 text-[#4D4D4D] bg-[#F8C0A2] rounded-full p-[2px_10px]">
                                                        <a href={`${SCAN_EXPLORER}/account/${obj.wallet}`} target='_blank'>
                                                            {obj.walletAlias == "true" ? "dev": `${obj.wallet.slice(0,5)}...${obj.wallet.slice(-3)}`}
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="p-[4px_12px]">
                                                <p className={'font-medium text__14 ' + (obj.type === "buy" ? "text-[#429782]" : "text-[#F08174]")}>{obj.type}</p>
                                            </div>
                                            <div className="p-[4px_12px]">
                                                <p className='text__14'>{Math.abs(Number(obj.suiAmount)).toFixed(3)}</p>
                                            </div>
                                            <div className="p-[4px_12px]">
                                                <p className='text__14'>{Math.abs(Number(obj.tokenAmount)).toFixed(3)}</p>
                                            </div>
                                            <div className="p-[4px_12px] hidden md:block">
                                                <p className='text__14'>{moment(obj.created_at).utc().format('YYYY:MM:DD HH:mm:ss')}</p>
                                            </div>
                                            <div className="p-[4px_12px] xs:col-span-2 md:col-span-1">
                                                <a href={`${SCAN_EXPLORER}/tx/${obj.tx}`} target='_blank' className="text__14 inline-block w-full text-right">
                                                    <div className="xs:flex hidden items-center justify-end gap-2">
                                                        <p>{obj.tx.slice(0, 5)}...{obj.tx.slice(-5)}</p>
                                                        {/* <img src={LoadFile("images/Warning.svg")} alt="" /> */}
                                                    </div>
                                                    {/* <img src={LoadFile("images/ArrowUpRighta.svg")} className='xs:hidden ml-auto' alt="" /> */}
                                                </a>
                                            </div>
                                        </div>

                                        {
                                            i < txns.length - 1 ? <div className='w-full h-[1px] bg-[rgba(255,255,255,0.12)]'></div> : ""
                                        }
                                </div>
                            })
                        }

                    </div>

                </div>

                <div className="">
                    <Pagination page={page} changePage={changePage}/>
                </div>
            </div>
        </Fragment>
    )
}

export default Trades
