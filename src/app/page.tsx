import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { auth } from '@/auth'
import HomePageWrapper from './components/HomePageWrapper'

const page = async () => {


  return (
    <div
      className='w-full min-h-screen bg-white'
    >
      <Navbar />
      <HomePageWrapper />

      <Footer />

    </div>
  )
}

export default page