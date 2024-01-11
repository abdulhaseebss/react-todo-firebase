import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../screens/login/Login";
import Home from "../../screens/home/Home";
import Register from "../../screens/register/Register";

const RouterConfig = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='*' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default RouterConfig