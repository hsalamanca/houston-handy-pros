'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ComingSoonForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // In production: POST to /api/waitlist or Resend audience
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-3 bg-green-500/20 border border-green-500/30 text-green-300 rounded-2xl px-6 py-4 max-w-md mx-auto">
        <CheckCircle className="w-5 h-5 shrink-0" />
        <p className="font-semibold">You&apos;re on the list! We&apos;ll email you when we launch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-[#F5A623] text-[#1B2A4A] font-black px-6 py-3 rounded-xl hover:bg-[#e8941a] transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {loading ? 'Saving…' : <>Notify Me <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}
