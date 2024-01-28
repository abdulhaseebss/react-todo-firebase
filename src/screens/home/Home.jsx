import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Timestamp, addDoc, collection, getDocs, orderBy, where, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig/FirebaseConfig';
import UserContext from '../../context/UserContext';
import { onAuthStateChanged } from 'firebase/auth';


const Home = () => {
  const todo = useRef();
  const [data, setData] = useState([]);
  const { isUser, setIsUser } = useContext(UserContext);
  const [showTodo , setShowTodo] = useState(true);
  const [userUid , setUid] = useState('')
  const [promptValue, setPromptValue] = useState('');
  // let uid;

  // if (isUser) {
  //   setUid(auth.currentUser.uid)
  //   return

  // }

  useEffect(() => {
    async function getDataFromFirestore() {
      const querySnapshot = await getDocs(collection(db, "todo"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const obj = {
          docId: doc.id,
          ...doc.data()
        }
        console.log(obj);
        data.push(obj);
        setData([...data]);
      });
    }
    getDataFromFirestore()

  }, [])



  const deleteTodo = async (index) => {
    console.log('todo deleted', index);
    await deleteDoc(doc(db, "todo", data[index].docId));
    data.splice(index, 1);
    setData([...data]);
  }

  const editTodo = async (index)=>{
    console.log('edit btn clicked' , data[index]);
    const userValue = prompt('Enter something:' , data[index].todo);
    if (userValue === null) {
      console.log('user click cancle');
      return;
    }else{
      const updatedTodo = doc(db, "todo", data[index].docId);
      updateDoc(updatedTodo, {
        todo: userValue
      }).then(()=>{
        data.splice(index, 1, {
          todo: userValue
        })
        setData([...data]);
      })
    }
  }
  


  const addTodo = async(event) => {
    event.preventDefault();
    if (!isUser) {
      alert('Login Please')
      return
    }
    // uid = auth.currentUser.uid
    console.log(todo.current.value);
    //data firebase ma bhijwadonga
    // .then(state ma data save krwadonga!) .catch
    setData([...data, {
      todo: todo.current.value,
      
    }]);
    console.log(data);
    try {
      const docRef = await addDoc(collection(db, "todo"), {
        todo: todo.current.value,
        uid: userUid ,
        postDate: Timestamp.fromDate(new Date()),
      });
      console.log("Document written with ID: ", docRef.id);
      todo.current.value = '';
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
    <Navbar/>
    <form className='flex justify-center items-center mt-3' onSubmit={addTodo}>
      <input className=' bg-slate-200 p-3 mr-3 rounded-md outline-none' type="text" placeholder='Enter Text' ref={todo}/>
      <button className='text-xl transition-all font-semibold hover:border-2 hover:border-blue-700 hover:rounded-xl px-4 py-2'>Add</button>
    </form>
   <ul key={'index'}>
          {data.length > 0 ? data.map((item, index) => {
            // console.log(item);
            return <div key={index}><li className='p-5 font-semibold'  >{item.todo}
            &nbsp;&nbsp;<button className=' bg-red-200 p-2 rounded-md mr-1 transition-all hover:bg-red-600 hover:text-white' onClick={()=>deleteTodo(index)}>Delete</button>&nbsp;
            <button className=' bg-slate-200 p-2 rounded-md transition-all hover:bg-slate-600 hover:text-white' onClick={()=>editTodo(index)}>Edit</button></li><hr /></div>
          }) : <h1>No Todos...</h1>}
        </ul>
    </>
  )
}

export default Home