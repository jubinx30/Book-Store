import React from "react";
import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import api from '../api';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar}=useSnackbar();
  
  const handleSaveBook = () => {
    const form = new FormData();
    form.append('title', title);
    form.append('author', author);
    form.append('publishYear', publishYear);
    if (pdfFile) form.append('pdf', pdfFile);
    setLoading(true);
    api
      .post('/books', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully',{variant: 'success'})
        navigate("/library");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error occured. Please check console.");
        enqueueSnackbar('Error',{variant:'error'})
        console.log(error);
      });
  };

  return (
    <main className="shelf-app-page">
      <div className="shelf-app-container">
      <BackButton />
      <h1 className="shelf-page-heading">Add a book</h1>
      <p className="shelf-page-subtitle">Add a title to your personal collection.</p>
      {loading ? <Spinner /> : ""}
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
          <label htmlFor="book-pdf">PDF (optional)</label>
          <input
            id="book-pdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />
        </div>

        <button className="shelf-action-button" onClick={handleSaveBook}>
          Save
        </button>
      </div>
      </div>
    </main>
  );
};

export default CreateBooks;
