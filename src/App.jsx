import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Signup from './Signup'
import Mainpage from './Mainpage'
import Products from './Products'
import Cart from './Cart'
import Profile from './Profile'
import Login from './Login'


function App() {
  const [cart, setCart] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('isLoggedIn');
  });
  const path = window.location.pathname.toLowerCase();
  const hideNavbar = path === '/login' || path === '/signup';
  
  React.useEffect(() => {
    const handler = () => setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Products" element={<Products cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
        <Route path="/Cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
