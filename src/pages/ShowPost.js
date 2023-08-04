import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../componets/LoadingSpinner';
import { addToast } from '../store/toastSlice';

const ShowPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.auth.isLogin);

  useEffect(() => {
    // axios.get(`http://localhost:3100/posts/${id}`)
    //   .then(res => {
    //     setPost(res.data);
    //     setLoading(false);
    //   }).catch(err => {
    //     setErrMessage('서버로부터 불러오는 것을 실패하였습니다.');
    //     addToast({type:'err', message: "서버 접속 실패"})
    //     setLoading(false);
    //   });
    }, [id]);

  

  const printDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleString();
  }  

    if(loading) {
      return <LoadingSpinner/>
    }
    return (
    <div className='container'>
      <div className='showpost center'>
        <div className='showpost_header'>
          <span><h2 style={{display: 'inline-block'}}>{post.title}</h2></span>
          {isLogin && <span className='edit_button' onClick={()=>navigate(`/blog/${id}/edit`)}>Edit</span>}
          <div className='small_wrap'>
            <small>{printDate(post.createAt)}</small>
          </div>
        </div>
        <div className='showpost_body'>{post.body}</div>
      </div>
    </div>
    )
}

export default ShowPost;
