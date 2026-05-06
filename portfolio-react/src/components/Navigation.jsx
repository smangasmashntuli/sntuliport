import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import './Navigation.css';

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Education', to: 'education' },
    { name: 'About', to: 'about' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
    >
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-custom">
          <span className="logo-text gradient-text">SM</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" className="custom-toggler" />
        
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
  );
}

export default Navigation;
