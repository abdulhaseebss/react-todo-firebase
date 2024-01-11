import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../config/firebaseConfig/FirebaseConfig"

const Register = () => {
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const navigate = useNavigate()

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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        navigate('login')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  }

  return (
    <>
    <div>
        <h2 className=' text-3xl font-semibold text-gray-600 text-center mt-8'>Register</h2>
        <div className=' flex justify-center flex-wrap'>
        <form className='w-[20%] p-16 rounded-lg flex flex-wrap text-center justify-center gap-4' onSubmit={submit}>
        <input  type="email"  className=' bg-slate-200 p-3 rounded-md outline-none'placeholder="Enter Email" onChange={handleEmailChange} required/>
        <input  type="password"  className=' bg-slate-200 p-3 rounded-md outline-none'placeholder="Enter Password" onChange={handlePasswordChange} required/>
        <button className=' bg-slate-600 p-2 rounded-md transition-all text-white font-semibold hover:bg-slate-400  hover:text-white' type='submit'>Register </button>
        </form>
        </div>
        <h2 className=' text-center'>Or</h2>
        <p className=' text-center text-blue-600 underline'><Link to="login">Already a user?</Link></p>
    </div>
    </>
  )
}

export default Register