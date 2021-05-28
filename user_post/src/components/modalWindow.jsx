import React from 'react';
import './modalWindow.css';

const ModalWindow = (props) => {
    return (
        <div className='modalWindow'>
            <div className='modal-title'>
                <span className='modal-title__name'>{`${props.name}`}</span>
                <img className='modalWindow__close'></img>
            </div>

            <div className='modal-body'>
                <div>{`Address: ${props.address}`}</div>
                <div>{`Email: ${props.email}`}</div>
                <div>{`Phone: ${props.telephone}`}</div>
            </div>

            <button className='close'>Close</button>

        </div>
    )
}

export default ModalWindow;