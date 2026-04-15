import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  title?: string;
  onCancel: () => void;
  onConfirm: (password: string) => void;
}

export function PasswordModal({ isOpen, title = 'Confirm Deletion', onCancel, onConfirm }: Props) {
  const [password, setPassword] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100"><X /></button>
        </div>

        <p className="text-sm text-gray-700 mb-3">Enter your password to confirm deletion.</p>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 size-5" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-md border"
            placeholder="Password"
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200">Cancel</button>
          <button onClick={() => onConfirm(password)} className="px-4 py-2 rounded-md bg-red-600 text-white">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
