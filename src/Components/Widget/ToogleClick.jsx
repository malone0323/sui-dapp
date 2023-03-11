import React, { Fragment } from 'react'

const ToogleClick = ({ Toogle, setToogle }) => {
    return (
        <Fragment>
            <label className="switch">
                <input type="checkbox" onChange={() => setToogle(!Toogle)}  {...(Toogle && { checked: true })} />
                <span className="slider round"></span>
            </label>
        </Fragment>
    )
}

export default ToogleClick
