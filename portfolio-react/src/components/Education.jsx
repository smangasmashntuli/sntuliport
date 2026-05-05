import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGraduationCap } from 'react-icons/fa';
import './Education.css';

function Education() {
  const sectionRef = useRef(null);

  const educationData = [
    {
      id: 1,
      qualification: 'Advanced Diploma in ICT: Applications Development',
      university: 'Cape Peninsula University of Technology',
      startYear: 2026,
      endYear: 'Present'
    },
    {
      id: 2,
      qualification: 'Diploma in Information and Communication Technology: Applications Diploma',
      university: 'Cape Peninsula University of Technology',
      startYear: 2023,
      endYear: 2025
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll') || [];
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="education-section section" id="education" ref={sectionRef}>
      <Container>
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gradient-text">Education</h2>
          <p className="section-subtitle">My academic qualifications</p>
        </div>

        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="education-card animate-on-scroll">
              <div className="education-icon">
                <FaGraduationCap />
              </div>

              <div className="education-content">
                {educationData.map((edu, index) => (
                  <div key={edu.id} className="education-item">
                    <div className="qualification-info">
                      <h3 className="qualification-title">{edu.qualification}</h3>
                      <p className="university-name">{edu.university}</p>
                      <p className="year-range">{edu.startYear} - {edu.endYear}</p>
                    </div>
                    {index < educationData.length - 1 && (
                      <div className="qualification-divider"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="education-line"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Education;
