import React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import LogoutButton from '../components/LogoutButton';
import ThemeToggle from '../components/ThemeToggle';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    api
      .get('/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-black"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-black"
          onClick={() => {
            setShowType("card");
          }}
        >
          Card
        </button>

      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <div className='flex items-center gap-4'>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
          {localStorage.getItem('token') ? (
            <div className='flex items-center gap-2'>
              <ThemeToggle />
              <LogoutButton />
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Link to='/login' className='text-sky-700'>Login</Link>
              <Link to='/signup' className='text-sky-700'>Signup</Link>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default Home;
