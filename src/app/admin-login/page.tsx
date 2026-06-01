'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') ?? '/admin';

  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Redirect with ?admin=password — middleware sets the cookie
    const target = new URL(from, window.location.origin);
    target.searchParams.set('admin', password);

    // Briefly attempt the URL; if middleware rejects (wrong password),
    // it'll redirect back to this page.
    router.push(target.toString());

    // Give middleware a moment — if we're still here after 1.5s, password was wrong
    await new Promise((r) => setTimeout(r, 1500));
    setError('Incorrect password. Try again.');
    setLoading(false);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#1B2A4A] flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#F5A623]" />
          </div>
          <div>
            <p className="font-black text-[#1B2A4A] text-base leading-none">Admin Access</p>
            <p className="text-gray-400 text-xs mt-0.5">Houston Handy Pros</p>
          </div>
        </div>

        <h1 className="text-xl font-black text-[#1B2A4A] mb-1">Sign In</h1>
        <p className="text-gray-500 text-sm mb-6">Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#1B2A4A] text-white font-black py-3 rounded-xl hover:bg-[#2d3f6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying…' : 'Access Dashboard'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          Sessions expire after 8 hours for security.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
