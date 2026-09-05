import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { 
  Search, 
  RefreshCw, 
  Plane, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Mail, 
  Phone, 
  Calendar,
  Users,
  Loader2,
  LogOut
} from 'lucide-react';
import '../styles/AdminDashboard.css';

const objectiveIcons = {
  travel: Plane,
  work: Briefcase,
  study: GraduationCap,
  personal: Sparkles,
};

const levelLabels = {
  beginner: 'Iniciante',
  basic: 'Básico',
  intermediate: 'Intermediário',
};

const objectiveLabels = {
  travel: 'Viagem / Turismo',
  work: 'Oportunidades Profissionais',
  study: 'Estudos ou Imigração',
  personal: 'Interesse Cultural / Pessoal',
};

export default function AdminDashboard({ onNavigate }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur Supabase :', error);
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const loadLeads = async () => {
      await fetchRegistrations();
    };
    loadLeads();
  }, [fetchRegistrations]);

  // Filtrage selon recherche texte et niveau
  const filteredRegistrations = registrations.filter((item) => {
    const matchesSearch = 
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  return (
    <section className="admin-section">
      <div className="container admin-container">
        
        {/* Header aligné sur le style public */}
        <div className="admin-header">
          <div>
            <button type="button" className="admin-back-link" onClick={() => onNavigate('/')}>
              &larr; Voltar para a página inicial
            </button>
            <span className="eyebrow">Gestão de Inscritos</span>
            <h2>Painel do Administrador</h2>
            <p>Acompanhe e gerencie as pré-inscrições em tempo real.</p>
          </div>
          <div className="admin-header-actions">
            <button onClick={fetchRegistrations} className="btn-refresh" disabled={loading}>
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Atualizar
            </button>
            <button onClick={handleSignOut} className="btn-refresh" type="button">
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>

        {/* Barre de recherche & Filtres */}
        <div className="admin-controls-card">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            <button 
              className={`filter-pill ${selectedLevel === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('all')}
            >
              Todos ({registrations.length})
            </button>
            <button 
              className={`filter-pill ${selectedLevel === 'beginner' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('beginner')}
            >
              Iniciante
            </button>
            <button 
              className={`filter-pill ${selectedLevel === 'basic' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('basic')}
            >
              Básico
            </button>
            <button 
              className={`filter-pill ${selectedLevel === 'intermediate' ? 'active' : ''}`}
              onClick={() => setSelectedLevel('intermediate')}
            >
              Intermediário
            </button>
          </div>
        </div>

        {/* Cartes des inscrits */}
        {loading ? (
          <div className="admin-state-box">
            <Loader2 size={32} className="animate-spin" />
            <p>Carregando inscritos...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="admin-state-box">
            <Users size={32} />
            <p>Nenhum inscrito encontrado.</p>
          </div>
        ) : (
          <div className="admin-grid">
            {filteredRegistrations.map((item) => {
              const ObjectiveIcon = objectiveIcons[item.objective] || Sparkles;
              const formattedDate = item.created_at 
                ? new Date(item.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })
                : 'Data recente';

              return (
                <div key={item.id || item.email} className="admin-lead-card">
                  <div className="card-header-user">
                    <div className="user-avatar">
                      {item.name ? item.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className="user-details">
                      <h3>{item.name || 'Sem nome'}</h3>
                      <span className={`level-tag level-${item.level}`}>
                        {levelLabels[item.level] || item.level}
                      </span>
                    </div>
                  </div>

                  <div className="card-info-stack">
                    <div className="info-item">
                      <Mail size={16} />
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </div>

                    {item.whatsapp && (
                      <div className="info-item">
                        <Phone size={16} />
                        <a 
                          href={`https://wa.me/${item.whatsapp.replace(/\D/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                          {item.whatsapp}
                        </a>
                      </div>
                    )}

                    <div className="objective-badge">
                      <ObjectiveIcon size={16} />
                      <span>{objectiveLabels[item.objective] || item.objective}</span>
                    </div>
                  </div>

                  <div className="card-footer-date">
                    <Calendar size={14} />
                    <span>Inscrito em {formattedDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}