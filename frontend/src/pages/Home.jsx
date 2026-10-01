import { useEffect, useState } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import LogoutButton from '../components/LogoutButton';
import ThemeToggle from '../components/ThemeToggle';
import { MdOutlineAddBox } from "react-icons/md";
import { PiBookOpenTextLight } from 'react-icons/pi';
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState("table");
  const [userName] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      return jwtDecode(token).name ?? '';
    } catch (error) {
      console.error('Invalid token', error);
      return '';
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    api.get('/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredBooks = normalizedQuery
    ? books.filter((book) => (
      String(book.title ?? '').toLocaleLowerCase().includes(normalizedQuery)
      || String(book.author ?? '').toLocaleLowerCase().includes(normalizedQuery)
    ))
    : books;

  return (
    <main className="shelf-app-page">
      <div className="shelf-app-container">
      <header className="shelf-app-header">
        <Link className="shelf-auth-brand" to="/">
          <span className="shelf-auth-brand-mark"><PiBookOpenTextLight /></span>
          Book Nook
        </Link>
        <div className="shelf-home-actions">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>
      <section className="shelf-home-topline">
        <div>
          <p className="shelf-auth-kicker">Your personal catalog</p>
          <h1 className="shelf-page-heading">Welcome{userName ? `, ${userName}` : ''}</h1>
          <p className="shelf-page-subtitle">A considered home for the books you keep.</p>
        </div>
        <Link to="/books/create" className="shelf-action-button">
          <MdOutlineAddBox className="text-2xl" /> Add a book
        </Link>
      </section>
      <section className="shelf-library-search" aria-label="Search your library">
        <label htmlFor="library-search">Find a book</label>
        <div className="shelf-catalog-search">
          <AiOutlineSearch aria-hidden="true" />
          <input
            id="library-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title or author"
            autoComplete="off"
            aria-describedby="library-search-count"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <AiOutlineClose />
            </button>
          )}
        </div>
        <p id="library-search-count" aria-live="polite">
          {normalizedQuery
            ? `${filteredBooks.length} of ${books.length} books`
            : `${books.length} ${books.length === 1 ? 'book' : 'books'} in your library`}
        </p>
      </section>
      <div className="shelf-view-switch" role="group" aria-label="Catalog layout">
        <button
          className="shelf-view-button"
          aria-pressed={showType === 'table'}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="shelf-view-button"
          aria-pressed={showType === 'card'}
          onClick={() => {
            setShowType("card");
          }}
        >
          Card
        </button>

      </div>
      {loading ? (
        <Spinner />
      ) : filteredBooks.length === 0 ? (
        <div className="shelf-empty-state">
          <PiBookOpenTextLight />
          <h2>{normalizedQuery ? 'No matching books.' : 'Your shelf starts here.'}</h2>
          <p>{normalizedQuery ? 'Try another title or author name.' : 'Add a book to begin keeping your collection in one place.'}</p>
          {normalizedQuery ? (
            <button type="button" className="shelf-back-button" onClick={() => setSearchQuery('')}>Clear search</button>
          ) : (
            <Link to="/books/create" className="shelf-action-button">Add your first book</Link>
          )}
        </div>
      ) : showType === "table" ? (
        <BookTable books={filteredBooks} />
      ) : (
        <BookCard books={filteredBooks} />
      )}
      </div>
    </main>
  );
};

export default Home;
