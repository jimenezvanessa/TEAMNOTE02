import { useState, useEffect } from 'react';
import { StickyNote, UserCircle2, Users } from 'lucide-react';
import AccountCard from './AccountCard';
import LoginModal from './LoginModal';
import { useAuth } from '../contexts/AuthContext';
import type { User } from '../contexts/AuthContext';

export type Account = User & { avatar: string };

interface LoginScreenProps {
  onSwitch?: () => void;
}

export function LoginScreen({ onSwitch }: LoginScreenProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { getUsers } = useAuth();

  // Fetch accounts safely
  const refreshAccounts = async () => {
    try {
      const [leaders, members] = await Promise.all([
        getUsers('leader'), // ✅ fixed role
        getUsers('member'),
      ]);

      const addAvatar = (users: User[]) =>
        users.map((u) => ({
          ...u,
          avatar: u.name?.charAt(0)?.toUpperCase() || '?',
        }));

      setAccounts([...addAvatar(leaders), ...addAvatar(members)]);
    } catch (err) {
      console.error('Failed to fetch accounts:', err);
      setAccounts([]);
    }
  };

  useEffect(() => {
    refreshAccounts();
  }, []);

  const leaders = accounts.filter((a) => a.role === 'leader');
  const members = accounts.filter((a) => a.role === 'member');

  const handleAccountClick = (account: Account) => {
    setSelectedAccount(account);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setSelectedAccount(null);
    refreshAccounts();
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

          {/* Leaders */}
          <div className="bg-amber-100/90 rounded-xl shadow-xl p-6 border-4 border-amber-300">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-300">
              <Users className="size-6 text-amber-900" />
              <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Team Leaders
              </h2>
            </div>
            <div className="space-y-3">
              {leaders.map(account => (
                <AccountCard
                  key={account._id}
                  account={account}
                  onClick={handleAccountClick}
                />
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="bg-amber-100/90 rounded-xl shadow-xl p-6 border-4 border-amber-300">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-amber-300">
              <UserCircle2 className="size-6 text-amber-900" />
              <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Team Members
              </h2>
            </div>
            <div className="space-y-3">
              {members.map(account => (
                <AccountCard
                  key={account._id}
                  account={account}
                  onClick={handleAccountClick}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          account={selectedAccount}
          onCancel={() => {
            setShowLoginModal(false);
            setSelectedAccount(null);
          }}
          onSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
}