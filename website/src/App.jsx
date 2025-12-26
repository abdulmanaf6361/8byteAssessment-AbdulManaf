// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroVideo from "./components/HeroVideo";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import OurPeople from "./components/OurPeople";
import CareerDetail from "./pages/CareerDetail"; // detailed job page
import Careers from "./pages/Careers"; // careers cards component to embed on homepage
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home page route with embedded Careers cards */}
        <Route
          path="/"
          element={
            <>
              <HeroVideo />
              <About />
              <Portfolio />
              {/* <OurPeople /> */}
              <Careers />  {/* Directly show 3 career cards here */}
              <Contact />
            </>
          }
        />

        {/* Single career detail */}
        <Route path="/careers/:id" element={<CareerDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
