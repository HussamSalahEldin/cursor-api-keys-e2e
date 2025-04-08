'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Protected() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Check if API key exists in session storage
    const storedApiKey = sessionStorage.getItem('apiKey');
    if (!storedApiKey) {
      toast.error('Please provide an API key');
      router.push('/playground');
      return;
    }
    setApiKey(storedApiKey);
  }, [router]);

  const handleSignOut = () => {
    sessionStorage.removeItem('apiKey');
    router.push('/playground');
  };

  if (!apiKey) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">API Playground</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to the API Playground</h2>
            <p className="text-gray-600">
              Your API key has been validated. You can now test the API endpoints.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your API Key</h3>
              <div className="font-mono text-sm bg-gray-100 p-3 rounded">
                {apiKey.slice(0, 8)}...{apiKey.slice(-8)}
              </div>
            </div>

            {/* Add your API testing interface here */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Test Endpoints</h3>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Test Endpoint 1
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Test Endpoint 2
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Test Endpoint 3
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 