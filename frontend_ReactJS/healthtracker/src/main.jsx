import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './routes/Login.jsx'
import Home from './routes/Home.jsx'
import SignUp from './routes/SignUp.jsx'
import Profile from './routes/Profile.jsx'
import BMI from './routes/BMI.jsx'
import History from './routes/History.jsx'
import AddActivity from './routes/AddActivity.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/bmi' element={<BMI />}></Route>
      <Route path='/history' element={<History />}></Route>
      <Route path='/addActivity' element={<AddActivity />}></Route>
    
    </Routes>
  </BrowserRouter>
)
