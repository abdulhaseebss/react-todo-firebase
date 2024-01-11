import { useState } from 'react'
import React from 'react'
import { onAuthStateChanged , signOut } from "firebase/auth";
import {auth} from "../../config/firebaseConfig/FirebaseConfig"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [text, setText] = useState("");
    const [todo, setTodo] = useState([]);
    const [promptValue, setPromptValue] = useState('');
    const navigate = useNavigate()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
        navigate('login')
      }
    });
      
    
    function addTodo(e) {
      e.preventDefault()
      if (text == "") {
        alert('Enter Text')
        return;
      }
      console.log(text);
      todo.unshift(text)
      setTodo([...todo]);
      console.log(todo);
      setText("")
    }
    
    function deleteTodo(index) {
  
      todo.splice(index, 1);
      setTodo([...todo]);
      console.log(todo);
    }
    function editTodo(index) {
      const userValue = prompt('Enter something:' , todo[index]);
      
      if (userValue === null) {
        console.log('user click cancle');
        return;
      }else{
        setPromptValue(userValue);
        todo[index] = userValue;
        
        console.log("Edit Button Called");
        console.log(todo);
      }
      
    }
    function logOut() {
      console.log('btrn called');
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate('login')
      }).catch((error) => {
        // An error happened.
      });
    }
  
    return (
      <>
      <div className='flex justify-between p-3 bg-slate-500 text-white'>
        <h1 className='text-xl font-semibold'>Todo App</h1>
        <ul className='flex'>
          <li className='mr-5 cursor-pointer font-semibold hover:text-red-200 transition-all' onClick={logOut} >Logout</li>
        </ul>
      </div>
      <div className=' flex justify-center mt-4'>
      <form onSubmit={addTodo} className='flex justify-between items-center'>
        <input  type="text"  className=' bg-slate-200 p-3 mr-3 rounded-md outline-none'placeholder="Enter Text"  onChange={(e) => setText(e.target.value)} value={text}/>
        <button className='text-xl transition-all font-semibold hover:border-2 hover:border-blue-700 hover:rounded-xl px-4 py-2' type='submit'>Add</button>
      </form>
      </div>
      <ul>
          {todo.map((item, index) => {
            return <div ><li className='p-5 font-semibold'  key={index}>{item}
            &nbsp;&nbsp;<button className=' bg-red-200 p-2 rounded-md mr-1 transition-all hover:bg-red-600 hover:text-white' onClick={()=>deleteTodo(index)}>Delete</button>&nbsp;
            <button className=' bg-slate-200 p-2 rounded-md transition-all hover:bg-slate-600 hover:text-white' onClick={()=>editTodo(index)}>Edit</button></li><hr /></div>
          })}
        </ul>
      </>
  )
}

export default Home