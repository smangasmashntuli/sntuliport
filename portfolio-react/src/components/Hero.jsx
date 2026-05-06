import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import Typed from 'typed.js';
import { Link } from 'react-scroll';
import './Hero.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.025);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 0);
    container.appendChild(renderer.domElement);

    // simple procedural texture
    function createTexture(index) {
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = `hsl(0,0%,${6 + Math.random() * 6}%)`;
      ctx.fillRect(0,0,256,256);
      ctx.fillStyle = `rgba(200,165,92,${0.05 + Math.random() * 0.18})`;
      for (let i=0;i<30;i++){ctx.fillRect(Math.random()*256,Math.random()*256,1.5,1.5)}
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    const cardGeometry = new THREE.PlaneGeometry(0.75, 0.75);
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const textures = [];
    for (let i = 0; i < 8; i++) textures.push(createTexture(i));

    // simple letter layout 'SM' as blocks
    const grid = [
      [1,0,1,0,1],
      [1,0,1,0,1],
      [1,1,1,1,1],
      [1,0,1,0,1],
      [1,0,1,0,1]
    ];

    const cards = [];
    const spacing = 0.9;
    const startX = -((grid[0].length - 1) * spacing) / 2;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col]) {
          const material = new THREE.MeshBasicMaterial({ map: textures[Math.floor(Math.random()*textures.length)], transparent:true, opacity:0.95 });
          const card = new THREE.Mesh(cardGeometry, material);
          const tx = startX + (col) * spacing;
          const ty = (grid.length - row) * spacing - 2;
          card.position.set(tx + (Math.random()-0.5)*8, ty + (Math.random()-0.5)*8, (Math.random()-0.5)*8);
          card.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
          card.userData = { targetX: tx, targetY: ty, targetZ: 0, phase: Math.random()*Math.PI*2, speed: 0.3 + Math.random()*0.5 };
          cardGroup.add(card);
          cards.push(card);
        }
      }
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xc8a55c, 0.8, 50); pointLight.position.set(5,5,8); scene.add(pointLight);
    camera.position.z = 22;

    // entrance animation
    gsap.to(camera.position, { z: 11, duration: 2.2, ease: 'power3.inOut', delay: 0.3 });
    cards.forEach((card,i)=>{
      const delay = 0.5 + (i/cards.length)*0.8;
      gsap.to(card.position, { x: card.userData.targetX, y: card.userData.targetY, z: card.userData.targetZ, duration:1.8, ease:'power3.out', delay });
      gsap.to(card.rotation, { x:0,y:0,z:0, duration:1.8, ease:'power3.out', delay });
    });

    gsap.to(camera.position, { z: 2.5, scrollTrigger: { trigger: '#hero', start: 'top top', end: '+=120%', scrub: 1.5 }, duration: 1 });

    let targetRotX = 0, targetRotY = 0;
    document.addEventListener('mousemove', (e)=>{
      const x = (e.clientX/window.innerWidth - 0.5)*2;
      const y = (e.clientY/window.innerHeight - 0.5)*2;
      targetRotY = x * 0.25; targetRotX = -y * 0.25;
    });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      cardGroup.rotation.x += (targetRotX - cardGroup.rotation.x)*0.04;
      cardGroup.rotation.y += (targetRotY - cardGroup.rotation.y)*0.04;
      cards.forEach(card=>{
        const yOffset = Math.sin(t*card.userData.speed + card.userData.phase)*0.015;
        card.position.y = card.userData.targetY + yOffset;
      });
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (renderer && renderer.domElement) container.removeChild(renderer.domElement);
      // dispose textures
      textures.forEach(t => { if (t) t.dispose && t.dispose(); });
    };
  }, []);

  return (
    <section className="hero-section" id="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      
      <Container className="hero-container">
        <Row className="align-items-center justify-content-between min-vh-100">
          <Col lg={6} className="hero-content">
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
                Passionate about building AI powered applications that solve real-world problems and create value.
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
                <a href="https://twitter.twitter/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </Col>

          <Col lg={5} className="hero-image-wrapper">
            <div className="hero-image-container">
              <div className="image-bg-shape"></div>
              <img 
                src={`${import.meta.env.BASE_URL}images/SM_Graduate.jpg`}
                alt="Simangaliso Ntuli" 
                className="hero-image"
              />
              <div className="image-glow"></div>
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
