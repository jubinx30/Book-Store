import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineLibraryBooks, MdOutlinePictureAsPdf } from 'react-icons/md';
import { PiBookOpenTextLight } from 'react-icons/pi';
import ThemeToggle from '../components/ThemeToggle';
import './LandingPage.css';

const LandingPage = () => {
  const [hasSession] = useState(() => Boolean(localStorage.getItem('token')));

  return (
    <main className="shelf-page">
      <header className="shelf-nav">
        <Link className="shelf-brand" to="/" aria-label="Book Nook home">
          <span className="shelf-brand-mark"><PiBookOpenTextLight /></span>
          <span>Book Nook<small>Your personal collection</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#features">What you can do</a>
          <ThemeToggle />
          {hasSession ? (
            <Link className="shelf-nav-action" to="/library">My library <AiOutlineArrowRight /></Link>
          ) : (
            <>
              <Link className="shelf-nav-login" to="/login">Log in</Link>
              <Link className="shelf-nav-action shelf-nav-signup" to="/signup">Sign up <AiOutlineArrowRight /></Link>
            </>
          )}
        </nav>
      </header>

      <section className="shelf-hero">
        <div className="shelf-hero-copy">
          <p className="shelf-eyebrow"><span /> A little more room for good stories</p>
          <h1>Your books,<br /><em>beautifully</em> in order.</h1>
          <p className="shelf-intro">
            Keep the titles you love close. Record their details, attach reading files,
            and keep your personal shelf growing.
          </p>

          <div className="shelf-hero-links">
            <Link className="shelf-primary-link" to={hasSession ? '/library' : '/signup'}>
              {hasSession ? 'Open my library' : 'Create your library'} <AiOutlineArrowRight />
            </Link>
            {!hasSession && <span>Already have an account? <Link to="/login">Sign in</Link></span>}
          </div>
        </div>

        <div className="shelf-art" aria-hidden="true">
          <div className="shelf-art-note">A shelf of your own <span>✳</span></div>
          <div className="shelf-books">
            <div className="shelf-book shelf-book-one"><span>THE<br />QUIET<br />HOURS</span><i>01</i></div>
            <div className="shelf-book shelf-book-two"><span>FIELD<br />NOTES</span><i>02</i></div>
            <div className="shelf-book shelf-book-three"><span>GROW<br />WILD</span><i>03</i></div>
            <div className="shelf-book shelf-book-four"><span>SMALL<br />WONDERS</span><i>04</i></div>
          </div>
          <div className="shelf-art-caption"><span>COLLECT</span><span>·</span><span>ORGANIZE</span><span>·</span><span>RETURN</span></div>
          <div className="shelf-art-disc" />
        </div>
      </section>

      <section className="shelf-features" id="features">
        <div className="shelf-section-heading">
          <p className="shelf-eyebrow"><span /> Made for your reading life</p>
          <h2>A good home for every book.</h2>
        </div>
        <div className="shelf-feature-list">
          <article className="shelf-feature">
            <span className="shelf-feature-icon"><MdOutlineLibraryBooks /></span>
            <div><h3>One tidy collection</h3><p>Keep titles, authors, and publication years together in a shelf that’s easy to browse.</p></div>
            <span className="shelf-feature-number">01</span>
          </article>
          <article className="shelf-feature">
            <span className="shelf-feature-icon"><AiOutlineSearch /></span>
            <div><h3>Find it in a moment</h3><p>Search by book name and jump straight to the details you’re looking for.</p></div>
            <span className="shelf-feature-number">02</span>
          </article>
          <article className="shelf-feature">
            <span className="shelf-feature-icon"><MdOutlinePictureAsPdf /></span>
            <div><h3>Keep the pages close</h3><p>Attach a PDF to a book and open or download it alongside its details.</p></div>
            <span className="shelf-feature-number">03</span>
          </article>
        </div>
      </section>

      <footer className="shelf-footer">
        <Link className="shelf-brand" to="/" aria-label="Book Nook home">
          <span className="shelf-brand-mark"><PiBookOpenTextLight /></span>
          <span>Book Nook<small>A calmer way to keep your books.</small></span>
        </Link>
        <Link to={hasSession ? '/library' : '/signup'}>{hasSession ? 'Go to my library' : 'Start your collection'} <AiOutlineArrowRight /></Link>
      </footer>
    </main>
  );
};

export default LandingPage;