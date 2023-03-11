import React, { Fragment, useState } from 'react'
import { LoadFile } from '../../Helper/LoadFile';
import { useWallet } from '@suiet/wallet-kit';
import moment from 'moment/moment';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CommentThread = ({ updateLikeMessage, replyMessage, data }) => {
    const wallet = useWallet();

    const [Like, setLike] = useState(false);

    useEffect(() => {
        if(data.like.includes(wallet?.account?.address)){
            setLike(true);
        }
    }, [data]);

    const likeHandle = async () => {
        if(!wallet?.account?.address){
            return toast.error("Wallet Connect");
        }
        updateLikeMessage({like: !Like, _id: data?._id, wallet: wallet?.account?.address});
        setLike(!Like);
    };

    return (
        <Fragment>
            <div className="w-full flex gap-3">
                {/* <img src={data.img} className='w-[32px] h-[32px] rounded-full object-cover' alt="" /> */}

                <div className="p-3 grid grid-cols-1 gap-[8px] border !border-[rgba(221,221,221,0.12)] rounded-[16px] w-full">
                    <div className="flex items-center gap-[4px]">
                        <div className="font-medium text__16 text-[#4D4D4D] bg-[#FFCC00] rounded-full p-[2px_10px]">
                            {data&&data?.wallet.slice(0,5)}...{data&&data?.wallet.slice(-3)}
                        </div>
                        <div className="font-medium text__14 text-[#999999]">·</div>
                        <div className="font-medium text__14 text-[#999999]">{moment(data.created_at).utc().format('YYYY:MM:DD HH:mm:ss')}</div>
                    </div>
                    <p className='text__16'>{data.msg}</p>

                    <div className="flex items-center gap-3">
                        <div onClick={() => likeHandle()} className="flex items-center gap-2 cursor-pointer">
                            <img src={Like ? "./../../images/Heart Fill.svg" : "./../../images/Hearta.svg"} className='cursor-pointer' alt="" />
                            <p className='font-medium text__12 text-[#B3B3B3]'>{data.like.length}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#B3B3B3] cursor-pointer" onClick={()=>replyMessage(data)}>
                            <img src={LoadFile("images/ShareFat.svg")} alt="" />
                            <p className='font-medium text__12 underline'>Reply</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CommentThread
