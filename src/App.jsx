import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import MovieDetails from './Pages/MovieDetails'
import SeatLayout from './Pages/SeatLayout'
import MyBooking from './Pages/MyBooking'
import Favorite from './Pages/Favorite'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'

const App = () => {

  const isAdminRoute =  useLocation().pathname.startsWith('/admin')
  
  return (
    <>
    <Toaster />
    {!isAdminRoute && <Navbar />}
    {/* <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/movies/:id ' element={<MovieDetails/>} />
      <Route path='/movies/:id/:date ' element={<SeatLayout/>} />
      <Route path='/my-bookings ' element={<MyBooking/>} />
      <Route path='/favorite ' element={<Favorite/>} />
    </Routes> */}
    <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/movies' element={<Movies />} />
  <Route path='/movies/:id' element={<MovieDetails />} />
  <Route path='/movies/:id/:date' element={<SeatLayout />} />
  <Route path='/my-bookings' element={<MyBooking />} />
  <Route path='/favorite' element={<Favorite />} />
</Routes>

    {!isAdminRoute && <Footer />}


    </>
  )
}

export default App