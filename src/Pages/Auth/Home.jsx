import React from 'react'
import Hero from '../../components/Hero'
import Product from '../../components/Product'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

function Home() {
  return (
    <div className="bg-[#e6f1fc] border">
      <Navbar />
      <Hero />
      <Product />
      <Footer />
    </div>
  )
}

export default Home
