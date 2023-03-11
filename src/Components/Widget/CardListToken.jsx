import React, { Fragment } from 'react'
import ChartToken from '../Chart/ChartToken'
import { useEffect } from 'react';
import { useState } from 'react';
import { calculateTimeAgo } from '../../Lib/common';
import moment from 'moment/moment';

const CardListToken = ({ dataChart, chart, adjustmentOnMobile = false }) => {
    
    // console.log("dataChart ", dataChart);
    const [timeAgo, setTimeAgo] = useState("");

    useEffect(()=>{
        if(dataChart) {
            const {days, hours, minutes} = calculateTimeAgo(dataChart.created_at);
            let timeAgoString = '';
            if (days > 0) {
                timeAgoString += `${days} day${days > 1 ? 's' : ''} `;
            }
            timeAgoString += `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''} ago`;
            // console.log(timeAgoString)
            if(days > 1) {
                setTimeAgo(moment(dataChart.created_at).utc().format('YYYY:MM:DD HH:mm:ss'))
            }else {
                setTimeAgo(timeAgoString)
            }
        }
    }, [dataChart])


    return (
        <Fragment>
            <div className="flex items-center gap-3 w-full">
                <img src={JSON.parse(dataChart.token)?.icon} className='w-[80px] ss:w-[88px] h-[80px] ss:h-[88px] object-cover rounded-[8px]' alt="" />
                <div className="w-full grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between w-full">
                        <div className="">
                            <h4 className='font-medium text__18'>{JSON.parse(dataChart.token)?.symbol}</h4>
                            <div className="flex items-center gap-2">
                                <p className='text__14 text-[#B3B3B3]'>Market Cap:</p>
                                <h5 className='font-medium text__18'>${dataChart&&Number(dataChart?.mc).toFixed(0)}</h5>
                            </div>
                        </div>
                        <div className={adjustmentOnMobile ? "max-w-[70px]" : "max-w-[90px]"}>
                            <ChartToken dataChart={chart} />
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-[rgba(255,255,255,0.16)]'></div>
                    <div className="w-full flex items-center justify-center">
                        <div className="flex items-center justify-between w-full">
                            <p className='text__14 text-[#B3B3B3]'>
                                <span className={adjustmentOnMobile ? "ss:block hidden" : ""}>Created by: {dataChart.wallet.slice(0,5)}...{dataChart.wallet.slice(-3)}</span>
                                <span className='text-[#F3F3F3]'> &nbsp; {timeAgo}</span>
                            </p> 
                            <p className='text__14 text-[#B3B3B3]'>{dataChart?.replies} replies</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CardListToken
