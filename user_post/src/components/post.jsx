import React from 'react';
import './post.css';

const Post = (props)=>{
    const showModal = (ev)=>{
        console.log(ev.target.closest('.post'))
        console.log(props.users)
    }
    return(
        <div className='post' id={props.id}>
            <h4 className='post__title'>{props.title}</h4>
            <p className='post__text'>{props.body}</p>
            <div className='post__author'>
                Author: <span className='post__author_name' onClick={showModal}>Leanne Graham</span>
            </div>

        </div>
    )
}

export default Post;