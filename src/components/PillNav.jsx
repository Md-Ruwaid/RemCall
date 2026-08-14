import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#F5E6C8',
  pillColor = '#162C37',
  hoveredPillTextColor = '#10212A',
  pillTextColor,
  onMobileMenuClick,
  visible = true,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItemsEl = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItemsEl) {
        gsap.set(navItemsEl, { width: 0, overflow: 'hidden' });
        gsap.to(navItemsEl, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }
  }, [ease, initialLoadAnimation]);

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState && lines.length >= 2) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else if (lines.length >= 2) {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor
  };

  return (
    <div className={`pill-nav-container${!visible ? ' is-hidden' : ''}`}>
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        {logo && (
          <a
            className="pill-logo"
            href={items?.[0]?.href || '#'}
            onClick={(e) => {
              if (items?.[0]?.onClick) {
                e.preventDefault();
                items[0].onClick();
              }
            }}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={logoRef}
          >
            {typeof logo === 'string' ? (
              <img src={logo} alt={logoAlt} ref={logoImgRef} />
            ) : (
              <div ref={logoImgRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                {logo}
              </div>
            )}
          </a>
        )}

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <a
                  role="menuitem"
                  href={item.href || '#'}
                  className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                  aria-label={item.ariaLabel || item.label}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              <a
                href={item.href || '#'}
                className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
