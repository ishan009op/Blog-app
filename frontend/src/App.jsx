import { useState } from 'react'
import { Outlet } from 'react-router'
import Header from './Components/Header'
import Footer from './Components/Footer'



function App() {
 

  return (
   <>
<Header/>
<Outlet/>
<Footer/>
   </>
  )
}

export default App
