import React from 'react'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Services from "../pages/Services"
import {Routes,Route} from 'react-router-dom'
import About from '../components/About/About'
import Login from '../pages/Login'
import Signup from '../pages/SignUp'
import FindService from '../pages/FindService'
import Msg from '../components/msg/Msg'
import Chat from '../components/msg/Chat'
import ServiceProfile from '../components/Profiles/ServiceProfile'
import UserProfile from '../components/Profiles/UserProfile'



const Routers = () => {

  return (
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/services' element={<Services/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Signup/>} />
    <Route path='/msg' element={<Msg/>} />
    <Route path='/find-Service' element={<FindService/>} />
    <Route path='/chat' element={<Chat/>} />
    <Route path='/User-profile' element={<UserProfile/>} />
    <Route path='/Service-profile/:id' element={<ServiceProfile/>} />



  
   
  

      </Routes>
  )
}

export default Routers