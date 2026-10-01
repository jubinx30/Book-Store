import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import ReadPdfButton from './ReadPdfButton';

const BookTable = ({books}) => {
  return (
    <div className="shelf-table-wrap">
    <table className="shelf-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th className="max-md:hidden">
              Author
            </th>
            <th className="max-md:hidden">
              Publish Year
            </th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <td>
                {index + 1}
              </td>

              <td>
                {book.title}
              </td>

              <td className="max-md:hidden">
                {book.author}
              </td>
              <td className="max-md:hidden">
                {book.publishYear}
              </td>

              <td>
                <div className="shelf-table-actions">
                  <Link to={`/books/details/${book._id}`} aria-label={`Details for ${book.title}`} title="Book details">
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} aria-label={`Edit ${book.title}`} title="Edit book">
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} aria-label={`Delete ${book.title}`} title="Delete book">
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                  <ReadPdfButton book={book} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookTable