import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addToast } from '../store/toastSlice';
import useToast from '../Hooks/toast';

const LoginModal = ({ hide, show }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { addToast } = useToast();

    const loginButtonHandler = (e) => {
        e.preventDefault();
        hide();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(userCredential);
                addToast({type: "success", message: `${user.email}님 반갑습니다!`});
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                addToast({type: "err", message: "로그인에 실패하였습니다."});
            });
    }

  return (
    <div className='modal' style={show ? {display: 'block'} : {display: "none"}}>
        <div className='login_modal'>
            <h3>Login</h3>
            <form>
                <div className='login_form'>
                    <div className='id_form'>
                        <label htmlFor='email'>아이디</label>
                        <input 
                            id='email'
                            placeholder='아이디를 입력해 주세요.'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='pw_form'>
                        <label htmlFor='password'>비밀번호</label>
                        <input 
                            id='password' 
                            placeholder='비밀번호를 입력해 주세요. (8자리 이상)' 
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <button 
                    type='submit'
                    onClick={loginButtonHandler}>
                        Login
                </button>
            </form>
        </div>
        <div className='overlay' onClick={hide}></div>
    </div>
  )
}

export default LoginModal
