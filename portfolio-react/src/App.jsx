import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Loader from './components/Loader';
import ParallaxBackground from './components/ParallaxBackground';
import MouseFollower from './components/MouseFollower';
import MphembaMatrix from './projects/MphembaMatrix/MphembaMatrix';
import CarVoting from './projects/CarVoting/CarVoting';
import HealthChatbot from './projects/HealthChatbot/HealthChatbot';
import ChickenLicken from './projects/ChickenLicken/ChickenLicken';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router basename="/sntuliport">
      <Routes>
        {/* Main Portfolio Route */}
        <Route path="/" element={
          <div className="App">
            <ParallaxBackground />
            <MouseFollower />
            <Navigation />
            <Hero />
            <About />
            <Skills />
            <WorkExperience />
            <Projects />
            <Contact />
            <Footer />
            <BackToTop />
          </div>
        } />
        
        {/* Project Routes */}
        <Route path="/projects/mphemba-matrix" element={<MphembaMatrix />} />
        <Route path="/projects/car-voting" element={<CarVoting />} />
        <Route path="/projects/health-chatbot" element={<HealthChatbot />} />
        <Route path="/projects/chicken-licken" element={<ChickenLicken />} />
      </Routes>
    </Router>
  );
}

export default App;
