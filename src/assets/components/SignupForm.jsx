import { useMemo, useState } from 'react';
import { 
  Plane, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Sprout, 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  Mail, 
  ArrowRight, 
  ArrowLeft,
  User,
  Phone,
  Check,
  Loader2
} from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import '../styles/SignupForm.css';

const objectiveOptions = [
  { value: 'travel', label: 'Viagem / Turismo', icon: Plane },
  { value: 'work', label: 'Oportunidades Profissionais', icon: Briefcase },
  { value: 'study', label: 'Estudos ou Imigração', icon: GraduationCap },
  { value: 'personal', label: 'Interesse Cultural / Pessoal', icon: Sparkles },
];

const levelOptions = [
  { value: 'beginner', label: 'Iniciante (Não sei nada)', icon: Sprout },
  { value: 'basic', label: 'Básico (Entendo algumas palavras)', icon: Search },
  { value: 'intermediate', label: 'Intermediário (Consigo formar frases simples)', icon: MessageCircle },
];

const steps = [
  {
    title: 'Qual é o seu objetivo principal?',
    description: 'Escolha o caminho que mais combina com você para personalizarmos sua jornada.',
  },
  {
    title: 'Qual é o seu nível atual no idioma?',
    description: 'Isso nos ajuda a criar um início mais eficiente e adaptado.',
  },
  {
    title: 'Onde devemos enviar seu acesso?',
    description: 'Digite seus dados abaixo para receber as informações da formação.',
  },
];

export default function SignupForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    objective: 'travel',
    level: 'beginner',
    name: '',
    email: '',
    whatsapp: '',
  });

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep]);

  const canContinue = () => {
    if (currentStep === 0) return Boolean(formData.objective);
    if (currentStep === 1) return Boolean(formData.level);
    if (currentStep === 2) return formData.name.trim() !== '' && formData.email.trim() !== '';
    return true;
  };

  const nextStep = () => {
    if (currentStep < 2 && canContinue()) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Insertion dans la table Supabase 
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp || null,
            objective: formData.objective,
            level: formData.level,
          },
        ]);

      if (error) {
        throw error;
      }

      // 2. Si l'enregistrement réussit
      setSubmitted(true);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans Supabase :", error);
      setErrorMessage("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const SelectedObjectiveIcon = objectiveOptions.find(i => i.value === formData.objective)?.icon || Sparkles;
  const SelectedLevelIcon = levelOptions.find(i => i.value === formData.level)?.icon || Sprout;

  return (
    <section id="signup-section" className="signup-section">
      <div className="container signup-container">
        
        {/* Header de section centré */}
        <div className="signup-header">
          <span className="eyebrow">Pré-inscrição</span>
          <h2>Seu próximo passo para falar francês com confiança</h2>
          <p>Personalize sua jornada em 3 passos simples para garantir seu acesso antecipado.</p>
        </div>

        <div className="form-card">
          {!submitted ? (
            <>
              {/* Fil d'Ariane des étapes (Stepper Architecture) */}
              <div className="stepper-nav">
                {steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className={`stepper-item ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                  >
                    <div className="step-number">
                      {idx < currentStep ? <Check size={16} /> : idx + 1}
                    </div>
                    <span className="step-label">Passo {idx + 1}</span>
                  </div>
                ))}
              </div>

              {/* Barre de progression fluide */}
              <div className="progress-bar" aria-label="Progression de l'inscription">
                <span style={{ width: `${progress}%` }} />
              </div>

              <div className="form-step-header">
                <h3>{steps[currentStep].title}</h3>
                <p>{steps[currentStep].description}</p>
              </div>

              {errorMessage && (
                <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Objectif */}
                {currentStep === 0 && (
                  <div className="choice-grid">
                    {objectiveOptions.map((option) => {
                      const IconComponent = option.icon;
                      const isSelected = formData.objective === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`choice-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, objective: option.value })}
                        >
                          <div className="icon-wrapper">
                            <IconComponent size={22} />
                          </div>
                          <span>{option.label}</span>
                          <div className="radio-indicator" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 2: Niveau */}
                {currentStep === 1 && (
                  <div className="choice-grid">
                    {levelOptions.map((option) => {
                      const IconComponent = option.icon;
                      const isSelected = formData.level === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          className={`choice-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, level: option.value })}
                        >
                          <div className="icon-wrapper">
                            <IconComponent size={22} />
                          </div>
                          <span>{option.label}</span>
                          <div className="radio-indicator" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 3: Formulaire de contact */}
                {currentStep === 2 && (
                  <div className="inputs-stack">
                    <div className="form-group">
                      <label htmlFor="name">Nome completo</label>
                      <div className="input-icon-wrapper">
                        <User className="input-icon" size={18} />
                        <input
                          id="name"
                          type="text"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Seu melhor e-mail</label>
                      <div className="input-icon-wrapper">
                        <Mail className="input-icon" size={18} />
                        <input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="whatsapp">WhatsApp / Telefone <span className="optional">(Opcional)</span></label>
                      <div className="input-icon-wrapper">
                        <Phone className="input-icon" size={18} />
                        <input
                          id="whatsapp"
                          type="tel"
                          placeholder="(00) 00000-0000"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions de navigation */}
                <div className="form-actions">
                  {currentStep > 0 && (
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      onClick={() => setCurrentStep((step) => step - 1)}
                      disabled={loading}
                    >
                      <ArrowLeft size={18} />
                      Voltar
                    </button>
                  )}

                  {currentStep < 2 ? (
                    <button 
                      type="button" 
                      className="btn-submit" 
                      onClick={nextStep} 
                      disabled={!canContinue()}
                    >
                      Continuar
                      <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="btn-submit" 
                      disabled={!canContinue() || loading}
                    >
                      {loading ? (
                        <>
                          Enviando...
                          <Loader2 size={18} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Confirmar Inscrição
                          <CheckCircle2 size={18} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            /* Ecran de succès */
            <div className="success-message">
              <div className="success-icon">
                <CheckCircle2 size={40} />
              </div>
              <h3>Inscrição realizada com sucesso!</h3>
              <p>
                Enviamos um e-mail de confirmação para <strong>{formData.email}</strong>. Verifique sua caixa de entrada para validar seu acesso.
              </p>

              <div className="email-template-box">
                <div className="email-template-header">
                  <Mail size={16} />
                  <span>Modelo do e-mail enviado</span>
                </div>
                <p><strong>Assunto:</strong> Confirmação de Inscrição: Seja bem-vindo à Formação!</p>
                <p><strong>Olá, {formData.name || 'Aluno'}!</strong></p>
                <p>Sua inscrição para a Formação de Francês para Lusófonos foi confirmada com sucesso!</p>
                
                <div className="summary-chips">
                  <span className="chip">
                    <SelectedObjectiveIcon size={14} />
                    {objectiveOptions.find((item) => item.value === formData.objective)?.label}
                  </span>
                  <span className="chip">
                    <SelectedLevelIcon size={14} />
                    {levelOptions.find((item) => item.value === formData.level)?.label}
                  </span>
                </div>

                <button type="button" className="btn-submit mini-btn">
                  CONFIRMAR MEU E-MAIL E CONTINUAR
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}