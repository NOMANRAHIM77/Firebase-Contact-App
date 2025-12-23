import React from 'react'

import { IoPerson } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const ContactBar = ({value}) => {
    console.log(value)
  return (
    <>
         <div id={value.id} className='w-auto h-7 bg-black flex gap-8 justify-between items-center p-5'  >

            <IoPerson className='text-white text-2xl cursor-pointer' />

               <div className='flex-col justify-between text-white text-1xl gap-4 '>
                <h2  >{value.name}</h2>
               <h2  >{value.email}</h2>
               </div>

              <div className='flex justify-between gap-3 ' >
                 <FaRegEdit className='text-white text-2xl cursor-pointer' />
                 <FaRegTrashAlt className='text-white text-2xl cursor-pointer' />
              </div>

          </div>
    </>
  )
}

export default ContactBar