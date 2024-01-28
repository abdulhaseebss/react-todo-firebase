import React, { useContext } from 'react'
import UserContext from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { isUser, setIsUser } = useContext(UserContext);

    const navigate = useNavigate()
    // console.log(isUser);
    function logOut() {
        console.log('btrn called');
      signOut(auth).then(() => {
        // Sign-out successful.
        setIsUser(false)
        // navigate('login')
      }).catch((error) => {
        // An error happened.
      });
    }

    const goTologin = ()=>{
        navigate('login')
    }
    const goTORegister = ()=>{
        navigate('*')
    }

  return (
    <div className='flex justify-between p-3 bg-slate-500 text-white'>
        <h1 className='text-xl font-semibold'>Todo App</h1>
        <ul className='flex'>
          {isUser ? <li className='mr-5 cursor-pointer font-semibold hover:text-red-200 transition-all' onClick={logOut}>Logout</li> : 
          <div className=' flex'>
            <li className='mr-5 cursor-pointer font-semibold hover:text-red-200 transition-all' onClick={goTologin}>Login</li>
            <li className='mr-5 cursor-pointer font-semibold hover:text-red-200 transition-all' onClick={goTORegister}>Register</li>
        </div>}
        </ul>
      </div>
  )
}

export default Navbar