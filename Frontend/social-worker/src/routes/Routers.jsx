import React from "react";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import { Routes, Route } from "react-router-dom";
import About from "../components/About/About";
import Login from "../pages/Login";
import SignUp from "../pages/signUp/CustomerSignUP";
import FindService from "../pages/FindService";
import AllServiceProfile from "../components/ServiceProfile/AllServiceProfile";
import UserProfile from "../components/UserProfile/UserProfile";
import RollSelection from "../components/RollSelection/RollSelection";
import CustomerSignUp from "../pages/signUp/CustomerSignUP";
import ServiceProviderSignUp from "../pages/signUp/ServiceProviderSignUp";
import GetProfileFromSearch from "../components/ServiceProfile/GetProfileFromSearch";
import UpdateServicerProfile from "../components/ServiceProfile/UpdateServicerProfile";
import ServicerAccount from "../components/ServiceProfile/ServicerAccount";
import UpdateUser from "../components/UserProfile/UpdateUser";
import Chats from "../components/ChatBox/Chats";
import AllUserProfiles from "../components/UserProfile/AllUserProfiles";
import ScrollToTop from "../components/ScrollToTop";
import ProtectedRoute from '../routes/ProtectedRoute'

const Routers = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/find-Service" element={<FindService />} />
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/users-profile/:id" element={<AllUserProfiles />} />
        <Route path="/Service-profile/:id"
        
        element={
          <ProtectedRoute >
        <AllServiceProfile />

          </ProtectedRoute>}
        />
        <Route path="/update_service/:id" element={<UpdateServicerProfile />} />
        <Route
          path="/Services-profile/:id"
          element={<GetProfileFromSearch />}
        />
        <Route path="/select-role" element={<RollSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cutomer-register" element={<CustomerSignUp />} />
        <Route
          path="/register-service-provider"
          element={<ServiceProviderSignUp />}
        />
        <Route path="/servicer-account/:id" element={<ServicerAccount />} />
        <Route path="/update_user/:id" element={<UpdateUser />} />
        <Route path="/msg" element={<Chats />} />
      </Routes>
    </>
  );
};

export default Routers;
