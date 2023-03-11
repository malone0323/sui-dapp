import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ChartToken from '../Components/Chart/ChartToken';
import SelectFilter from '../Components/Widget/SelectFilter';
import ToogleClick from '../Components/Widget/ToogleClick';
import { faker } from '@faker-js/faker';
import CardListToken from '../Components/Widget/CardListToken';
import ModalCreateToken from '../Components/Modal/ModalCreateToken';
import ModalBuyToken from '../Components/Modal/ModalBuyToken';
import { useGlobalContext } from '../Hook/GlobalProvider';
import { TailSpin } from 'react-loader-spinner'
import { getMemeTokenWeb2, getTopMemeWeb2 } from '../Lib/web2';
import { SCAN_EXPLORER } from '../config';
import { calculateTimeAgo } from '../Lib/common';
import moment from 'moment/moment';
import { Twitter, Send, Layers } from "lucide-react";

const Homepage = () => {
    const { showCreateMemeModal, setShowCreateMemeModal } = useGlobalContext();
    const searchRef = useRef();
    const generateLabels = (startDate, days) => {
        const labels = [];
        const start = new Date(startDate);

        for (let i = 0; i < days; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            labels.push(date.toISOString().split("T")[0]); // Format YYYY-MM-DD
        }

        return labels;
    };
    const generateData = () => {
        return Array.from({ length: 25 }, () =>
            faker.number.int({ min: 10, max: 1000 })
        );
    };

    const dataChart = {
        label: generateLabels("2023-12-01", 25),
        data: [704, 675, 891, 42, 966, 191, 44, 920, 282, 77, 994, 561, 495, 746, 269, 939, 557, 817, 486, 406, 785, 520, 581, 839, 155],
        type: "up"
    }

    const dataListToken = []

    for (let i = 1; i <= 10; i++) {
        dataListToken.push({
            img: `./../images/avatar (${i}).png`,
            title: `Title Here`,
            mc: `$${(Math.random() * 10).toFixed(1)}K`,
            dataChart: {
                label: generateLabels("2023-12-01", 25),
                data: generateData(),
                type: Math.random() > 0.5 ? "up" : "down",
            },
            created: `6VJnqo`,
            time: `${Math.floor(Math.random() * 60)}m ago`,
            replies: Math.floor(Math.random() * 50),
        });
    }

    const [sortBy, setsortBy] = useState("Featured");
    const [aniamtion, setaniamtion] = useState(true);
    const [nfsw, setnfsw] = useState(false);
    const [memes, setMemes] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [topMeme, setTopMeme] = useState();
    const [tempChart, setTempChart] = useState([]);
    const [topChart, setTopChart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [timeAgo, setTimeAgo] = useState();

    useEffect(() => {
        if (topMeme) {
            const { days, hours, minutes } = calculateTimeAgo(topMeme.created_at);
            let timeAgoString = '';
            if (days > 0) {
                timeAgoString += `${days} day${days > 1 ? 's' : ''} `;
            }
            timeAgoString += `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''} ago`;
            // console.log(timeAgoString)
            if (days > 1) {
                setTimeAgo(moment(topMeme.created_at).utc().format('YYYY:MM:DD HH:mm:ss'))
            } else {
                setTimeAgo(timeAgoString)
            }
        }
    }, [topMeme])

    useEffect(() => {
        if (page < 10000000000) {
            setLoading(true);
            getMemeTokenWeb2({ page, search }).then(data => {
                // console.log("getMemeTokenWeb2 ", data)                
                if (page == 1) { setMemes(data?.memes); setTempChart(data?.chart) }
                else if (data?.memes.length > 0 && search == "") { setMemes([...memes, ...data.memes]); setTempChart([...tempChart, ...data?.chart]) }
                else if (data?.memes.length > 0 && search != "") { setMemes([...memes, ...data.memes]); setTempChart([...tempChart, ...data?.chart]) }
                else if (data?.memes.length == 0) setPage(10000000000)
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            })
        }
    }, [page, search]);

    useEffect(() => {
        getTopMemeWeb2().then(data => {
            console.log("getTopMemeWeb2 ", data)
            setTopMeme(data?.meme);
            setTopChart(data?.chart)
        }).catch(err => {
        })
    }, [])


    // modal Create Token
    const handleShowCreateToken = () => setShowCreateMemeModal(true);

    // modal Buy Token
    const [showBuyToken, setShowBuyToken] = useState(false);
    const handleCloseBuyToken = () => setShowBuyToken(false);
    const handleShowBuyToken = () => setShowBuyToken(true);

    const moreMemeHandle = () => {
        console.log("page ", page)
        if (page < 10000000000) {
            setPage(page + 1);
        }
    }

    const searchHandle = async () => {
        setSearch(searchRef.current.value)
        setPage(1)
    }

    return (
        <Fragment>


            <ModalBuyToken show={showBuyToken} handleClose={handleCloseBuyToken} />

            <div className='w-full overflow-hidden relative'>
                <section className='xs:!pt-[80px] pt-[20px] backgroundImg pb-0'>
                    <Container>
                        <div className="relative">

                            <div className="relative xs:hidden">
                                <div className="flex items-center justify-between">
                                    <img src="./../images/Frame 145.svg" className='z-10 w-[20vw]' alt="" />
                                    {/* <img src="./../images/Group 7.svg" className='absolute top-1/2 -translate-y-1/2 w-[46vw] left-[16vw]' alt="" /> */}
                                    <img src="./../images/Mask group.svg" className=' w-[14vw]' alt="" />
                                </div>
                            </div>

                            {/* <div className='gfont-face' alt="Example">Font</div> */}
                            <div className="relative">
                                <h1 className="text-center text__40 font-type md:text-[3.5rem] lg:text-[4.5rem]">
                                    <span className='font-medium'>trade like you</span> <br />
                                    meme it =(^.^)=
                                </h1>
                                {/* <img src="./../images/Mask group.svg" className='absolute xs:block hidden right-0 lg:-right-[2rem] xl:right-[11.5rem] -top-[4rem] w-[14vw] xl:w-auto' alt="" /> */}
                                <img src="./../images/Frame 145.svg" className='top-left-image-1 absolute xs:block z-10 hidden left-[0rem] lg:left-[4rem] xl:left-[6.5rem] top-[2rem] lg:top-[18rem] w-[20vw] xl:w-auto' alt="" />
                                <img src={"./../images/Frame 146.svg"} className='top-left-image-2 absolute right-0 md:right-[2rem] xl:right-[6.5rem] top-[10rem] lg:top-[15rem] xl:top-[20rem] xl:w-auto w-[18vw] xs:block hidden' alt="" />
                                <img src="./../images/computer-guy-meme.png" className='top-image-right-2 absolute xs:block hidden right-0 xl:right-0 top-[6rem] lg:top-[10rem] xl:top-[6rem] xl:w-auto w-[26vw]' alt="" />
                            </div>

                            <div className="flex items-center justify-center gap-3 mt-[2rem] w-full">
                                {/* <div onClick={handleShowBuyToken} className="cursor-pointer font-medium text-[#232323] text__16 p-[8px_20px] rounded-full bg-[#A9E6BD]">Start trading</div> */}
                                <div onClick={handleShowCreateToken} className="cursor-pointer relative font-medium text-[#232323] text__16 p-[8px_20px] rounded-full bg-white connect_wallet_button">
                                    <p className='connect-wallet-btn'>
                                        cOnEcT wAlLet
                                    </p>
                                    <img src={"./../images/1bebd3d3063b93ffc24078b9cc0cd516.png"} className='inner-image' alt="Example" />
                                </div>
                            </div>
                        </div>
                        <div className='rotated-container'>
                            <img src="./../Group_1000001719.png" alt="" />
                        </div>

                        <div className="relative mt-[2rem] xs:mt-0 min-h-[50px] sm:min-h-[310px]">
                            {/* <img src={"./../images/Frame 146.svg"} className='w-[120px] -mb-[3rem] mx-auto xs:hidden' alt="" /> */}
                            <div className="absolute w-full h-full grid grid-cols-2 md:flex md:items-center md:justify-center gap-4 mt-[2rem]">
                                <img src={"./../images/image 19.svg"} className='absolute md:w-auto top-image-1' alt="" />
                                <img src={"./../images/image 10.svg"} className='absolute md:w-auto top-image-2' alt="" />
                            </div>
                        </div>
                    </Container>
                </section>
                <section className='md:h-[120px] lg:h-[160px] !p-0 w-full'>
                    <Container className='h-full !p-0 !m-0 !max-w-full'>
                        <marquee behavior="scroll" direction="left" scrollamount="5" loop="-1">
                            <div class="marquee-content">
                                STIMMY FOR YOU <span className='dot'>•</span> STIMMY FOR ME <span className='dot'>•</span> STIMMY FOR YOU <span className='dot'>•</span> STIMMY FOR ME <span className='dot'>•</span> STIMMY FOR YOU
                            </div>
                        </marquee>
                    </Container>
                </section>
                <section className='background-topper relative py-[135.4px]'>
                    <Container>
                        <div className="text-center">
                            <h3 className='font-medium text__64 text-topper md:text-[3.5rem] lg:text-[4.5rem]'>topper of the day O.o</h3>

                            <div className="max-w-[272px] ss:max-w-[620px] mx-auto mt-[2rem]">
                                <NavLink to={topMeme && `/trading-view/${(JSON.parse(topMeme.publishedObject)).packageId}`} className="w-full inline-block !p-[9px] topper-info rounded-[28px] bg-[#000000] border !border-[rgba(221,221,221,0.12)] shadow-[20px_20px_28px_rgba(35,35,35,0.02)]">
                                    <div className="flex items-center md:!flex-nowrap flex-wrap gap-4">
                                        {/* <img src={"./../images/Rectangle 2.png"} className='w-full md:w-[256px] h-[256px] object-cover rounded-[24px]' alt="" /> */}
                                        <img src={topMeme && JSON.parse(topMeme.token).icon} className='w-full md:w-[256px] object-cover rounded-[24px] h-full ' alt="" />
                                        <div className="w-full grid grid-cols-1 gap-3 text-left">
                                            <div className="w-full grid grid-cols-2 gap-2">
                                                <div className="">
                                                    <p className='text__14 text-[#B3B3B3]'>Market Cap</p>
                                                    <h5 className='font-medium text__24'>${topMeme && topMeme.mc.toFixed(0)}</h5>
                                                </div>
                                                <div className="">
                                                    <p className='text__14 text-[#B3B3B3]'>Holders</p>
                                                    <h5 className='font-medium text__24'>{topMeme && topMeme.holder}</h5>
                                                </div>
                                            </div>
                                            <div className="w-full grid grid-cols-2 gap-2">
                                                <div className="">
                                                    <p className='text__14 text-[#B3B3B3]'>Ticker</p>
                                                    <h5 className='font-medium text__24'>{topMeme && JSON.parse(topMeme.token).symbol}</h5>
                                                </div>
                                                <div className="">
                                                    <p className='text__14 text-[#B3B3B3]'>Replies:</p>
                                                    <h5 className='font-medium text__24'>{topMeme && topMeme.replies}</h5>
                                                </div>
                                            </div>

                                            <div className="border-t !border-[rgba(255,255,255,0.16)] pt-2">
                                                <p className='text__16 text-[#B3B3B3] mb-2'>
                                                    Created by:
                                                    <span className='text-[#F3F3F3]'>
                                                        <a href={`${SCAN_EXPLORER}/object/${topMeme && JSON.parse(topMeme?.publishedObject).packageId}`} target='_blank'>
                                                            {topMeme && topMeme.wallet.slice(0, 5)}...{topMeme && topMeme.wallet.slice(-3)}
                                                        </a>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{timeAgo}
                                                    </span>
                                                </p>

                                                <div className="grid grid-cols-3 ss:grid-cols-2">
                                                    <div className=""></div>
                                                    <div className="col-span-2 ss:col-auto">
                                                        <ChartToken dataChart={topChart} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </NavLink>
                            </div>
                        </div>
                        {/* </div> */}
                    </Container>
                    <img src="./emoji/3.png" className=" small-image-container small-image1" alt="Icon 1" />
                    <img src="./emoji/2.png" className="small-image-container small-image2" alt="Icon 2" />
                    <img src="./emoji/1.png" className="small-image-container small-image3" alt="Icon 3" />
                    <img src="./emoji/4.png" className="small-image-container small-image4" alt="Icon 4" />
                </section>

                <section>
                    <Container>

                        <div className="text-center mb-[2rem]">
                            <h3 className='text__88 potential-topic'>potential toppers</h3>
                            {/* <p className='text__18 text-[#999999]'>Edit opacity <br className='ss:block hidden' /> select create comment italic.</p> */}
                        </div>

                        <div className="max-w-[590px] w-full mx-auto h-[56px] pl-4 pr-1 rounded-full flex items-center justify-between bg-[#1F1F1F] border-[5px] border-solid !border-[#18aee3]">
                            <input type="text"
                                ref={searchRef}
                                onKeyPress={(e) => {
                                    if (e.key == "Enter") {
                                        searchHandle();
                                    }
                                }}
                                className='w-full text__16 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none'
                                placeholder='sEaRcH foR ToKen..................' />
                            <div
                                onClick={searchHandle}
                                className="w-[40px] h-[40px] bg-[#18AEE3] rounded-full flex items-center justify-center cursor-pointer flex-shrink-0">
                                <img src={"./../images/Search.svg"} alt="" />
                            </div>
                        </div>

                        <div className="flex items-center flex-wrap md:!flex-nowrap md:!justify-center gap-3 mt-4">
                            {/* <div className="flex items-center flex-shrink-0 gap-2">
                                <p className='text__12 text-[#B3B3B3] flex-shrink-0'>Sort by:</p>
                                <SelectFilter sortBy={sortBy} setsortBy={(e) => setsortBy(e)} list={["Featured", "Most Popular", "Least Popular"]} />
                            </div> */}
                            {/* <div className="flex items-center justify-between md:!justify-center flex-shrink-0 gap-2 md:!w-auto w-full">
                                <div className="flex items-center gap-3">
                                    <p className='text__12 text-[#B3B3B3] flex-shrink-0'>Show animations:</p>
                                    <ToogleClick Toogle={aniamtion} setToogle={(e) => setaniamtion(e)} />
                                </div>
                                <div className="flex items-center flex-shrink-0 gap-2">
                                    <p className='text__12 text-[#B3B3B3] flex-shrink-0'>Include nfsw:</p>
                                    <ToogleClick Toogle={nfsw} setToogle={(e) => setnfsw(e)} />
                                </div>
                            </div> */}
                        </div>

                        <div className="grid md:grid-cols-2 gap-[30px]">
                            {
                                memes.map((obj, index) => {
                                    return <NavLink to={`/trading-view/${(JSON.parse(obj.publishedObject)).packageId}`} className=" border-[8px] border-solid border-[#FFCC00] rounded-[15px] px-[32px] py-[9px]" key={index}>
                                        <CardListToken dataChart={obj} chart={tempChart[index]} />
                                    </NavLink>
                                })
                            }
                        </div>

                        <div className="mt-[2rem] text-center cursor-pointer flex justify-center" >
                            {loading ?
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
                                : <></>}
                        </div>

                        {page < 10000000000 ?
                            <div className="mt-[58px] text-center cursor-pointer px-[12px]" onClick={moreMemeHandle} >
                                <span className='inline-block text__16 p-[12px_32px] w-full rounded-[8.53px] text-[#000000] bg-[#FFCC00] text-[24.65px] font-[700] shadow-[4.74px_4.74px_black]'>sEe aLL</span>
                            </div>
                            : <></>
                        }

                    </Container>
                </section>

                <section className='pb-2'>
                    <div className="w-[98%] mx-auto pb-4 overflow-hidden">
                        <Container className='flex items-center justify-center'>
                            {/* <div className="text-center"> */}
                            {/* <div className="inline-block"> */}
                            {/* <h2 className='text__112 mb-8 leading-none'>Create a new <br /> coin</h2> */}
                            {/* <h1 className='footerFont'>DEPLOOOOOY</h1> */}
                            <div onClick={handleShowCreateToken} className='cursor-pointer inline-block text-[#232323] p-[12px_32px] rounded-full bg-[#A9E6BD] footerFont'>DEPLOOOOOY</div>

                            {/* <img src={"./../images/Group 8.svg"} className='absolute -left-[10rem] ss:-left-[13.5rem] top-[33%]' alt="" /> */}
                            {/* </div> */}
                            {/* </div> */}
                        </Container>
                    </div>
                </section>

                <section className='bg-[#18AEE3] mt-[80px]'>
                    <Container>
                        <div className="flex items-center flex-wrap xs:!flex-nowrap justify-center gap-y-4 px-[2rem] gap-[16px]">
                            <button className="bg-[#FFCC00] text-black rounded-[10.67px] border-[3.56px] border-black border-solid shadow-[5.93px_5.93px] w-[70px] h-[70px] flex items-center justify-center responsiveFooter">
                                <img
                                    src='./../twitter.svg'
                                    size={18}
                                    width={30.87} height={27.62}
                                />
                            </button>

                            <button className="bg-[#FFCC00] text-black rounded-[10.67px] border-[3.56px] border-black border-solid shadow-[5.93px_5.93px] w-[70px] h-[70px] flex items-center justify-center responsiveFooter">
                                <Send size={30.87} />
                            </button>
                        </div>
                    </Container>
                </section>
            </div>
        </Fragment >
    )
}

export default React.memo(Homepage);
