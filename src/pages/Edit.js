import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router';
import LoadingSpinner from '../componets/LoadingSpinner';
import { addToast } from '../store/toastSlice';
import { db } from '../firebase';

const Edit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [loading, setLoading] = useState(true);
    const [publish, setPublish] = useState(true);
    const [errMessage, setErrMessage] = useState('');

    const onChangeTitle = (e) => setEditTitle(e.target.value);
    const onChangeBody = (e) => setEditBody(e.target.value);
    const onKeyUp = e => {
        if(e.keyCode === 13) {
            submit(e);
        }
    }

    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();

        if(title.length === 0) {
            alert('제목을 입력하세요');
        } else if(body.length === 0) {
            alert('본문 내용을 입력하세요');
        } else if((title.length > 1) && (body.length > 1)) {

            // axios.patch(`http://localhost:3100/posts/${id}`, {
            //     title: editTitle,
            //     body: editBody,
            //     publish: publish,
            //     newCreateAt: Date.now(),
            // }).catch(err => {
            //     addToast({type: "err", message: "오류가 발생하였습니다."})
            // });
            navigate('/blog');
        }
    }

    useEffect(() => {
                // axios.get(`http://localhost:3100/posts/${id}`)
                //         .then(res => {
                //             setTitle(res.data.title + '-수정본');
                //             setBody(res.data.body);
                //             setLoading(false);
                //             setPublish(res.data.publish);
                //         }).catch(err => {
                //             setLoading(false);
                //             setErrMessage("서버로부터 불러오는 것을 실패하였습니다.");
                //             addToast({type: "err", message: "오류가 발생하였습니다."})
                //         });
                setEditTitle(title);
                setEditBody(body);
            }, [id, title, body]);
            
    if(errMessage) {
        return <div className='center'>{errMessage}</div>
    }

    const renderEdit = () => {
        if(loading) {
            return <LoadingSpinner/>
        }
        return (
            <>
                <div className='title_wrap post_wrap'>
                    <label for="title">Title</label>
                    <input id="title" 
                        value={editTitle}
                        onChange={onChangeTitle}
                        type="text"
                    />
                </div>
                <div className='body_wrap post_wrap'>
                    <label for="body">Body</label>
                    <textarea id="body" 
                        value={editBody} 
                        onChange={onChangeBody}
                        onKeyUp={onKeyUp}
                        type="text"
                    />
                </div>
            </>
        )
    }

    const buttonAble = () => {
        return title === editTitle && body === editBody
    }

    const onChangePublish = () => {
        publish ? setPublish(false) : setPublish(true);
    }

    return (
        <form className='center'> 
            <h3>Edit Page</h3>
            {renderEdit()}
            <div className='publish_wrap'>
                <input 
                    type='checkbox'
                    checked={publish}
                    onChange={onChangePublish}/>
                <labe>Publish</labe>
            </div>
            <div className='post_button_wrap'>
                <button 
                    className="post_button button" 
                    onClick={submit}
                    disabled={buttonAble()}>
                    Edit
                </button>
                <button 
                    className="cancel_button button" 
                    onClick={()=>navigate(`/blog/${id}`)}>
                    Cancel
                </button>
                </div>
        </form>
    )
}

export default Edit;
