import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LoginModal from '../componets/LoginModal';
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth';
import useToast from '../Hooks/toast';

const Layout = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const { addToast } = useToast()

  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "rgb(255, 225, 70)" : "rgb(222, 232, 246)"
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
        const uid = user.uid;
        console.log(uid, '로그인 상태');
      } else {
        setLogin(false);
        console.log('로그아웃 상태');
      }
    });
  }, [user]);

  // 브라우저 종료시 로그아웃
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  const hide = () => {
    setShow(false);
  }

  const signOutHandler = () => {
      signOut(auth).then(() => {
        addToast({type: "success", message: "로그아웃 되었습니다."})
      });
  }

  const loginClick= () => {
    if(login) {
      signOutHandler();
      return
    }
    setShow(true);
  }

  return (
    <>
      {show && <LoginModal hide={hide} show={show}/>}
      <div className='nav_bar'>
        <h1><Link to="/">myBLOG</Link></h1>
        <div className='nav'>
          <div><NavLink style={activeStyle} to="/blog" className='nav_link'>BLOG</NavLink></div>
          {login && <div><NavLink style={activeStyle} to="/board" className='nav_link'>BOARD</NavLink></div>}
          {login && <div><NavLink style={activeStyle} to="/admin" className='nav_link'>MY</NavLink></div>}
          <div>
            <button 
              className='login'
              onClick={loginClick}>
                {login ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
