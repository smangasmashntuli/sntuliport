import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBriefcase, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import './WorkExperience.css';

function WorkExperience() {
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

  const experiences = [
    {
      company: 'OmniHR Consulting',
      position: 'Internship (Web Development)',
      duration: '08 July 2025 - 19 December 2025',
      responsibilities: [
        'Built WordPress web pages using Elementor based on wireframes.',
        'Assisted in migrating the company website from Thrive to Elementor.',
        'Ensured responsive layouts and consistent design across pages.'
      ]
    }
  ];

  return (
    <section className="experience-section section" id="experience" ref={sectionRef}>
      <Container>
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gradient-text">Work Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>
        
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="experience-timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-item animate-on-scroll">
                  <div className="experience-icon">
                    <FaBriefcase />
                  </div>
                  
                  <div className="experience-content">
                    <div className="experience-header">
                      <div className="experience-title-group">
                        <h3 className="experience-company">{exp.company}</h3>
                        <h4 className="experience-position">{exp.position}</h4>
                      </div>
                      <div className="experience-duration">
                        <FaCalendarAlt className="calendar-icon" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                    
                    <div className="experience-responsibilities">
                      <ul>
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>
                            <FaCheckCircle className="check-icon" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="experience-line"></div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default WorkExperience;
