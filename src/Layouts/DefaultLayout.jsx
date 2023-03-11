import React, { Fragment } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../Components/Nav/Navbar'

const DefaultLayout = () => {
    return (
        <Fragment>
            <div className='w-full overflow-hidden relative min-h-screen'>
                <Navbar />
                <div className="pt-[112px]">
                    <Outlet />
                </div>
            </div>
        </Fragment>
    )
}

export default DefaultLayout
