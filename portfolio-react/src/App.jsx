import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Loader from './components/Loader';
import ParallaxBackground from './components/ParallaxBackground';
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

  useEffect(() => {
    // Initialize Lenis smooth scroll + GSAP ScrollTrigger wiring
    let Lenis;
    let lenis;
    try {
      // dynamic import to avoid SSR issues
      import('lenis').then(mod => {
        Lenis = mod.default;
        lenis = new Lenis({ duration: 1.2, smooth: true, smoothTouch: false });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }).catch(() => {});
    } catch (e) {
      // ignore if not available
    }
    return () => {
      if (lenis && lenis.destroy) lenis.destroy();
    };
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
            <div className="noise-overlay" />
            <Navigation />
            <Hero />
            <Skills />
            <Projects />
            <WorkExperience />
            <Education />
            <About />
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
