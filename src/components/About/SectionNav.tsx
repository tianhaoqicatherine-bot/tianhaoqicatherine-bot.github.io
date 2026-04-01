'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (isMobile) {
    return (
      <nav className="section-nav-mobile" aria-label="Section navigation">
        <div className="section-nav-mobile-scroll">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`section-nav-mobile-item ${
                activeSection === section.id ? 'active' : ''
              }`}
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="section-nav-desktop" aria-label="Section navigation">
      <div className="section-nav-desktop-inner">
        <h3 className="section-nav-title">个人介绍</h3>
        <ul className="section-nav-list">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`section-nav-link ${
                  activeSection === section.id ? 'active' : ''
                }`}
                onClick={() => scrollToSection(section.id)}
                aria-current={activeSection === section.id ? 'true' : undefined}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
