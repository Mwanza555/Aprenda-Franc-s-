import { useState, useEffect } from 'react';
import '../styles/Hero.css';

// Exemples de règles de conversion PT -> FR
const wordPairs = [
  { pt: 'Informação', fr: 'Information', rule: '-ção ➔ -tion' },
  { pt: 'Possibilidade', fr: 'Possibilité', rule: '-dade ➔ -té' },
  { pt: 'Futuro', fr: 'Futur', rule: '-o ➔ e silencieux' },
  { pt: 'Simplicidade', fr: 'Simplicité', rule: '-dade ➔ -té' },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotation automatique toutes les 3.5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % wordPairs.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const current = wordPairs[currentIndex];

  const scrollToForm = () => {
    document.getElementById('signup-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        
        {/* Colonne de gauche : Offre & CTA */}
        <div className="hero-content">
          <span className="badge">🇧🇷 🇵🇹 Francês Conectado</span>
          <h1>Aprenda francês a partir do português de forma simples, prática e definitiva.</h1>
          <p>
            Uma formação criada exclusivamente para lusófonos. Domine a pronúncia, supere os falsos amigos e fale com confiança.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToForm}>
              Garantir Minha Vaga
            </button>
            <span className="hero-trust">Confirmação imediata por e-mail após a inscrição.</span>
          </div>
        </div>

        {/* Colonne de droite : Widget interactif de pont linguistique */}
        <div className="hero-visual">
          <div className="hero-widget">
            
            <div className="widget-header">
              <span className="live-badge"> Ponte Linguística</span>
              <span className="similarity-tag">85% de Semelhança</span>
            </div>

            <div className="word-comparator">
              {/* Mot Portugais */}
              <div className="lang-box">
                <span className="lang-flag">🇧🇷</span>
                <span className="lang-label">Em Português</span>
                <p className="lang-word">{current.pt}</p>
              </div>

              {/* Regle de transformation */}
              <div className="transformation-rule">
                <span className="rule-badge">{current.rule}</span>
                <span className="arrow-icon">➔</span>
              </div>

              {/* Mot Français */}
              <div className="lang-box">
                <span className="lang-flag">🇫🇷</span>
                <span className="lang-label">Em Francês</span>
                <p className="lang-word">{current.fr}</p>
              </div>
            </div>

            {/* Note pédagogique */}
            <div className="widget-footer">
              <p>
                <strong>Você sabia?</strong> Milhares de palavras seguem este mesmo padrão no francês.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}