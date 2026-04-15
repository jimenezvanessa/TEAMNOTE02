import { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import type { Account } from './LoginScreen';
import { LoginScreen } from './LoginScreen';
import { SignUpScreen } from './SignUpScreen';

interface AuthModalProps {
  onSuccess: (account: Account) => void;
}

export function AuthModal({ onSuccess }: AuthModalProps) {
  const [screen, setScreen] = useState<'login' | 'signup'>('login');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (account: Account) => {
    setSelectedAccount(account);
  };

  const handleSignup = (account: Account) => {
    onSuccess(account);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount) return;

    if (atob(selectedAccount.password) !== password) {
      setError('Incorrect password');
      return;
    }

    setError('');
    onSuccess(selectedAccount);
  };

  if (selectedAccount) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-amber-100/90 rounded-xl shadow-2xl p-8 border-4 border-amber-300 max-w-md w-full" style={{ 
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
        }}>
          <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Enter Password
          </h2>
          <p className="text-lg text-amber-800 mb-6 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            {selectedAccount.name}
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 size-5" />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-amber-300 focus:border-amber-400 bg-white shadow-md focus:shadow-lg transition-all text-amber-900"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-100 p-3 rounded-lg border border-red-300">
                <AlertCircle className="size-4" />
                {error}
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedAccount(null);
                  setPassword('');
                  setError('');
                  setScreen('login');
                }}
                className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all font-semibold"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:from-amber-400 hover:to-amber-500 transition-all font-bold flex items-center justify-center gap-2"
              >
                <ArrowRight className="size-5" />
                Enter App
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (screen === 'signup') {
    return <SignUpScreen onSignup={handleSignup} onSwitch={() => setScreen('login')} />;
  }

  return <LoginScreen onLogin={handleLogin} onSwitch={() => setScreen('signup')} />;
}
