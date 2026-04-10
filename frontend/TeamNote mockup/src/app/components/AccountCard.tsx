import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Account } from './LoginScreen';

interface Props {
  account: Account;
  onClick: (account: Account) => void;
  onRequestDelete: (account: Account) => void;
}

export function AccountCard({ account, onClick, onRequestDelete }: Props) {
  return (
    <div
      onClick={() => onClick(account)}
      className="w-full flex items-center gap-3 p-4 bg-white hover:bg-yellow-50 rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-amber-400 group relative cursor-pointer"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${account.role === 'leader' ? 'from-purple-500 to-purple-700' : 'from-blue-500 to-blue-700'} rounded-full flex items-center justify-center text-white font-bold shadow-md text-lg`}>
        {account.avatar}
      </div>
      <div className="flex-1 text-left">
        <p className="font-semibold text-gray-900 group-hover:text-amber-900 transition-colors" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{account.name}</p>
        <p className="text-xs text-gray-600">{account.role === 'leader' ? 'Team Leader' : 'Team Member'}</p>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
        <button
          onClick={(e) => { e.stopPropagation(); onRequestDelete(account); }}
          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all rounded-full"
          title="Delete account"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default AccountCard;
