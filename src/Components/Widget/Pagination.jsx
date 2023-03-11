import React, { Fragment } from 'react'
import { LoadFile } from '../../Helper/LoadFile'

const Pagiantion = ({page, changePage}) => {
    return (
        <Fragment>
            <div className="flex items-center justify-center gap-[6px]">
                <div className="flex items-center justify-center gap-[2px]">
                    <img src={LoadFile("images/arrow2.svg")} className='cursor-pointer' alt="" onClick={() => changePage(1)}/>
                    <img src={LoadFile("images/arrow1.svg")} className='cursor-pointer' alt="" onClick={() => {
                        if(page - 1 <= 0){
                            changePage("t","1");
                        }else {
                            changePage("t",page - 1);
                        }
                    }}/>
                </div>
                <div className="flex items-center justify-center gap-[4px]">
                    {
                        <div className={"font-medium text__14 w-[26px] h-[26px] cursor-pointer flex items-center justify-center  text-white "}>
                            {page}
                        </div>
                    }
                </div>
                <div className="flex items-center justify-center gap-[2px]">
                    <img src={LoadFile("images/arrow1.svg")} className='cursor-pointer rotate-180' alt="" onClick={() => changePage("n", page + 1)}/>
                    {/* <img src={LoadFile("images/arrow2.svg")} className='cursor-pointer rotate-180' alt="" /> */}
                </div>
            </div>
        </Fragment>
    )
}

export default Pagiantion
