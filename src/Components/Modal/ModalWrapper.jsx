import React, { Fragment } from 'react'
import { Modal } from 'react-bootstrap'

const ModalWrapper = ({ show, handleClose, size = "md", customWidth = "", children }) => {
    return (
        <Fragment>
            <Modal size={size} centered show={show} onHide={handleClose} dialogClassName={customWidth !== "" ? customWidth : ""} className='modalWrap'>
                <Modal.Body>
                    <img src={"./../images/close.svg"} onClick={handleClose} className='absolute -right-3 -top-3 cursor-pointer' alt="" />
                    {children}
                </Modal.Body>
            </Modal>
        </Fragment >
    )
}

export default ModalWrapper
