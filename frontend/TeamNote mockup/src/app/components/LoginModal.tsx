import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import type { Account } from './LoginScreen';

interface Props {
  isOpen: boolean;
  account: Account | null;
  onCancel: () => void;
  onSuccess: (account: Account) => void;
}

export function LoginModal({ isOpen, account, onCancel, onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  if (!isOpen || !account) return null;

  const handleLogin = () => {
    // Mock validation: allow admin123 or matching stored password
    const stored = (() => {
      try { return atob(account.password); } catch { return ''; }
    })();
    if (!password) { setError('Enter a password'); return; }
    if (password !== 'admin123' && password !== stored) { setError('Incorrect password'); return; }
    setError('');
    onSuccess(account);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Login</h3>
          <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100"><X /></button>
        </div>

        <div className="mb-3">
          <label className="text-sm text-gray-600">Username</label>
          <input className="w-full mt-1 rounded-md border px-3 py-2 bg-gray-100" value={account.name} disabled />
        </div>

        <div className="mb-2 relative">
          <label className="text-sm text-gray-600">Password</label>
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 size-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-3 py-2 rounded-md border mt-1"
            placeholder="Enter password"
          />
        </div>

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200">Cancel</button>
          <button onClick={handleLogin} className="px-4 py-2 rounded-md bg-amber-500 text-white">Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
