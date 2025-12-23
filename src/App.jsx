import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaSearch } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";


import {collection, getDocs} from 'firebase/firestore'
import {db} from './config/firebase'
import ContactBar from './components/ContactBar';
import Modal from './components/Modal';

function App() {
  

  const[contacts,setContacts] = useState([])
  const [isOpen,setOpen] = useState(false)

  function onOpen() {
    setOpen(true)
  }
   function onClose() {
    setOpen(false)
  }

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
     <ContactBar  value={contact} />
     <Modal  onOpen=(isOpen)  />
          </>
        )
      })}
    </div>
    </>
  )
}

export default App
