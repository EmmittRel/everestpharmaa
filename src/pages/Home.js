import React from "react";
import Hero from '../components/Hero';
import About from '../components/About';
import Counter from '../components/Counter';
import ProductSlider from "../components/ProductSlider";
import Process from "../components/Process";
import Footer from "../components/Footer";
import WhatsTrend from "../components/WhatsTrend";
// import Header from '../components/Header';

const Home = () => {
    return (
        <div>
         <Hero/>
         <About/>
         <ProductSlider/>
         <Process/>
         <WhatsTrend/>
         <Counter/>
         <Footer/>
        </div>
      );
};

export default Home;