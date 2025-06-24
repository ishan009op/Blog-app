import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Info() {
  const { id } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/home/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

const handleDelete=async()=>{
  const res= await axios.delete(`http://localhost:3000/home/${id}`)
  console.log(res)
}

  return (
    <div className=" flex flex-col gap-7">
      <Link to='/' className="text-red-500 text-xl absolute right-20"><button onClick={handleDelete}>Delete</button></Link>
      <Link to={`/update/${post.id}`} className="text-blue-500 text-xl absolute right-40"><button>Edit</button></Link>
      <h1 className="text-3xl m-3 text-center"><strong> Title:</strong>{post.title}</h1>
      <p className="text-3xl m-3 text-center"><strong> Written By:</strong> {post.writer}</p>
      <p className="w-3/4 text-center text-2xl m-3"><strong>Description :</strong>{post.desc}</p>

      <Link to='/' className='text-blue-500 text-2xl  w-40 m-5 p-2  rounded-md '>&larr;return Back</Link>
    </div>
  );
}

export default Info;
