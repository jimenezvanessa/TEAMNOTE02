import { useState, useEffect } from 'react';
import { StickyNote, UserCircle2, Users } from 'lucide-react';
import AccountCard from './AccountCard';
import PasswordModal from './PasswordModal';
import LoginModal from './LoginModal';

import type { User } from '../components/TaskBoard/types';

export type Account = User & { avatar: string; password?: string };

interface LoginScreenProps {
  onSwitch?: () => void;
}

export function LoginScreen({ onSwitch }: LoginScreenProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const refreshAccounts = () => {
    const raw = localStorage.getItem('teamnote_accounts');
    try {
      setAccounts(raw ? JSON.parse(raw) : []);
    } catch {
      setAccounts([]);
    }
  };

  useEffect(() => {
    refreshAccounts();
  }, []);

  const leaders = accounts.filter(a => a.role === 'leader');
  const members = accounts.filter(a => a.role === 'member');

  const handleRequestDelete = (account: Account) => {
    setDeleteTarget(account);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (password: string) => {
    if (!deleteTarget) return;
    // Simplified mock validation - use 'admin123'
    if (password !== 'admin123') {
      alert('Incorrect password. Try "admin123"');
      return;
    }
    const newAccounts = accounts.filter(a => a.id !== deleteTarget.id);
    localStorage.setItem('teamnote_accounts', JSON.stringify(newAccounts));
    refreshAccounts();
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (account: Account) => {
    setShowLoginModal(false);
    setSelectedAccount(null);
    // context handles state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <StickyNote className="size-12 text-yellow-300 drop-shadow-lg" />
            <h1 className="text-5xl font-bold text-yellow-100" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              TeamNote
            </h1>
          </div>
          <p className="text-xl text-yellow-200/90" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Simplicity First Task Management
          </p>
          <p className="text-sm text-yellow-200/70 mt-2">Select an account to continue</p>
        </div>

        {/* Sign Up Button */}
        {onSwitch && (
          <div className="max-w-md mx-auto mb-8">
            <button
              onClick={onSwitch}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-400 hover:to-blue-500 transition-all font-bold text-lg"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Create New Account
            </button>
          </div>
        )}

        {/* Account Selection */}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Team Leaders */}
          <div 
            className="bg-amber-100/90 rounded-xl shadow-xl p-6 border-4 border-amber-300"
            style={{ 
              boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-300">
              <Users className="size-6 text-amber-900" />
              <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Team Leaders
              </h2>
            </div>
            <div className="space-y-3">
              {leaders.map((account) => (
                <AccountCard key={account.id} account={account} onClick={handleAccountClick} onRequestDelete={handleRequestDelete} />
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div 
            className="bg-amber-100/90 rounded-xl shadow-xl p-6 border-4 border-amber-300"
            style={{ 
              boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-300">
              <UserCircle2 className="size-6 text-amber-900" />
              <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Team Members
              </h2>
            </div>
            <div className="space-y-3">
              {members.map((account) => (
                <AccountCard key={account.id} account={account} onClick={handleAccountClick} onRequestDelete={handleRequestDelete} />
              ))}
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 text-center">
          <div className="bg-amber-100/80 rounded-lg shadow-lg p-4 border-2 border-amber-300 inline-block" style={{ 
            boxShadow: '0 4px 6px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3)'
          }}>
            <p className="text-sm text-amber-900" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              <span className="font-semibold">Leaders</span> can create and manage tasks • <span className="font-semibold">Members</span> can pick and complete tasks
            </p>
          </div>
        </div>

        <PasswordModal isOpen={showDeleteModal} onCancel={() => { setShowDeleteModal(false); setDeleteTarget(null); }} onConfirm={handleConfirmDelete} />
        <LoginModal isOpen={showLoginModal} account={selectedAccount} onCancel={() => { setShowLoginModal(false); setSelectedAccount(null); }} onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
