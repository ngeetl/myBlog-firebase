import React from 'react';

const Pagination = ({ totalPosts, getPosts, currentPage }) => {
  const pageLimit = 5;
  const totalPage = Math.ceil(totalPosts / pageLimit);
  const pages = Array(totalPage).fill(1).map((val, idx) => val + idx);

  return (
    <>
      <nav className='pagination_wrap center'>
          <ul className='pagination'>
            <li onClick={() => currentPage !== 1 && getPosts(currentPage - 1)}><a>Previous</a></li>
            {pages.map(page => {
              return(
                <li 
                  onClick={() => getPosts(page)}
                  key={page}
                  className={currentPage === page && 'active'}>
                  {page}
                </li>
              )
            })}
            <li onClick={() =>  currentPage !== totalPage && getPosts(currentPage + 1)}><a>Next</a></li>
          </ul>
        </nav>
    </>
  )
}

export default Pagination;
