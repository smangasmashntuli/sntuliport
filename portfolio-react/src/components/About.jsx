import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import './About.css';

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section section" id="about" ref={sectionRef}>
      <Container>
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gradient-text">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>
        
        <Row className="align-items-center">
          <Col lg={5} className="mb-5 mb-lg-0">
            <div className="about-image-wrapper animate-on-scroll">
              <div className="image-bg-shape"></div>
              <img 
                src={`${import.meta.env.BASE_URL}images/334066167_148732571438811_7406887273882172408_n.jpg`}
                alt="Simangaliso working" 
                className="about-image"
              />
              <div className="image-overlay">
                <div className="stats-grid">
                  <div className="stat-item">
                    <h3>5+</h3>
                    <p>Projects</p>
                  </div>
                  <div className="stat-item">
                    <h3>10+</h3>
                    <p>Technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={7}>
            <div className="about-content animate-on-scroll">
              <h3 className="about-heading">Who am I?</h3>
              <p className="about-text">
                I'm a passionate <span className="highlight">Software Developer</span> with a strong interest in building
                AI-integrated systems and modern web applications. I focus on Python and web development, and I enjoy
                designing solutions that combine intelligent systems with practical, real-world applications.
                I have experience working across both front-end and back-end technologies through my academic projects and personal work.
              </p>
              <p className="about-text">
                I believe in writing clean, maintainable code and building systems that are efficient, scalable, and user-focused.
                My journey in software development is driven by curiosity and a growing passion for artificial intelligence,
                automation, and creating impactful digital solutions.
              </p>
              
              <div className="about-details">
                <Row>
                  <Col md={6}>
                    <div className="detail-card">
                      <div className="detail-icon">
                        <FaEnvelope />
                      </div>
                      <div className="detail-info">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">smangasmashntuli@gmail.com</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-card">
                      <div className="detail-icon">
                        <FaPhone />
                      </div>
                      <div className="detail-info">
                        <span className="detail-label">Phone</span>
                        <span className="detail-value">(+27) 71 271 9018</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-card">
                      <div className="detail-icon">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="detail-info">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">South Africa</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-card">
                      <div className="detail-icon">
                        <FaGraduationCap />
                      </div>
                      <div className="detail-info">
                        <span className="detail-label">Education</span>
                        <span className="detail-value">ICT: App Development</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              
              <div className="about-actions">
                <a 
                  href="https://drive.google.com/file/d/1Twqqwd4PnnbsutIXzplyuaIAAR2B6Qbt/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="btn-gradient me-3">View My CV</Button>
                </a>
                <a href="#contact">
                  <Button className="btn-outline-gradient">Hire Me</Button>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;
