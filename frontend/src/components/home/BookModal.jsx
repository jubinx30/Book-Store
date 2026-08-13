import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import api from '../../api';
import Spinner from '../Spinner';

const BookModal = ({ book, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchPdf = async () => {
      if (!book?.pdf?.filename) return;
      setLoading(true);
      try {
        const r = await api.get(`/books/${book._id}/pdf`, { responseType: 'blob' });
        if (cancelled) return;
        const url = URL.createObjectURL(r.data);
        setPdfUrl(url);
      } catch (err) {
        console.error('Failed to fetch PDF', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPdf();
    return () => {
      cancelled = true;
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [book]);

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-900 rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">{book.publishYear}</h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>

        <div className="flex-1 mt-4 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          )}

          {!loading && pdfUrl && (
            <div className="w-full h-full">
              <iframe src={pdfUrl} title="book-pdf" className="w-full h-full" />
              <div className="mt-2">
                <a href={pdfUrl} download={book.pdf?.originalName} className="text-sky-700">
                  Download PDF
                </a>
              </div>
            </div>
          )}

          {!loading && !pdfUrl && (
            <div>No PDF available for this book.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookModal;
