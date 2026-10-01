import { Link } from 'react-router-dom'
import {PiBookOpenTextLight} from 'react-icons/pi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import ReadPdfButton from './ReadPdfButton';


const BookSingleCard = ({book}) => {
  return (
   <article className='shelf-book-card'>
          <p className='shelf-book-meta'>{book.publishYear}</p>
          <div className='flex justify-start items-center gap-x-2'>
            <PiBookOpenTextLight className='text-2xl text-[var(--accent-coral)]'/>
            <h2>{book.title}</h2>
          </div>
          <p className='shelf-book-meta'>{book.author}</p>
          <div className='shelf-book-card-actions'>
           <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle aria-label='Book details' />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit aria-label='Edit book' />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete aria-label='Delete book' />
            </Link>
            <ReadPdfButton book={book} />
          </div>
      </article>
  )
}

export default BookSingleCard