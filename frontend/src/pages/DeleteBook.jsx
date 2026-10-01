import React,{useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import api from '../api';
import {useNavigate, useParams} from 'react-router-dom'
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const {enqueueSnackbar}=useSnackbar();
  const handleDeleteBook=()=>{
    setLoading(true);
    api
      .delete(`/books/${id}`)
      .then(()=>{
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully',{variant:'success'});
        navigate('/library')
      })
      .catch((error)=>{
        setLoading(false);
        // alert('An error occured. Please check console');
        enqueueSnackbar('Error',{variant:'error'})
        console.log(error);
      })
  }
 
  return (
    <main className='shelf-app-page'>
      <div className='shelf-app-container'>
      <BackButton />
      <h1 className='shelf-page-heading'>Remove a book</h1>
      <p className='shelf-page-subtitle'>This will permanently remove the book from your collection.</p>
      {loading ? <Spinner /> : ''}
      <div className='shelf-form-panel shelf-delete-panel'>
        <h2>Are you sure you want to delete this book?</h2>
      
        <button
          className='shelf-danger-button'
          onClick={handleDeleteBook}
          >
            Yes, Delete it.
        </button>
      </div>
      </div>
    </main>
  )
}

export default DeleteBook