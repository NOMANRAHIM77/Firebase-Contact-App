import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaSearch } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

import {collection, getDocs} from 'firebase/firestore'
import {db} from './config/firebase'

function App() {
  

  const[contacts,setContacts] = useState([])

  const getContacts= async ()=>{
  try{
const contactsRef = collection(db,'contacts')
const contactSnapShot = await getDocs(contactsRef)
const contactLists = contactSnapShot.docs.map((doc)=>{
 return {
id:doc.id,
...doc.data()
 }
})
setContacts(contactLists)
  }

  catch(error){
 console.log(error)
  }
  }

  useEffect(()=>{
getContacts()
  },[])

  return (
    <>
    <Navbar/>

    <div className='w-full flex justify-center  relative items-center ' >
      <FaSearch  className='absolute  text-2xl mr-74  ' />
     <input type="text"  className='bg-transparent border-white rounded-md h-7 w-75  px-11 ' placeholder='Enter name' />
     <FaPlusCircle className='ml-3 text-3xl cursor-pointer ' />
    </div>

    <div className=' items-center flex justify-center h-auto flex-col p-8 ' >
      {contacts.map((contact)=>{
        return(
          <>
          <div id={contact.id} className='w-auto h-7 bg-black flex gap-8 justify-between items-center p-5'  >

            <IoPerson className='text-white text-2xl cursor-pointer' />

               <div className='flex justify-between text-white text-1xl gap-4 '>
                <h2  >{contact.name}</h2>
               <h2  >{contact.email}</h2>
               </div>

              <div className='flex justify-between gap-3 ' >
                 <FaRegEdit className='text-white text-2xl cursor-pointer' />
                 <FaRegTrashAlt className='text-white text-2xl cursor-pointer' />
              </div>

          </div>
          </>
        )
      })}
    </div>
    </>
  )
}

export default App
