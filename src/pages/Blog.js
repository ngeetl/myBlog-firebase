import React from 'react';
import CardList from '../componets/CardList';

const Blog = () => {

  return (
    <div className='container'>
      <div className='card_header'>
        <h2>Blog List</h2>
      </div>
      <CardList isAdmin={false}/> 
    </div>
  )
}

export default Blog
