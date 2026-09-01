import Header from './assets/components/Header';
import Hero from './assets/components/Hero';
import Features from './assets/components/Features';
import SignupForm from './assets/components/SignupForm';
import Footer from './assets/components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Hero />
        <Features />
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
}