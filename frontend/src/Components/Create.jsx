import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
const Create = () => {
  const [Writer,setWriter]=useState("")
  const [Title,setTitle]=useState("")
  const [Desc,setDesc]=useState("")


  const add=async()=>{
 const res= await axios.post("http://localhost:3000/home",{
  writer:Writer,
  title:Title,
  desc:Desc
 })

 console.log(res.data)

  }
  return (
    <>
    <div className="mb-20 min-h-full">
      <div className='flex'>

        <div className='labels grid grid-cols-1 m-3'>
<label htmlFor="Writer">
Writer Name :
  </label>
  <label htmlFor="Title">
Title :
    </label>
    <label htmlFor="Desc">
Enter description of Blog :
    </label>

        </div>
     <div className="input w-3/5 grid grid-cols-1 gap-3 m-4">
      <input    id='Writer' className='border      rounded-md  p-4 border-black'    type="text" value={Writer} onChange={(e)=>{setWriter(e.target.value)}}  />
      <input    id='Title' className='border rounded-md  p-4 border-black'    type="text" value={Title} onChange={(e)=>{setTitle(e.target.value)}} />
      <textarea id='Desc'    className='border rounded-md  p-4 border-black'    type="text" value={Desc} onChange={(e)=>{setDesc(e.target.value)}} ></textarea>
</div>

</div>
      <Link to='/home'><button className='bg-blue-500 text-2xl  w-24 m-5 p-2 text-white rounded-md border-2 border-black ' onClick={add}>Add</button></Link>
      </div>
      </>
  )
}

export default Create