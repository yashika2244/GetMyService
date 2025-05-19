import React from 'react'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Services from "../pages/Services"
import {Routes,Route} from 'react-router-dom'
import About from '../components/About/About'
import Login from '../pages/Login'
import SignUp from '../pages/signUp/CustomerSignUP'
import FindService from '../pages/FindService'
import Msg from '../components/msg/Msg'
import Chat from '../components/msg/Chat'
import AllServiceProfile from '../components/ServiceProfile/AllServiceProfile'
import UserProfile from '../components/UserProfile/UserProfile'
import RollSelection from '../components/RollSelection/RollSelection'
import CustomerSignUp from '../pages/signUp/CustomerSignUP'
import ServiceProviderSignUp from '../pages/signUp/ServiceProviderSignUp'
import GetProfileFromSearch from '../components/ServiceProfile/GetProfileFromSearch'
// import ServicerAccount from '../components/ServiceProfile/ServicerAccount'



const Routers = () => {

  return (
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/services' element={<Services/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/about' element={<About/>} />
    {/* <Route path='/user-signup' element={<Login/>} /> */}
    {/* <Route path='/register' element={<SignUp/>} /> */}
    <Route path='/msg' element={<Msg/>} />
    <Route path='/find-Service' element={<FindService/>} />
    <Route path='/chat' element={<Chat/>} />
    
    <Route path='/User-profile' element={<UserProfile/>} />
    <Route path="/Service-profile/:id" element={<AllServiceProfile/>} />
    





    <Route path="/Services-profile/:id" element={<GetProfileFromSearch/>} />


  <Route path="/select-role" element={<RollSelection />} />
  {/* <Route path="/servier-account" element={<ServicerAccount />} /> */}


    <Route path='/login' element={<Login/>} />
    {/* <Route path='/service-provider-signup' element={<ServiceProviderSignUp />} /> */}

      <Route path="/cutomer-register" element={<CustomerSignUp />} />
  <Route path="/register-service-provider" element={<ServiceProviderSignUp />} />




  
   
  

      </Routes>
  )
}

export default Routers