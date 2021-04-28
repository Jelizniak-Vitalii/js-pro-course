import React from 'react';
import EmogiRow from './EmojiRow.jsx';

const EmojiContainer = ({emojiList,inputValue})=>{
    return (
        <div>{emojiList.slice(0,5).map((el) => <EmogiRow symbol={el.symbol} title={el.title}/>)}</div>
    )
}

export default EmojiContainer;