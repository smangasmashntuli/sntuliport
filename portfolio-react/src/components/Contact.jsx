import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  // Initialize EmailJS with public key on component mount
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'T6J-c0x0LmbsYD8Zu';
    emailjs.init(publicKey);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_v7a41qa';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_nz8xqf5';

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Simangaliso',
        }
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
  };

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
    <section className="contact-section section" id="contact" ref={sectionRef}>
      <Container>
        <div className="section-header animate-on-scroll">
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <p className="section-subtitle">Let's work together</p>
        </div>
        
        <Row>
          <Col lg={5} className="mb-5 mb-lg-0">
            <div className="contact-info animate-on-scroll">
              <h3 className="contact-info-title">Contact Information</h3>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <a href="mailto:smangasmashntuli@gmail.com">
                      smangasmashntuli@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <a href="tel:+27712719018">+27 71 271 9018</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <span>South Africa</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={7}>
            <div className="contact-form-wrapper animate-on-scroll">
              <Form onSubmit={handleSubmit} className="contact-form">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="custom-input"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={6}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="custom-input"
                  />
                </Form.Group>
                
                <Button 
                  type="submit" 
                  className="btn-gradient submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                
                {status === 'success' && (
                  <div className="status-message success">Message sent successfully! I'll get back to you soon.</div>
                )}
                {status === 'error' && (
                  <div className="status-message error">Failed to send message. Please try again or email me directly.</div>
                )}
              </Form>
              
              <div className="form-footer-info mt-5">
                <p className="contact-info-text">
                  Feel free to reach out! I'm always open to discussing new projects, 
                  creative ideas, or opportunities to be part of your vision.
                </p>
                
                <div className="contact-social">
                  <h4>Follow Me</h4>
                  <div className="social-links">
                    <a href="https://github.com/smangasmashntuli" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/simangaliso-mazweni-ntuli-1784a62b6" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaLinkedin />
                    </a>
                    <a href="https://www.facebook.com/smanga.ntuli.378" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaFacebook />
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
