import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { LoginScreen, type Account } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import Board from './components/TaskBoard/Board';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import React from 'react';



export const AppContent = ({ screen, setScreen }: { screen: 'login' | 'signup', setScreen: React.Dispatch<React.SetStateAction<'login' | 'signup'>> }) => {
  const { user, logout, loading } = useAuth() as any;

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800">Loading...</div>;

  if (!user) {
    if (screen === 'signup') return <SignUpScreen onSwitch={() => setScreen('login')} />;
    return <LoginScreen onSwitch={() => setScreen('signup')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <button onClick={logout} className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg">
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>

        <Board user={user as any} />
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<'login' | 'signup'>('login');

  return (
    <AuthProvider>
      <AppContent screen={screen} setScreen={setScreen} />
    </AuthProvider>
  );
}
