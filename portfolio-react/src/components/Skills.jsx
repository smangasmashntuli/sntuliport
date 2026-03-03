import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaLaptopCode, FaServer, FaTools } from 'react-icons/fa';
import './Skills.css';

function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const skills = {
    frontend: [
      { name: 'HTML5', level: 95, icon: 'https://static.vecteezy.com/system/resources/previews/001/416/705/non_2x/html5-emblem-orange-shield-and-white-text-vector.jpg' },
      { name: 'CSS3', level: 90, icon: 'https://cdn.freebiesupply.com/logos/large/2x/css3-logo-png-transparent.png' },
      { name: 'JavaScript', level: 85, icon: 'https://logodownload.org/wp-content/uploads/2022/04/javascript-logo-0.png' },
      { name: 'React', level: 35, icon: 'https://www.liblogo.com/img-logo/re269re79-react-logo-react-logo-.png' },
      { name: 'WordPress', level: 70, icon: 'https://th.bing.com/th/id/R.ccd51215fd5a784acc78e158f6cd7ef9?rik=K5BY8oy%2fbY3Fbg&pid=ImgRaw&r=0' }
    ],
    backend: [
      { name: 'Node.js', level: 45, icon: 'https://download.logo.wine/logo/Node.js/Node.js-Logo.wine.png' },
      { name: 'Python', level: 50, icon: 'https://static.vecteezy.com/system/resources/previews/012/697/295/large_2x/3d-python-programming-language-logo-free-png.png' },
      { name: 'Java', level: 60, icon: 'https://static.vecteezy.com/system/resources/previews/022/100/214/original/java-logo-transparent-free-png.png' },
      { name: 'Spring Boot', level: 50, icon: 'https://th.bing.com/th/id/R.0a9e1ba826c607ae87e0a650e18460ce?rik=6jZMle4DR6tGbw&pid=ImgRaw&r=0' }
    ],
    tools: [
      { name: 'GitHub', level: 85, icon: 'https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png' },
      { name: 'Figma', level: 30, icon: 'https://th.bing.com/th/id/OIP.J4FIo0ShasCvD5gd6yoxtwHaHa?rs=1&pid=ImgDetMain' }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
    <section className="skills-section section" id="skills" ref={sectionRef}>
      <Container>
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gradient-text">My Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>
        
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <h3 className="category-title">Front-End</h3>
                <div className="category-icon"><FaLaptopCode /></div>
              </div>
              <div className="skills-list">
                {skills.frontend.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-info">
                        <img src={skill.icon} alt={skill.name} className="skill-icon" />
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <ProgressBar 
                      now={isVisible ? skill.level : 0} 
                      className="custom-progress"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
          
          <Col lg={4} md={6} className="mb-4">
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <h3 className="category-title">Back-End</h3>
                <div className="category-icon"><FaServer /></div>
              </div>
              <div className="skills-list">
                {skills.backend.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-info">
                        <img src={skill.icon} alt={skill.name} className="skill-icon" />
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <ProgressBar 
                      now={isVisible ? skill.level : 0} 
                      className="custom-progress"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
          
          <Col lg={4} md={12} className="mb-4">
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <h3 className="category-title">Tools & Others</h3>
                <div className="category-icon"><FaTools /></div>
              </div>
              <div className="skills-list">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-info">
                        <img src={skill.icon} alt={skill.name} className="skill-icon" />
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <ProgressBar 
                      now={isVisible ? skill.level : 0} 
                      className="custom-progress"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Skills;
