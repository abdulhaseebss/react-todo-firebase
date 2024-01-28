import React, { useState } from 'react'
import UserContext from './UserContext'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseConfig/FirebaseConfig';

const UserContextProvider = ({children}) => {
    const [isUser , setIsUser] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsUser(true)
        } else {
          setIsUser(false)
        }
      });

      
  return (
    <UserContext.Provider value={{isUser , setIsUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider