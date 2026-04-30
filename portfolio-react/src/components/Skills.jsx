import React, { useEffect, useState } from 'react';
import './Skills.css';

const SKILLS = [
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'SpringBoot', category: 'Backend' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'PyCharm', category: 'Tools' },
  { name: 'IntelliJ IDEA', category: 'Tools' },
  { name: 'Figma', category: 'Tools' }
];

function Skills() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex(i => (i + 1) % SKILLS.length), 3500);
    return () => clearInterval(id);
  }, [paused]);

  const marqueeItems = [...SKILLS.map(s => s.name), ...SKILLS.map(s => s.name), ...SKILLS.map(s => s.name)];

  return (
    <section className="skills-slideshow-section" aria-label="Skills separator">
      <div className="slideshow-strip">
        <div
          className="slides"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="slides-inner" style={{ transform: `translateX(-${index * 100}%)` }}>
            {SKILLS.map((s) => (
              <div className="slide" key={s.name}>
                <div className="skill-pill">
                  <div className="skill-name">{s.name}</div>
                  <div className="skill-cat">{s.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="marquee-band">
        <div className="marquee-track" id="marquee-track">
          {marqueeItems.map((item, i) => (
            <span className="marquee-item" key={`${item}-${i}`}>
              {item}
              {i < marqueeItems.length - 1 && <span className="marquee-dot"> ✦ </span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
