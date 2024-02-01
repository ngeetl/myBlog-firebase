import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../componets/Card';
import LoadingSpinner from '../componets/LoadingSpinner';
import Pagination from './Pagination';
import useToast from '../Hooks/toast';
import { db } from '../firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore';

const CardList = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts]= useState(0);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [errMessage, setErrMessage] = useState('');
 
    // Custom Hooks
    const { addToast } = useToast();

    useEffect(() => {
      fetchData();
    }, []) 

    const fetchData = async (page = 1) => {
      try {
        setLoading(false);
        const collectionRef = collection(db, "blog-post");
        
        // total post
        let totalQuery = query(collectionRef, orderBy("createdAt", "desc"));
        const totalDocSnapshots = await getDocs(totalQuery); 
        let lastDoc;
        
        // limit post
        if (page === 1) {
          totalQuery = query(collectionRef, orderBy("createdAt", "desc"), limit(5))
        }
        if (page > 1) {
          lastDoc = totalDocSnapshots.docs[(page-1)*5-1];
          totalQuery = query(collectionRef, orderBy("createdAt", "desc"), limit(5), startAfter(lastDoc))
        }

        const querySnapshot = await getDocs(totalQuery);

        const data = querySnapshot.docs.map((doc) => {
          const postData = doc.data();
          const postId = doc.id;
          
          return { id: postId, ...postData }
        })
        
        setPosts(data);
        setCurrentPage(page);
        setTotalPosts(totalDocSnapshots.size);
      }
      catch (err) {
        setLoading(false);
        console.log('err is ', err)
      }
    }

    const handlePageChange = (page) => {
      fetchData(page);
    };

    // err 메세지
    if(errMessage) {
      return <div className='center'>{errMessage}</div>
    }

    // post 수정    
    const editHandler = (id) => {
      navigate(`/blog/${id}`);
    }

    const deleteHandler = async (e, id) => {
      e.stopPropagation();
      try {
        window.confirm('삭제하시겠습니까?') &&
        await deleteDoc(doc(db, "blog-post", id));
        addToast({type: "success", message: "메세지가 삭제되었습니다."});
        fetchData();
      }
      catch(err) {
        addToast({type: "err", message: "오류가 발생하였습니다.", err})
      }
    }; 

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

    return (
      <>
        {renderList(posts)}
        {totalPosts > 0 && <Pagination totalPosts={totalPosts} getPosts={handlePageChange} currentPage={currentPage} />}
      </>
    )
}

export default CardList
