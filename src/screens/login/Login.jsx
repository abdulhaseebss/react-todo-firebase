import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import {auth} from "../../config/firebaseConfig/FirebaseConfig"
import UserContext from '../../context/UserContext';

const Login = () => {
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const { isUser, setIsUser } = useContext(UserContext);
  const navigate = useNavigate()

  if (isUser) {
    navigate('/')
  }else{
    setIsUser(false)
  }
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     console.log(uid);
  //     // ...
  //     navigate('/')
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  function submit(e) {
    e.preventDefault()
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
  });
  }
  return (
    <>
    <div>
        <h2 className=' text-3xl font-semibold text-gray-600 text-center mt-8'>Login</h2>
        <div className=' flex justify-center'>
        <form className=' w-[20%] p-16 rounded-lg flex flex-wrap text-center justify-center gap-4' onSubmit={submit}>
        <input  type="email"  className=' bg-slate-200 p-3 rounded-md outline-none'placeholder="Enter Email" onChange={handleEmailChange} required/>
        <input  type="password"  className=' bg-slate-200 p-3 rounded-md outline-none'placeholder="Enter Password" onChange={handlePasswordChange} required/>
        <button className=' bg-slate-600 p-2 rounded-md transition-all text-white font-semibold hover:bg-slate-400  hover:text-white' type='submit'>Login</button>
        </form>
        </div>
        <h2 className=' text-center'>Or</h2>
        <h2 className=' text-center text-blue-600 underline'><Link to='registers'>Not a user?</Link></h2>
    </div>
    </>
  )
}

export default Login;