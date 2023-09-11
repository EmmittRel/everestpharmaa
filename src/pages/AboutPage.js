import React from 'react'
import About from '../components/About';
import Process from '../components/Process';
import Banner from '../components/Banner';
import OurTeam from '../components/OurTeam';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import "../components/App.css"

function AboutPage() {
  return (
    <div>
      <Banner
        backgroundImage={"https://i.ibb.co/Gkds1Cs/1.png"}
        title="About Company"
      />
      <About/>
      {/* <Hero/> */}
      <Mission/>
      <Process className="process_about"/>
      {/* <OurTeam/> */}
      <Footer/>
    </div>
  )
}

export default AboutPage
