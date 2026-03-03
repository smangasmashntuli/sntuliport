import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaHeart } from 'react-icons/fa';
import { Link } from 'react-scroll';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <div className="footer-brand">
              <h3 className="logo-text gradient-text">SN</h3>
              <p className="footer-description">
                Building digital experiences that matter. Crafting beautiful, 
                functional, and user-friendly web applications.
              </p>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="hero" smooth={true} duration={500}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="about" smooth={true} duration={500} offset={-70}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="skills" smooth={true} duration={500} offset={-70}>
                    Skills
                  </Link>
                </li>
                <li>
                  <Link to="experience" smooth={true} duration={500} offset={-70}>
                    Experience
                  </Link>
                </li>
                <li>
                  <Link to="projects" smooth={true} duration={500} offset={-70}>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="contact" smooth={true} duration={500} offset={-70}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Web Development</a></li>
                <li><a href="#services">UI/UX Design</a></li>
                <li><a href="#services">Consulting</a></li>
                <li><a href="#services">Maintenance</a></li>
              </ul>
            </div>
          </Col>
          
          <Col lg={3} md={6}>
            <div className="footer-social">
              <h4>Connect With Me</h4>
              <div className="social-icons">
                <a href="https://github.com/smangasmashntuli" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/simangaliso-mazweni-ntuli-1784a62b6" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaLinkedin />
                </a>
                <a href="https://www.facebook.com/smanga.ntuli.378" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Simangaliso Maazweni Ntuli. Made with <FaHeart className="heart-icon" /> using React & Bootstrap
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
