import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import Header from './assets/components/Header';
import Hero from './assets/components/Hero';
import Features from './assets/components/Features';
import SignupForm from './assets/components/SignupForm';
import Footer from './assets/components/Footer';
import AdminDashboard from './assets/components/AdminDashboard';
import AdminLogin from './assets/components/AdminLogin';
import './App.css';

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (isMounted) {
        setSession(currentSession);
        setAuthLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const navigate = (nextPath) => {
    if (nextPath === path) return;
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (path === '/admin' || path === '/admin/login') {
    if (authLoading) {
      return <div className="admin-app auth-loading">Vérification de la session...</div>;
    }

    if (!session) {
      return <AdminLogin onNavigate={navigate} />;
    }

    return <div className="admin-app"><AdminDashboard onNavigate={navigate} /></div>;
  }

  return (
    <div className="app-container">
      <Header onNavigate={navigate} />
      <main className="main-content">
        <Hero />
        <Features />
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;