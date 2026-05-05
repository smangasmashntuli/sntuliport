import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './Projects.css';

function Projects() {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'TeachWave Learning Platform',
      description: 'Responsive learning platform with subject management, learner progress tracking, and interactive learning tools.',
      image: `${import.meta.env.BASE_URL}images/Screenshot 2026-02-26 204210.png`,
      technologies: ['React', 'Tailwind CSS', 'TypeScript', 'MySQL', 'Express'],
      demoLink: null,
      githubLink: 'https://github.com/smangasmashntuli/teachwave-pro',
      isInternal: false
    },
    {
      title: 'Health Aid Chatbot',
      description: 'AI-powered chatbot providing preliminary health advice and symptom analysis with integration to healthcare providers.',
      image: `${import.meta.env.BASE_URL}images/Screenshot 2025-05-26 165242.png`,
      technologies: ['React', 'Gemini AI', 'CSS3', 'JavaScript'],
      demoLink: '/projects/health-chatbot',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    },
    {
      title: 'Chicken Licken Clone',
      description: 'Responsive restaurant website with menu filtering, online ordering system, and location finder.',
      image: `${import.meta.env.BASE_URL}images/Screenshot 2025-02-12 152328.png`,
      technologies: ['React', 'CSS3', 'JavaScript'],
      demoLink: '/projects/chicken-licken',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    },
    {
      title: 'Mpheba Matrix',
      description: 'An e-commerce platform for computer components with user authentication, product filtering, and payment integration.',
      image: `${import.meta.env.BASE_URL}images/Screenshot 2025-05-24 231333.png`,
      technologies: ['React', 'CSS3', 'JavaScript'],
      demoLink: '/projects/mphemba-matrix',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    },
    {
      title: 'Car Voting System',
      description: 'Interactive application for car enthusiasts to vote and compare different car models with real-time results visualization.',
      image: `${import.meta.env.BASE_URL}images/Screenshot 2025-05-22 232344.png`,
      technologies: ['React', 'Chart.js', 'CSS3', 'JavaScript'],
      demoLink: '/projects/car-voting',
      githubLink: 'https://github.com/smangasmashntuli/sntuliport',
      isInternal: true
    }
  ];

  // Get base URL from import.meta.env or window.location
  const baseURL = import.meta.env.BASE_URL || '/sntuliport/';
  
  // Helper function to open internal links in new tab with correct base URL
  const openInNewTab = (path) => {
    // Remove leading slash if baseURL already has it
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBaseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
    const fullPath = `${cleanBaseURL}${cleanPath}`;
    
    // For React Router, use window.location.origin to get the full URL
    const fullUrl = `${window.location.origin}${fullPath}`;
    
    console.log('Opening URL:', fullUrl); // For debugging
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll') || [];
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects-section section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gradient-text">My Projects</h2>
          <p className="section-subtitle">Some of my recent work</p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.title}
                className={`timeline-item ${isEven ? 'left' : 'right'} animate-on-scroll`}
              >
                <div className="timeline-content">
                  <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>

                  <h3 className="timeline-title">{project.title}</h3>

                  <p className="timeline-description">{project.description}</p>

                  <div className="timeline-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="timeline-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="timeline-links">
                    {project.demoLink ? (
                      project.isInternal ? (
                        <button
                          onClick={() => openInNewTab(project.demoLink)}
                          className="timeline-link timeline-link-primary"
                          style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                        >
                          <FaExternalLinkAlt />
                          <span>View Demo</span>
                        </button>
                      ) : (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="timeline-link timeline-link-primary"
                        >
                          <FaExternalLinkAlt />
                          <span>View Demo</span>
                        </a>
                      )
                    ) : null}

                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="timeline-link"
                    >
                      <FaGithub />
                      <span>GitHub Repo</span>
                    </a>
                  </div>
                </div>

                <div className="timeline-dot"></div>

                <div className="timeline-image-wrapper">
                  <img src={project.image} alt={project.title} className="timeline-image" />

                  <div className="timeline-overlay">
                    <div className="project-links">
                      {project.demoLink ? (
                        project.isInternal ? (
                          <button
                            onClick={() => openInNewTab(project.demoLink)}
                            className="project-link"
                            aria-label="View demo"
                            style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                          >
                            <FaExternalLinkAlt />
                          </button>
                        ) : (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                            aria-label="View demo"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )
                      ) : null}

                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="GitHub repo"
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;