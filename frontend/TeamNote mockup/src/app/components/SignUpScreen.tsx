import { useState } from 'react';
import { UserCircle2, Mail, Lock, Users, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export interface SignUpScreenProps {
  onSwitch: () => void;
}

export function SignUpScreen({ onSwitch }: SignUpScreenProps) {
  const { register } = useAuth() as any;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'leader' | 'member'>('member');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (name.trim() && email.trim()) {
      try {
        // Call register function from auth context with individual parameters
        await register(name.trim(), email.trim(), password, role);
        
        // Clear form after successful signup
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Switch to login screen after successful signup
        onSwitch();
      } catch (error) {
        alert('Failed to create account. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <UserCircle2 className="size-12 text-yellow-300 drop-shadow-lg" />
            <h1 className="text-4xl font-bold text-yellow-100" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Join TeamNote
            </h1>
          </div>
          <p className="text-lg text-yellow-200/90" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Create your account
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="bg-amber-100/90 rounded-xl shadow-xl p-8 border-4 border-amber-300"
          style={{ 
            boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
          }}
        >
          {/* Switch to Login Button */}
          <button
            onClick={onSwitch}
            className="flex items-center gap-2 w-full mb-6 p-3 bg-white/50 hover:bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-amber-300 text-amber-900 text-sm font-medium"
          >
            <ArrowLeft className="size-4" />
            Already have an account? Sign in
          </button>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-4 rounded-lg border-2 border-amber-300 focus:border-amber-400 bg-white shadow-md focus:shadow-lg transition-all text-amber-900"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 size-5" />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-amber-300 focus:border-amber-400 bg-white shadow-md focus:shadow-lg transition-all text-amber-900"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 size-5" />
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-amber-300 focus:border-amber-400 bg-white shadow-md focus:shadow-lg transition-all text-amber-900"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 size-5" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-amber-300 focus:border-amber-400 bg-white shadow-md focus:shadow-lg transition-all text-amber-900"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Role
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 size-5" />
                <select
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-amber-300 focus:border-amber-400 bg-white shadow-md focus:shadow-lg transition-all text-amber-900 appearance-none"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'leader' | 'member')}
                  required
                >
                  <option value="member">Team Member</option>
                  <option value="leader">Team Leader</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 px-6 py-4 rounded-lg shadow-lg hover:shadow-xl hover:from-amber-400 hover:to-amber-500 transition-all font-bold text-lg"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-yellow-200/70" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

