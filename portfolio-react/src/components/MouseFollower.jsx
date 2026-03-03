import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useAnimations';
import './MouseFollower.css';

function MouseFollower() {
  const mousePosition = useMousePosition();
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (cursorRef.current && followerRef.current) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
      
      setTimeout(() => {
        if (followerRef.current) {
          followerRef.current.style.left = `${mousePosition.x}px`;
          followerRef.current.style.top = `${mousePosition.y}px`;
        }
      }, 100);
    }
  }, [mousePosition]);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
}

export default MouseFollower;
