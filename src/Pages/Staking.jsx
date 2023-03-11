import React, { Fragment, useEffect, useState } from 'react';

const Staking = () => {
    const [sliderValue, setSliderValue] = useState(50);

    useEffect(() => {
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.style.setProperty('--value', `${sliderValue}%`);
        }
    }, [sliderValue]);

    return (
        <div className='Staking-mainbar'>
            <div className='bar-topname_text'>LOCK AND EARN</div>
            <div className='bar-main_border'>
                <div className='main-amount-to-lock'>
                    <div className='lock_in-name'>AMOUNT TO LOCK</div>
                    <div className='lock_in-main'>
                        <div className='lock_in-input'>
                            {/* <p></p> */}
                            <div>
                                <input type="text" placeholder='0.0' />
                                <button>Max</button>
                            </div>
                        </div>
                        <div className='lock_in-balance'>
                            <p>Balance: 0.000</p>
                            <div>
                                <img src="./../emoji/image.png" alt="" />
                                <p>STIMMY</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='select_duration'>
                    <div className='duration_topic'>SELECT DURATION</div>
                    <div className='duration_content'>
                        <span className='span-1'>Locking for&nbsp;
                            <span className='span-2'>6 months and 13 days</span>
                            &nbsp;for&nbsp;
                            <span className='span-2'>0.0 veSTIMMY</span>
                            &nbsp;voting power.</span>
                    </div>
                    <div className='duration_slide'>
                        <div className="slider-container">
                            <div className="slider-track">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(e.target.value)}
                                    className="slider"
                                />
                            </div>
                            <div className="time-markers">
                                <span className={sliderValue >= 0 ? 'active' : ''}>7 days</span>
                                <span className={sliderValue >= 25 ? 'active' : ''}>1month</span>
                                <span className={sliderValue >= 50 ? 'active' : ''}>6 months</span>
                                <span className={sliderValue >= 75 ? 'active' : ''}>1 year</span>
                                <span className={sliderValue >= 100 ? 'active' : ''}>3 years</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='staking-button'>
                    <button>LoCk ToKeNs</button>
                    <div>
                        <p>Locking will give you an NFT, referred to as a veNFT. You can increate the lock amount or extend the lock time at any point after.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staking;