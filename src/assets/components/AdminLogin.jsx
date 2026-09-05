import { useState } from 'react';
import { ArrowLeft, LockKeyhole, LogIn, Loader2, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import '../styles/AdminLogin.css';

export default function AdminLogin({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage('Identifiants invalides ou compte non autorisé.');
    }

    setLoading(false);
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <button type="button" className="admin-login-back" onClick={() => onNavigate('/')}>
          <ArrowLeft size={16} /> Retour à l’accueil
        </button>
        <div className="admin-login-icon"><LockKeyhole size={24} /></div>
        <span className="eyebrow">Accès privé</span>
        <h1 id="admin-login-title">Connexion administrateur</h1>
        <p>Connectez-vous pour consulter les pré-inscriptions.</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label htmlFor="admin-email">E-mail</label>
          <div className="admin-login-input">
            <Mail size={17} />
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <label htmlFor="admin-password">Mot de passe</label>
          <div className="admin-login-input">
            <LockKeyhole size={17} />
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="admin-login-error" role="alert">{errorMessage}</p>}

          <button type="submit" className="admin-login-submit" disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </section>
    </main>
  );
}