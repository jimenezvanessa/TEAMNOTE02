import React from 'react';
import type { Account } from '../LoginScreen';

export function BoardHeader({ user }: { user: Account }) {
  const isLeader = user.role === 'leader';
  return (
    <div className="flex items-center justify-between bg-amber-100/90 rounded-lg p-4 mb-6 border-2 border-amber-300 shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow ${isLeader ? 'bg-purple-600' : 'bg-blue-600'}`}>
          {user.avatar}
        </div>
        <div>
          <div className="text-sm text-amber-700">Logged in as</div>
          <div className="font-semibold text-amber-900">{user.name} <span className="text-xs text-amber-700">({isLeader ? 'Team Leader' : 'Team Member'})</span></div>
        </div>
      </div>
    </div>
  );
}

export default BoardHeader;
