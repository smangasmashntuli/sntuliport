import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Projects.css';

function Projects() {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'Mpheba Matrix',
      description: 'An e-commerce platform for computer components with user authentication, product filtering, and payment integration.',
      image: '/images/Screenshot 2025-05-24 231333.png',
      category: 'fullstack',
      technologies: ['React', 'CSS3', 'JavaScript'],
      liveLink: '/projects/mphemba-matrix',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    },
    {
      title: 'Car Voting App',
      description: 'Interactive application for car enthusiasts to vote and compare different car models with real-time results visualization.',
      image: '/images/Screenshot 2025-05-22 232344.png',
      category: 'frontend',
      technologies: ['React', 'Chart.js', 'CSS3', 'JavaScript'],
      liveLink: '/projects/car-voting',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    },
    {
      title: 'Health Aid Chatbot',
      description: 'AI-powered chatbot providing preliminary health advice and symptom analysis with integration to healthcare providers.',
      image: '/images/Screenshot 2025-05-26 165242.png',
      category: 'fullstack',
      technologies: ['React', 'Gemini AI', 'CSS3', 'JavaScript'],
      liveLink: '/projects/health-chatbot',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    },
    {
      title: 'Chicken Licken Clone',
      description: 'Responsive restaurant website with menu filtering, online ordering system, and location finder.',
      image: `${import.meta.env.BASE_URL}images/Screenshot 2025-02-12 152328.png`,
      category: 'frontend',
      technologies: ['React', 'CSS3', 'JavaScript'],
      liveLink: '/projects/chicken-licken',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    },
    {
      title: 'TeachWave Learning Platform',
      description: 'Responsive learning platform with subject management, learner progress tracking, and interactive learning tools.',
      image: `${import.meta.env.BASE_URL}images/Screenshot 2026-02-26 204210.png`,
      category: 'fullstack',
      technologies: ['React', 'Tailwind CSS', 'TypeScript', 'MySQL', 'Express'],
      liveLink: 'https://github.com/smangasmashntuli/teachwave-pro',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: false
    }
  ];

  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Front-End', value: 'frontend' },
    { name: 'Full-Stack', value: 'fullstack' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
  }, [filter]);

  return (
    <section className="projects-section section" id="projects" ref={sectionRef}>
      <Container>
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gradient-text">My Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </div>
        
        <div className="projects-filter animate-on-scroll">
          {filters.map((f, index) => (
            <Button
              key={index}
              className={`filter-btn ${filter === f.value ? 'active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.name}
            </Button>
          ))}
        </div>
        
        <Row>
          {filteredProjects.map((project, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <div className="project-card animate-on-scroll">
                <div className="project-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.isInternal ? (
                        <Link 
                          to={project.liveLink}
                          className="project-link"
                          aria-label="Live Demo"
                        >
                          <FaExternalLinkAlt />
                        </Link>
                      ) : (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="Live Demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View Code"
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} bg="transparent" className="tech-badge">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Projects;
