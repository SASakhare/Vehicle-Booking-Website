import React from 'react'
import Navbar from './components/Navbar'
import PublicHome from './components/PublicHome'
import Footer from './components/Footer'

const page = () => {
  return (
    <div
      className='w-full min-h-screen bg-white'
    >
      <Navbar />

      <PublicHome />

      <Footer />

    </div>
  )
}

export default page