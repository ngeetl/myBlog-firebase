import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../componets/Card';
import LoadingSpinner from '../componets/LoadingSpinner';
import Pagination from './Pagination';
import useToast from '../Hooks/toast';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const CardList = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts]= useState(1);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [errMessage, setErrMessage] = useState('');
 
    // Custom Hooks
    const { addToast } = useToast();

    useEffect(() => {
      fetchData();
    }, [])

    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "blog-post")
        const collectionSnap = await getDocs(collectionRef)
        const data = collectionSnap.docs.map((doc) => {
          const postData = doc.data();
          const postId = doc.id;

          return { id: postId, ...postData }
        })

        setPosts(data);
      }
      catch (err) {
        console.log('err is ', err)
      }
    }


 // post 불러오기 (GET)
    // const getPosts = (page = 1) => {
    //   setCurrentPage(page);
      
      // axios.get('http://localhost:3100/posts', {
      //   params: {
      //     page: page,
      //     search: searchText
      //   }
      // })
      // .then(res => {
      //   const { totalPosts, paginatedPosts, publishPost, searchPost } = res.data;
      //   searchText ? setPosts(searchPost) : setPosts(paginatedPosts);
      //   setTotalPosts(totalPosts);
      //   setLoading(false);
      //   if(!isAdmin) {
      //     setPosts(publishPost);
      //   }
      //   }).catch(err => {
      //     setErrMessage('서버로부터 불러오는 것을 실패하였습니다.');
      //     addToast({
      //       type: 'err',
      //       message: '서버 접속 실패'
      //     });
      //     setLoading(false);
      //   })
    // }
  
    // useEffect(getPosts, []);

    // err 메세지
    if(errMessage) {
      return <div className='center'>{errMessage}</div>
    }

    // post 수정    
    const editHandler = (id) => {
      navigate(`/blog/${id}`);
    }

    const deleteHandler = (e, id) => {
      e.stopPropagation();
      // window.confirm('삭제하시겠습니까?') &&
      // axios.delete(`http://localhost:3100/posts/${id}`)
      //   .then(() => {
      //     getPosts(1);
      //     addToast({type: "success", message: "메세지가 삭제되었습니다."});
      //   }).catch(err => {
      //     addToast({
      //       type: "err",
      //       message: "오류가 발생하였습니다."
      //     })
      //   });
    } 

    // post Card rendering
    const renderList = (posts) => {
        if(loading) {
          return (
            <LoadingSpinner/>
          )
        } else if(posts.length === 0) {
          return (
            <div className='center'>나만의 블로그를 작성해 보세요!</div>
          )
        }
        return posts.map(post => {
            return(
              <Card post={post} key={post.id} editHandler={() => editHandler(post.id)} views={post.views}>
                {isAdmin ? (
                    <button 
                        className='card_button button' 
                        onClick={(e) => deleteHandler(e, post.id)}>
                            Delete
                    </button>) : null}
              </Card>
            )
          })
        }

    // search API
    // const onSearch = (e) => {
    //   if(e.key === 'Enter') {
    //     getPosts()
    //   }
    // }

    return (
      <>
        {/* <div className='search center'>
          <div className='search_wrap'>
            <input 
              className='search_bar'
              type='text'
              placeholder='search...'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyUp={onSearch}/>
            <button onClick={() => getPosts()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
              </svg>    
            </button>
          </div>
        </div> */}
        {renderList(posts)}
        {/* {totalPosts > 0 && <Pagination totalPosts={totalPosts} getPosts={getPosts} currentPage={currentPage} />} */}
      </>
    )
}

export default CardList
