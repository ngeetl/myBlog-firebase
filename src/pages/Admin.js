import React from 'react';
import CardList from '../componets/CardList';
import { Link } from 'react-router-dom';

const Admin = () => {

    return (
        <div className='container'>
          <div className='card_header'>
            <h2>Blog List</h2>
            <Link to="/board" className='add_post'>+</Link>
          </div>
          <CardList isAdmin={true}/> 
        </div>
      )
}

export default Admin
