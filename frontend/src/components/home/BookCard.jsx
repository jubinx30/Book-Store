import BookSingleCard from './BookSingleCard';

const BookCard = ({books}) => {
  return (
    <div className='shelf-book-grid'>
      {books.map((item)=>(
      <BookSingleCard key={item._id} book={item}/>
      ))}
    </div>
  )
}

export default BookCard;