import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import SignIn from './Components/signIn/SignIn'
import UserOrders from './pages/UserOrders/UserOrders'
import AppDownload from './Components/AppDownload/AppDownload'
import { ToastContainer } from 'react-toastify'


const App = () => {
  const [signInPopup, setSignInPopup] = useState(false)

  useEffect(() => {
    if (signInPopup) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [signInPopup]);
  return (
    <>
      {signInPopup ? <SignIn setSignInPopup={setSignInPopup} /> : <></>}
      <div className='app'>
        <Navbar setSignInPopup={setSignInPopup} />
        <Routes>
          <Route>
            <Route path='/' element={<Home setSignInPopup={setSignInPopup} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/order/userorders' element={<UserOrders />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
      <AppDownload />
      <Footer />
    </>
  )
}

export default App