import { useState } from 'react';
import '../styles/Header.css';

const navItems = [
  { label: 'Método', href: '#features' },
  { label: 'Para quem', href: '#audience' },
  { label: 'Inscrição', href: '#signup-section' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        
        {/* Brand / Logo */}
        <a href="#top" className="brand" aria-label="Francês Conectado" onClick={closeMenu}>
          <span className="brand-mark">F</span>
          <span className="brand-name">Francês Conectado</span>
        </a>

        {/* Badge d'information */}
        <div className="header-badge">Inscrições Abertas</div>

        {/* Navigation Desktop & Mobile Dropdown */}
        <nav 
          className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} 
          aria-label="Menu principal"
        >
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="nav-link"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}

          {/* Bouton CTA dans le menu déroulant sur mobile */}
          <a 
            href="#signup-section" 
            className="btn-header mobile-only"
            onClick={closeMenu}
          >
            Quero me Inscrever
          </a>
        </nav>

        {/* Bouton CTA Desktop */}
        <a href="#signup-section" className="btn-header desktop-only">
          Quero me Inscrever
        </a>

        {/* Bouton Hamburger pour mobile */}
        <button 
          className={`hamburger ${isMenuOpen ? 'is-active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

      </div>
    </header>
  );
}