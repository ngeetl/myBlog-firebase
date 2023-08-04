import React from 'react';

const Card = ({ post, editHandler, children }) => {
    const printDate = (timeStamp) => {
        return new Date(timeStamp).toLocaleString();
    }    

    return (
    <div className='card_wrap' onClick={()=> {
        editHandler();
    }}>
        <div className='card'>
            <div className='title'>제목 : {post.title}</div>
            <div className='post'>내용 : {post.body}</div>
            <small>{post.newCreateAt ? printDate(post.newCreateAt) : printDate(post.createAt)}</small>
        </div>
        {children}
    </div>
    )
}

export default Card;
