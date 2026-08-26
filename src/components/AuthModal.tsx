import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, AlertCircle, CheckCircle2, X, ArrowRight, Cloud, ShieldCheck } from 'lucide-react';
import { loginWithGoogle, loginWithEmail, registerWithEmail } from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: FirebaseUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setError(err?.message || 'Google Login fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Bitte gib deine E-Mail-Adresse und dein Passwort ein.');
      return;
    }
    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let user: FirebaseUser;
      if (isRegister) {
        user = await registerWithEmail(email, password, displayName);
      } else {
        user = await loginWithEmail(email, password);
      }
      onSuccess(user);
      onClose();
    } catch (err: any) {
      console.error('Email Auth Error:', err);
      let msg = 'Authentifizierung fehlgeschlagen.';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'Diese E-Mail-Adresse wird bereits verwendet. Bitte logge dich ein.';
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        msg = 'Ungültige E-Mail-Adresse oder falsches Passwort.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Bitte gib eine gültige E-Mail-Adresse ein.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="auth-modal-card"
        className="w-full max-w-md bg-white rounded-3xl border border-[#E5DCCF] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors"
          aria-label="Schließen"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-2xl mx-auto shadow-xs">
            🦊
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E2433] tracking-tight">
            {isRegister ? 'Konto erstellen' : 'Willkommen zurück'}
          </h2>
          <p className="text-xs sm:text-sm text-[#78716C] max-w-xs mx-auto">
            Sichere deine Tagesreisen, XP und Auswertungen geräteübergreifend in der Cloud.
          </p>
        </div>

        {/* Google One-Click Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-stone-50 text-[#1E2433] font-bold text-sm border-2 border-stone-200 hover:border-stone-300 shadow-xs transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Mit Google fortfahren</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-stone-200" />
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Oder mit E-Mail</span>
            <div className="h-px flex-1 bg-stone-200" />
          </div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3.5">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#57534E] block">Name (optional)</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Dein Vorname"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#57534E] block">E-Mail-Adresse</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="name@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#57534E] block">Passwort</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Mindestens 6 Zeichen"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-[#1E2433] focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isRegister ? 'Konto registrieren' : 'Jetzt einloggen'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Login / Register */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-xs text-orange-600 hover:text-orange-700 font-bold underline decoration-dotted"
          >
            {isRegister
              ? 'Bereits ein Konto? Hier anmelden'
              : 'Neu hier? Kostenloses Konto erstellen'}
          </button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verschlüsselt & DSGVO-konform via Google Cloud Firestore</span>
        </div>
      </div>
    </div>
  );
};
