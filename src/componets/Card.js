import React from 'react';

const Card = ({ post, editHandler, children }) => {
    // const printDate = (timeStamp) => {
    //     return new Date(timeStamp).toLocaleString();
    // } 
    const printDate = (timeStamp) => {
        if (timeStamp && timeStamp.toDate) {
            // Timestamp를 Date 객체로 변환
            return timeStamp.toDate().toLocaleString();
        } else {
            return new Date(timeStamp).toLocaleString();
        }
    }   

    return (
    <div className='card_wrap' onClick={()=> {
        editHandler();
    }}>
        <div className='card'>
            <div className='title'>제목 : {post.title}</div>
            <div className='post'>내용 : {post.body}</div>
            <small>{post.newCreatedAt ? printDate(post.newCreatedAt) : printDate(post.createdAt)}</small>
        </div>
        {children}
    </div>
    )
}

export default Card;
