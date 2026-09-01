import { BookOpen, ArrowUp, Globe } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        
        {/* Colonne Marque & Mission */}
        <div className="footer-brand">
          <div className="footer-logo">
            <BookOpen size={22} className="brand-icon" />
            <span>Aprenda Francês</span>
          </div>
          <p>
            A plataforma de aprendizado desenhada exclusivamente para lusófonos falarem francês com clareza e confiança.
          </p>
        </div>

        {/* Navigation Rapide */}
        <nav className="footer-links" aria-label="Navegação do rodapé">
          <a href="#features">Método</a>
          <a href="#audience">Para Quem É</a>
          <a href="#signup-section">Garantir Vaga</a>
        </nav>

        {/* Bouton Retour en Haut */}
        <button 
          onClick={scrollToTop} 
          className="scroll-top-btn" 
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <ArrowUp size={18} />
        </button>

      </div>

      {/* Barre de Copyright de bas de page */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright">
            © {new Date().getFullYear()} Aprenda Francês. Todos os direitos reservados.
          </p>
          <div className="culture-badge">
            <Globe size={14} />
            <span>França • Brasil • Países Lusófonos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}