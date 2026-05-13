'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { useAppContext } from '@/context/AppContext';

export default function ResumeApplicationPage() {
  const router = useRouter();
  const { restoreApplication } = useAppContext();
  
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRestore = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !accessCode.trim()) {
      setError('Please provide both your email address and your 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    const result = await restoreApplication(email, accessCode);
    setIsLoading(false);

    if (result.success) {
      // Route perfectly back to the main flow wrapper which dynamically determines routing step via context state
      router.push('/apply/personal'); 
    } else {
      setError(result.error || 'Invalid access code. Please confirm your 6-digit code and try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 px-8 md:px-20 max-w-xl mx-auto w-full">
      <div className="w-full bg-white rounded-lg p-10 shadow-xl border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-full text-secondary-blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-primary-blue mb-3">
          Continue your <span className="text-accent-blue">application.</span>
        </h1>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed font-medium">
          Enter the email address you used to start your application along with the 6-digit verification code sent to your inbox.
        </p>

        <form onSubmit={handleRestore} className="space-y-6">
          <div>
            <InputField
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-primary-blue mb-2 block">
              Verification code
            </label>
            <input
              type="text"
              maxLength={6}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 123456"
              className="w-full px-4 py-3 rounded border border-gray-300 font-mono text-lg text-gray-800 tracking-widest outline-none transition-all focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 p-3 rounded border border-red-100">
              <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] flex-none font-bold mt-0.5">
                !
              </div>
              <span className="text-xs text-red-600 font-bold leading-relaxed">{error}</span>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-sm text-secondary-blue font-bold hover:underline w-full sm:w-auto text-center order-2 sm:order-1"
            >
              Back to start
            </button>
            <Button
              type="submit"
              className="w-full sm:w-auto min-w-[160px] order-1 sm:order-2"
              loading={isLoading}
              disabled={isLoading}
            >
              Continue application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
