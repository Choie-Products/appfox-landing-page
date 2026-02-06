'use client';

import { useState, FormEvent } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error);
        setState('idle');
        return;
      }

      setMessage(data.message);
      setState('success');
    } catch {
      setMessage('Something went wrong. Please try again.');
      setState('idle');
    }
  }

  if (state === 'success') {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-900">
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-lg font-medium">{message}</span>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full sm:flex-1 px-5 py-3 rounded-full border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full sm:w-auto px-7 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      {message && state === 'idle' && (
        <p className="text-sm text-red-500 mt-3 text-center">{message}</p>
      )}
    </div>
  );
}
