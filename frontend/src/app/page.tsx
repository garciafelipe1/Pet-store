"use client"; 
import React from "react"; 

import Herolanding from "./landing/herolanding";
import Footer from "./landing/Footer";
import Aboutus from "./landing/aboutus";


export default function Home() {
  return (
    <>
      
      <Herolanding/>
      <Aboutus/>
      <Footer />
    </>
  );
}
