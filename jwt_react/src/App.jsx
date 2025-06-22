import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Signin from './pages/register/Signin'
import Home from './pages/home/Home'
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signin/>} />
      <Route path="/" element={<Home/>}/>

    </Routes>
  )
}

export default App
