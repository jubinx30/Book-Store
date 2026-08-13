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
            <div className="p-4 min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!book) {
        return (
            <div className="p-4 min-h-screen flex items-center justify-center">
                <div className="text-center">Book not found.</div>
            </div>
        );
    }

    return (
        <div className="p-4 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <BackButton />
                <h1 className="text-3xl my-4 text-center">Book Information</h1>

                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full p-4 card-bg h-[800px] overflow-auto">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Id</span>
                        <span>{book._id}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Title</span>
                        <span>{book.title}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Author</span>
                        <span>{book.author}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Create Time</span>
                        <span>{book.createdAt ? new Date(book.createdAt).toString() : ''}</span>
                    </div>

                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
                        <span>{book.updatedAt ? new Date(book.updatedAt).toString() : ''}</span>
                    </div>

                    {pdfUrl && (
                        <div className="my-4 w-full h-[600px]">
                            <span className="text-xl mr-4 text-gray-500">PDF</span>
                            <div className="border mt-2">
                                <iframe src={pdfUrl} title="book-pdf"  width="800" height="1000"></iframe>
                            </div>
                            <a
                                href={pdfUrl}
                                download={book.pdf?.originalName}
                                className="mt-2 inline-block text-sky-700"
                            >
                                Download PDF
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowBook;