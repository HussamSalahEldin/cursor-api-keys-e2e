'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (data.valid) {
        toast.success('Valid API key!');
        // Store the API key in session storage
        sessionStorage.setItem('apiKey', apiKey);
        router.push('/protected');
      } else {
        toast.error('Invalid API key');
      }
    } catch (error) {
      toast.error('Error validating API key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Playground</h1>
          <p className="text-gray-600">Enter your API key to access the playground</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !apiKey.trim()}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              isLoading || !apiKey.trim()
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Validating...' : 'Access Playground'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Need an API key?{' '}
          <a href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            Get one here
          </a>
        </p>
      </div>
    </div>
  );
} 