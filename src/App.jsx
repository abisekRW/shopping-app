import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import Signup from './Signup'
import Mainpage from './Mainpage'
import Products from './Products'
import Cart from './Cart'
import Profile from './Profile'
import Login from './Login'

function App() {
  const [cart, setCart] = useState([])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Mainpage" element={<Mainpage />} />
        <Route path="/Products" element={<Products cart={cart} setCart={setCart} />} />
        <Route path="/Cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
