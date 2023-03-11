import React, { Fragment, useState, useEffect } from 'react'
import SelectFilter from '../Widget/SelectFilter'
import { LoadFile } from '../../Helper/LoadFile';
import CommentThread from '../Widget/CommentThread';
import ModalThread from '../Modal/ModalThread';
import { getMsgWeb2, sendMsgLikeWeb2, sendMsgWeb2 } from '../../Lib/web2';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from '../../Hook/GlobalProvider';
import { TailSpin } from 'react-loader-spinner'

const Thread = () => {
    const [sortBy, setsortBy] = useState("Time (asc)");
    const [postShow, setPostShow] = useState(false);
    const [replyMsg, setReplyMsg] = useState();
    const [msgs , setMsgs] = useState([]);
    const [tempMsgs , setTempMsgs] = useState([]);
    const [page, setPage] = useState(1);
    const {reloadThread, setReloadThread} = useGlobalContext();
    const [loading, setLoading] = useState(false);

    const getThreadList = async () => {
        setLoading(true);
        const address = window.location.pathname.split("/").length > 1 && window.location.pathname.split("/")[2]
        if(page >= 10000000000) {setLoading(false);return;}
        getMsgWeb2({address, page }).then(data => {
            if(page == 1) setTempMsgs(data)
            else if(data.length > 0) setTempMsgs([...tempMsgs, ...data])
            else if(data.length == 0) setPage(10000000000)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    };

    useEffect(() => {
        setMsgs(rearrangeMessages(tempMsgs))
    }, [tempMsgs])

    useEffect(() => {
        getThreadList()
    }, [page]);

    useEffect(()=>{
        setPage(1);
        getThreadList();
    }, [reloadThread])

    const updateLikeMessage = async(data) => {
        try{
            const tt = toast.loading("update like ...");
            sendMsgLikeWeb2(data).then(data => {
                toast.success("Update successfully", { id: tt });
            }).catch(err=>{
                toast.success("Server Error", { id: tt });
            })
        }catch(err){

        }
    };

    const replyMessage = async(data) => {
        try{
            setReplyMsg(data);
            setPostShow(true);
        }catch(err){

        }
    }

    const rearrangeMessages = (messages) => {
        const messageMap = new Map();
        const arrangedMessages = [];
    
        // Create a map of messages by their ID
        messages.forEach(msg => {
            messageMap.set(msg._id, { ...msg, replies: [] });
        });
    
        // Arrange messages into a tree structure
        messages.forEach(msg => {
            if (msg.toId) {
                const parentMessage = messageMap.get(msg.toId);
                if (parentMessage) {
                    parentMessage.replies.push(messageMap.get(msg._id));
                }
            } else {
                arrangedMessages.push(messageMap.get(msg._id));
            }
        });
    
        return arrangedMessages;
    };

    const renderMessages = (msgList) => {
        return msgList.map((obj, index) => (
            <div key={obj._id} style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
               <CommentThread replyMessage={replyMessage} updateLikeMessage={updateLikeMessage} data={obj} key={index} />
                {/* Render replies recursively */}
                {obj.replies.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                        {renderMessages(obj.replies)}
                    </div>
                )}
            </div>
        ));
    };

    const loadMoreHandle = async() => {
        setPage(page + 1);
    }

    useEffect(() => {
        if(sortBy.includes("asc")){
            const temp = msgs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            setMsgs(temp)
        }
        if(sortBy.includes("desc")){
            const temp = msgs.sort((a, b) =>  new Date(b.created_at) - new Date(a.created_at));
            setMsgs(temp)
        }
        if(sortBy.includes("Like")){
            const temp = msgs.sort((a, b) =>  b.like.length - a.like.length);
            setMsgs(temp)
        }
    }, [sortBy])


    return (
        <Fragment>
            <div className="grid grid-cols-1 gap-[24px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-shrink-0 gap-2">
                        <p className='text__12 text-[#B3B3B3] flex-shrink-0'>sOrT bY:</p>
                        <SelectFilter minWidth="min-w-[105px] xs:min-w-[140px]" sortBy={sortBy} setsortBy={(e) => setsortBy(e)} list={["Time (asc)", "Time (desc)", "Most Liked"]} />
                    </div>

                    <div onClick={()=>{setPostShow(true)}}className="cursor-pointer flex items-center h-[35px] gap-2 bg-[#FFCC00] rounded-[5.33px] p-[6px_12px] xx:p-[6px_16px] ss:p-[8px_20px] flex-shrink-0">
                        <img src={LoadFile("images/PencilSimpleLine2.svg")} className='flex-shrink-0' alt="" />
                        <p className='font-[700] text-[14px] text__16 text-[#232323]'>PoSt A RePLy</p>
                    </div>
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

                <div className="grid grid-cols-1 gap-[12px]">                    
                   {renderMessages(msgs)}
                </div>

                {page < 10000000000?
                <div className="text-center" onClick={loadMoreHandle} >
                    <p className='text__16 underline inline-block cursor-pointer'>Load More</p>
                </div>
                :<></>
                }
            </div>

            <ModalThread show={postShow} replyMsg={replyMsg} handleClose={()=>setPostShow(false)}/>
        </Fragment>
    )
}

export default Thread
