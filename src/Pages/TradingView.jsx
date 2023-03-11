import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Thread from '../Components/Section/Thread'
import SideBuySell from '../Components/Section/SideBuySell'
import Trades from '../Components/Section/Trades'
import useWindowSize from "./../Helper/useWindowSize";
import { getSpecificMemeTokenWeb2 } from '../Lib/web2'
import { calculateTimeAgo } from '../Lib/common'
import TradingViewChart from '../Components/Widget/TradingChartView'


const TradingView = () => {
    const [ActiveTab, setActiveTab] = useState("Thread");
    const { width } = useWindowSize();
    const [memeData, setMemeData] = useState();
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        const data = window.location.pathname.split("/").length > 1 && window.location.pathname.split("/")[2]
        getSpecificMemeTokenWeb2(data).then(data => {
            // console.log("getSpecificMemeTokenWeb2 ", data)
            setMemeData(data)
        }).catch(err => {
        })

    }, []);

    useEffect(() => {
        if (memeData) {
            const { days, hours, minutes } = calculateTimeAgo(memeData.created_at);
            // Construct the output string
            let timeAgoString = '';
            if (days > 0) {
                timeAgoString += `${days} day${days > 1 ? 's' : ''} `;
            }
            timeAgoString += `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''} ago`;
            // console.log(timeAgoString)
            setTimeAgo(timeAgoString)
        }
    }, [memeData])

    useEffect(() => {
        if (width >= 1024) {
            if (ActiveTab === "Details") {
                setActiveTab("Thread");
            }
        }
    }, [width]);

    return (
        <Fragment>
            <div className='w-full overflow-hidden relative'>
                <section className='pt-4'>
                    <Container>

                        <div className='flex gap-4'>
                            <div className='w-full'>

                                <div className="mb-3">
                                    <div className="flex items-center gap-2 xs:gap-3 xs:!flex-nowrap flex-wrap">
                                        <h5 className='font-medium text__20'>{memeData && JSON.parse(memeData.token).name}</h5>

                                        <div className="flex items-center gap-2">
                                            <p className='text__14 text-[#B3B3B3]'>MaRkEt CaP:</p>
                                            <h5 className='text__18 font-medium text-[#039855]'>${memeData && Number(memeData?.mc).toFixed(0)}</h5>
                                        </div>

                                        <div className="flex items-center gap-2 xs:gap-3 xs:w-auto w-full">
                                            <div className="flex items-center gap-2">
                                                <p className='text__14 text-[#B3B3B3]'>CrEaTed bY:</p>
                                                <div className='text__14 font-medium text-[#0A0A0A] p-[4px_8px] bg-[#FFCC00] rounded-full border !border-white'>
                                                    {memeData?.wallet?.slice(0, 5)}...{memeData?.wallet?.slice(-3)}
                                                </div>
                                                <p className='text__14 font-medium text-[#B3B3B3]'>·</p>
                                                <p className='text__14 font-medium text-[#B3B3B3]'>{timeAgo}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <p className='text__14 text-[#B3B3B3]'>rEpLieS:</p>
                                                <p className='text__14 font-medium text-white'>{memeData?.replies}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <TradingViewChart memeData={memeData} />
                                </div>

                                <div className="grid grid-cols-1 gap-4">


                                    <div className="grid grid-cols-1 gap-[24px] p-3 xl:p-4 rounded-xl bg-[#000000] border-[0.75px] !border-[#B3B3B3] shadow-[2.96px_2.96px_#B3B3B3]">

                                        <div className="w-full flex items-center border-b !border-[rgba(221,221,221,0.12)]">
                                            <div onClick={() => setActiveTab("Details")} className={"lg:hidden cursor-pointer p-[6px_24px] text-[#999999] " + (ActiveTab === "Details" ? "border-b !border-white text-white" : "text-[#999999]")}>
                                                Details
                                            </div>
                                            <div onClick={() => setActiveTab("Thread")} className={"cursor-pointer p-[6px_24px] text-[#999999] " + (ActiveTab === "Thread" ? "border-b !border-white text-white" : "text-[#999999]")}>
                                                tHrEaD
                                            </div>
                                            <div onClick={() => setActiveTab("Trades")} className={"cursor-pointer p-[6px_24px] text-[#999999] " + (ActiveTab === "Trades" ? "border-b !border-white text-white" : "text-[#999999]")}>
                                                tRaDeS
                                            </div>
                                        </div>

                                        {
                                            ActiveTab === "Details" ? <SideBuySell memeData={memeData} /> : ""
                                        }

                                        {
                                            ActiveTab === "Thread" ? <Thread /> : ""
                                        }

                                        {
                                            ActiveTab === "Trades" ? <Trades /> : ""
                                        }

                                    </div>
                                </div>

                            </div>
                            <div className='flex-shrink-0 lg:block hidden w-[340px] xl:w-[360px]'>
                                <div className="grid grid-cols-1 gap-[24px] p-3 xl:p-4 rounded-xl bg-[#1F1F1F] border !border-[rgba(221,221,221,0.12)]">
                                    <SideBuySell memeData={memeData} />
                                </div>
                            </div>
                        </div>

                    </Container>
                </section>
            </div>
        </Fragment>
    )
}

export default TradingView
