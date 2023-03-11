import React, { Fragment, useState } from 'react'
import { Form } from 'react-bootstrap'

const SelectFilter = ({ sortBy, setsortBy, list, minWidth = "min-w-[115px] xs:min-w-[140px]" }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Fragment>
            <div className={`custom-select-container flex-shrink-0 relative text__14 ${isOpen ? "open" : ""}`}>
                <Form.Select onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)} value={sortBy} onChange={(e) => setsortBy(e.target.value)} className={"px-3 py-2 text__16 rounded-full bg-[#1F1F1F] border !border-[rgba(255,255,255,0.12)] shadow-none outline-none active:hover:focus:shadow-none active:hover:focus:outline-none !text-white custom-select relative " + minWidth} aria-label="Default select example">
                    {
                        list.map((obj, index) => {
                            return <option key={index} className='text__14' value={obj}>{obj}</option>
                        })
                    }
                </Form.Select>
            </div>
        </Fragment >
    )
}

export default SelectFilter
