import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {
    const [blogs,setBlogs]=useState([])
    useEffect(()=>{
const fetchBLogs= async()=>{
 const res = await axios.get('http://localhost:3000/home')
 const data= await res.data

 setBlogs(data);
 
 
}
fetchBLogs()
    },[])
  

     if (!Array.isArray(blogs) || blogs.length === 0) {
    return <div className="text-center mt-20 text-xl"><p>No blogs available...</p>
    <Link to='/Create' className=" block w-44 text-center mx-auto rounded-lg border-2 border-black bg-blue-500 p-3 mt-10 text-xl hover:bg-blue-600 text-white "
>
      create Blogs
    </Link>
    </div>;
  }
  return (
    <>
    {
    <div className='mb-20 min-h-full grid gap-10 m-10 grid-cols-3'>
  {
    blogs.map((blog)=>{
        return  <React.Fragment key={blog.id}>
        <div  className=' border-2  border-black w-auto  h-72' >
          <div>
<p className='text-3xl font-bold text-center p-3 '>{blog.writer}</p>
<p className='text-2xl font-bold text-center p-3 '>{blog.title}</p>
<p className='text-xl m-2 p-2 overflow-hidden whitespace-nowrap text-ellipsis '>
  {blog.desc.length > 100 ? blog.desc.slice(0, 100) + '...' : blog.desc}
</p>
  <Link to={`/Info/${blog.id}`} className='bg-blue-500 text-xl p-2 text-white rounded-md border-2 border-black relative left-40 top-16'>Read More&rarr;</Link>
  </div>
        </div>
        </React.Fragment>
    })
  }
   </div>}
    </>
  )
}

export default Home