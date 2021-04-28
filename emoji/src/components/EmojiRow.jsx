import React from 'react';
import './EmojiRow.css';

const EmogiRow = ({symbol,title})=>{
    const codePointHex = symbol.codePointAt(0).toString(16)
    const imgSrc = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;
    const activeEmoji = (e)=>{
        e.target.closest('.emoji').style.backgroundColor = 'blue';
    }
    const inActiveEmoji = (e)=>{
        e.target.closest('.emoji').style.backgroundColor = 'white';
    }
   
    return(
        <div className='emoji' onMouseOver={activeEmoji} onMouseOut={inActiveEmoji}>
            <img src={imgSrc} className='emoji__img'></img>
            <div className='emoji__title'>{title}</div>
        </div>
        
    )
}

export default EmogiRow;