import React from 'react'
import {Link} from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import ThemeToggle from './ThemeToggle';

const BackButton = ({destination='/library'}) => {
  return (
    <div className='shelf-page-toolbar'>
        <Link
        to={destination}
        className='shelf-back-button'
        >
            <BsArrowLeft />
            <span>Back to library</span>
        </Link>
        <Link className='shelf-toolbar-brand' to='/'>Book Nook</Link>
        <ThemeToggle />
    </div>
  )
}

export default BackButton;
