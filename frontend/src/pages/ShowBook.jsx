import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const fetchBook = async () => {
            try {
                const res = await api.get(`/books/${id}`);
                if (cancelled) return;
                setBook(res.data);
                setLoading(false);
                if (res.data?.pdf?.filename) {
                    try {
                        const r = await api.get(`/books/${id}/pdf`, { responseType: 'blob' });
                        if (cancelled) return;
                        const url = URL.createObjectURL(r.data);
                        setPdfUrl(url);
                    } catch (err) {
                        console.log('PDF not available', err);
                    }
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) setLoading(false);
            }
        };
        fetchBook();
        return () => {
            cancelled = true;
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
    }, [id]);

    if (loading) {
        return (
            <main className="shelf-app-page">
                <div className="shelf-app-container">
                    <BackButton />
                    <Spinner />
                </div>
            </main>
        );
    }

    if (!book) {
        return (
            <main className="shelf-app-page">
                <div className="shelf-app-container">
                    <BackButton />
                    <p className="shelf-page-subtitle">Book not found.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="shelf-app-page">
            <div className="shelf-app-container">
                <BackButton />
                <h1 className="shelf-page-heading">Book details</h1>

                <div className="shelf-info-panel">
                    <div className="shelf-info-row">
                        <span className="shelf-info-label">ID</span>
                        <span>{book._id}</span>
                    </div>

                    <div className="shelf-info-row">
                        <span className="shelf-info-label">Title</span>
                        <span>{book.title}</span>
                    </div>

                    <div className="shelf-info-row">
                        <span className="shelf-info-label">Author</span>
                        <span>{book.author}</span>
                    </div>

                    <div className="shelf-info-row">
                        <span className="shelf-info-label">Publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>

                    <div className="shelf-info-row">
                        <span className="shelf-info-label">Create Time</span>
                        <span>{book.createdAt ? new Date(book.createdAt).toString() : ''}</span>
                    </div>

                    <div className="shelf-info-row">
                        <span className="shelf-info-label">Last Update Time</span>
                        <span>{book.updatedAt ? new Date(book.updatedAt).toString() : ''}</span>
                    </div>

                   
                </div>
            </div>
        </main>
    );
};

export default ShowBook;