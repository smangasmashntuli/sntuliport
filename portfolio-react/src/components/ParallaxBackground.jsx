import React, { useEffect, useRef } from 'react';
import './ParallaxBackground.css';

function ParallaxBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = containerRef.current.querySelectorAll('.parallax-layer');
      
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.2;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-background" ref={containerRef}>
      <div className="parallax-layer layer-1"></div>
      <div className="parallax-layer layer-2"></div>
      <div className="parallax-layer layer-3"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
    </div>
  );
}

export default ParallaxBackground;
