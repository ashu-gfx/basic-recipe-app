import axios from '../utils/axois'
import React, { useEffect } from 'react'

const Home = () => {
  const getproduct = async () => {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products/1')
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log('Home.jsx mounted')
    getproduct()

    return () => {
      console.log('Home.jsx Unmounted')
    }
  })
  return (
    <div>
      <h1>Home</h1>
      <button className='cursor-pointer' onClick={getproduct}>
        Get Products
      </button>
    </div>
  )
}

export default Home
