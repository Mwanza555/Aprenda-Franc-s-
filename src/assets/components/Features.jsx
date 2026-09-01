import { 
  Zap, 
  Mic, 
  MessageSquare, 
  ShieldAlert, 
  ArrowRight
} from 'lucide-react';
import '../styles/Features.css';

const modules = [
  {
    number: '01',
    icon: Zap,
    title: 'As Pontes Linguísticas',
    text: 'Explorar as semelhanças gramaticais entre o português e o francês para acelerar a compreensão imediata.',
    tag: 'Aceleração',
  },
  {
    number: '02',
    icon: Mic,
    title: 'Pronúncia sem Segredos',
    text: 'Desbloquear sons complexos como o "u", o "e" muet e as vogais nasais com metodologias práticas e áudios.',
    tag: 'Fonética',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Francês do Dia a Dia',
    text: 'Aprender situações reais de viagem, trabalho e conversas do cotidiano para falar com total naturalidade.',
    tag: 'Prática',
  },
  {
    number: '04',
    icon: ShieldAlert,
    title: 'Armadilhas do Idioma',
    text: 'Evitar os falsos amigos e os erros mais frequentes que travam a comunicação entre os dois idiomas.',
    tag: 'Domínio',
  },
];

export default function Features() {
  return (
    <>
      {/* Section 1: Modules / Métodos (Style Process / Steps) */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-tag">O que você vai aprender</span>
            <h2>Um caminho prático para dominar o francês</h2>
            <p className="section-subtitle">
              Nossa metodologia foca na conexão direta com o português, reduzindo o tempo de aprendizado pela metade.
            </p>
          </div>

          <div className="features-timeline">
            {modules.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <article key={feature.number} className="timeline-card">
                  <div className="timeline-header">
                    <div className="timeline-icon-box">
                      <IconComponent size={22} />
                    </div>
                    <span className="module-tag">{feature.tag}</span>
                  </div>
                  <span className="step-count">Passo {feature.number}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banner Final de Conversão */}
      <section className="conversion-banner">
        <div className="container">
          <div className="conversion-inner">
            <div className="conversion-text">
              <span className="section-tag inverse">
                <Zap size={14} style={{ display: 'inline', marginRight: '4px' }} /> Vagas Limitadas
              </span>
              <h2>Pronto para começar sua jornada no francês?</h2>
              <p>Garanta seu acesso antecipado e receba todas as orientações diretamente no seu e-mail.</p>
            </div>
            <a href="#signup-section" className="btn-primary banner-btn">
              Garantir Minha Vaga Agora
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}