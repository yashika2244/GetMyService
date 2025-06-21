import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routes/Routers'
import { useLocation } from 'react-router-dom'

const Layout = () => {
    const location = useLocation();
     const hideFooterOnPaths = ['/msg'];
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);
  return (
    <div className=' flex flex-col min-h-screen'>
        <Header/>
     <main>
        <Routers/>
     </main>
        {!shouldHideFooter && <Footer />}
     {/* <Footer/> */}
    </div>
  )
}

export default Layout