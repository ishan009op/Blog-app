import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Writer, setWriter] = useState('');
  const [Title, setTitle] = useState('');
  const [Desc, setDesc] = useState('');

  // Fetch existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/home/${id}`);
        const blog = res.data;
        setWriter(blog.writer);
        setTitle(blog.title);
        setDesc(blog.desc);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };
    fetchData();
  }, [id]);

  const edit = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/home/${id}`, {
        writer: Writer,
        title: Title,
        desc: Desc,
      });
      console.log("Updated:", res.data);
      navigate(`/Info/${id}`); // Redirect to the updated blog
    } catch (err) {
      console.error('Error updating blog:', err);
    }
  };

  return (
    <div className="mb-20 min-h-full">
      <div className="flex">
        <div className="labels grid grid-cols-1 m-3">
          <label htmlFor="Writer">Writer Name:</label>
          <label htmlFor="Title">Title:</label>
          <label htmlFor="Desc">Enter description of Blog:</label>
        </div>

        <div className="input w-3/5 grid grid-cols-1 gap-3 m-4">
          <input
            id="Writer"
            className="border rounded-md p-4 border-black"
            type="text"
            value={Writer}
            onChange={(e) => setWriter(e.target.value)}
          />
          <input
            id="Title"
            className="border rounded-md p-4 border-black"
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="Desc"
            className="border rounded-md p-4 border-black"
            value={Desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button
        className="bg-blue-500 text-2xl w-24 m-5 p-2 text-white rounded-md border-2 border-black"
        onClick={edit}
      >
        Update
      </button>
    </div>
  );
};

export default Update;
