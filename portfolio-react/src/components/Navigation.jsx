import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import './Navigation.css';

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Education', to: 'education' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-custom">
          <span className="logo-text gradient-text">SM</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler" onClick={() => {
          if (window.innerWidth < 992) {
            // open full-screen overlay on small screens
            setOverlayOpen(true);
            setExpanded(false);
          } else {
            setExpanded(!expanded);
          }
        }}>
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link-custom"
                activeClass="active"
                onClick={() => setExpanded(false)}
              >
                {item.name}
              </Link>
            ))}
          </Nav>
          
          <a 
            href="https://drive.google.com/file/d/1ITWMOMX0wrQRxusP1bDrl6Rd-xoUtZzv/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gradient ms-lg-3 mt-3 mt-lg-0"
          >
            Download CV
          </a>
        </Navbar.Collapse>
      </Container>
      </Navbar>

      {/* Full screen overlay for mobile menu */}
      <div className={`nav-overlay ${overlayOpen ? 'active' : ''}`} id="nav-overlay">
        <div className="nav-overlay-inner">
          <nav className="text-center">
            {navItems.map((item, i) => (
              <a key={i} href={`#${item.to}`} className="overlay-link" onClick={() => setOverlayOpen(false)}>{item.name}</a>
            ))}
          </nav>
          <button className="overlay-close" onClick={() => setOverlayOpen(false)}>Close</button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
