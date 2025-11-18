import React from 'react'
import Mainroutes from './Routes/Mainroutes'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div className='py-10 px-[10%] w-screen h-screen text-white font-thin bg-gray-800'>
      <Navbar></Navbar>
      <Mainroutes></Mainroutes>
    </div>
  )
}

export default App