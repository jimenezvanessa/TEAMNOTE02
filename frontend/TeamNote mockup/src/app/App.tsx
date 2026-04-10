import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { LoginScreen, type Account } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import Board from './components/TaskBoard/Board';



export default function App() {
  const [screen, setScreen] = useState<'login' | 'signup'>('login');
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null);

  const handleLogin = (account: Account) => setCurrentAccount(account);
  const handleSignup = (account: Account) => setCurrentAccount(account);
  const handleLogout = () => setCurrentAccount(null);

  if (!currentAccount) {
    if (screen === 'signup') return <SignUpScreen onSignup={handleSignup} onSwitch={() => setScreen('login')} />;
    return <LoginScreen onLogin={handleLogin} onSwitch={() => setScreen('signup')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg">
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>

        <Board user={currentAccount} />
      </div>
    </div>
  );
}