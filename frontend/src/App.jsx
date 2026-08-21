import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import DeleteBook from './pages/DeleteBook'
import EditBook from './pages/EditBook'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path='/login' element={<Login/>} />  
      <Route path='/signup' element={<Signup/>} />
      <Route path='/books/create' element={<ProtectedRoute><CreateBook/></ProtectedRoute>} />
      <Route path='/books/details/:id' element={<ProtectedRoute><ShowBook /></ProtectedRoute>} />
      <Route path='/books/edit/:id' element={<ProtectedRoute><EditBook/></ProtectedRoute>} />
      <Route path='/books/delete/:id' element={<ProtectedRoute><DeleteBook/></ProtectedRoute>} />
    </Routes>
  )
}

export default App