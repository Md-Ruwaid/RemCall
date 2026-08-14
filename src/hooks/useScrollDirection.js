import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      
      setIsAtTop(scrollY < 10);

      const diff = scrollY - lastScrollY;
      if (Math.abs(diff) > 5) {
        const direction = diff > 0 ? 'down' : 'up';
        setScrollDirection(direction);
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return { scrollDirection, isAtTop };
}
