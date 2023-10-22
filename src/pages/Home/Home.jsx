import React from 'react'
import Hero from '../Hero/Hero'
import About from '../About/About'
import Services from '../Services/Services'
import Contact_us from '../Contact-us/Contact_us'
import "./Home.scss";

const Home = () => {
  return (
    <div id='home'>
      <Hero/>
      <About/>
      <Services/>
      <Contact_us/>
    </div>
  )
}

export default Home
