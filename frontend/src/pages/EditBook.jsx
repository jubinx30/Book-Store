import React from "react";
import { useState,useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import api from '../api';
import { useNavigate,useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams();
  const {enqueueSnackbar}=useSnackbar();

  useEffect(()=>{
    setLoading(true);
    api.get(`/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setTitle(response.data.title);  
      setLoading(false);
    });
  },[])
  const handleEditBook = () => {
    const form = new FormData();
    form.append('title', title);
    form.append('author', author);
    form.append('publishYear', publishYear);
    if (pdfFile) form.append('pdf', pdfFile);
    setLoading(true);
    api
      .put(`/books/${id}`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited Successfully',{variant:'success'})
        navigate("/library");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error occured. Please check console.");
        enqueueSnackbar('Error',{variant:'error'});
        console.log(error);
      });
  };

  return (
    <main className="shelf-app-page">
      <div className="shelf-app-container">
      <BackButton />
      <h1 className="shelf-page-heading">Edit book</h1>
      <p className="shelf-page-subtitle">Update the details in your collection.</p>
      {loading ? <Spinner /> : null}
      <div className="shelf-form-panel">
        <div className="shelf-form-field">
          <label htmlFor="book-title">Title</label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="shelf-form-field">
          <label htmlFor="book-author">Author</label>
          <input
            id="book-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="shelf-form-field">
          <label htmlFor="book-year">Publish Year</label>
          <input
            id="book-year"
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>

        <div className="shelf-form-field">
          <label htmlFor="book-pdf">Replace PDF (optional)</label>
          <input
            id="book-pdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </div>

        <button className="shelf-action-button" onClick={handleEditBook}>
          Save
        </button>
      </div>
      </div>
    </main>
  );
};

export default EditBook;
