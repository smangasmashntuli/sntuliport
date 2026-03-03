import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import Typed from 'typed.js';
import { Link } from 'react-scroll';
import './Hero.css';

function Hero() {
  const canvasRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: [
        'Front-End Developer',
        'React Enthusiast',
        'Web Developer',
        'Problem Solver'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 100})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero-section" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      
      <Container className="hero-container">
        <Row className="align-items-center justify-content-center min-vh-100">
          <Col lg={8} className="hero-content">
            <div className="hero-text">
              <h1 className="hero-greeting">
                Hi, I'm
              </h1>
              <h2 className="hero-name gradient-text">
                Simangaliso Mazweni Ntuli
              </h2>
              <h3 className="hero-title">
                <span ref={typedRef}></span>
              </h3>
              <p className="hero-description">
                I build exceptional digital experiences with modern web technologies.
                Passionate about creating responsive, accessible, and performant web applications.
              </p>
              
              <div className="hero-buttons">
                <Link to="projects" smooth={true} duration={500} offset={-70}>
                  <Button className="btn-gradient me-3">View My Work</Button>
                </Link>
                <Link to="contact" smooth={true} duration={500} offset={-70}>
                  <Button className="btn-outline-gradient">Contact Me</Button>
                </Link>
              </div>
              
              <div className="hero-social">
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
        
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <HiArrowDown className="scroll-arrow" />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
