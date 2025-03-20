import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import React from 'react'
import { Toaster } from 'react-hot-toast'


export default function Layout(  ) {



  return (
  <>
<div className="flex flex-col justify-between bg-paper min-h-[100vh] ">
  <Toaster /> 
  <Navbar/>
 <Outlet/>
  <Footer/>

</div>
  </>
  )
}
