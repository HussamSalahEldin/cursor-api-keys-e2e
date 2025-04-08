'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function TestConnection() {
  const [status, setStatus] = useState('Testing connection...');
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function testConnection() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        setDetails({
          url: supabaseUrl || 'Not set',
          hasKey: hasAnonKey ? 'Yes' : 'No'
        });

        if (!supabaseUrl || !hasAnonKey) {
          throw new Error('Missing Supabase configuration. Check your .env.local file.');
        }

        // Test the connection with a simple query
        const { data, error } = await supabase
          .from('api_keys')
          .select('count')
          .limit(1);

        if (error) {
          throw error;
        }

        setStatus('Connection successful!');
      } catch (error) {
        console.error('Connection error details:', error);
        setStatus(`Connection failed: ${error.message || 'Unknown error'}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow m-4">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Test</h2>
      <div className="space-y-2">
        <p className="text-sm"><strong>Status:</strong> <span className={status.includes('failed') ? 'text-red-500' : 'text-green-500'}>{status}</span></p>
        <p className="text-sm"><strong>Supabase URL:</strong> {details.url}</p>
        <p className="text-sm"><strong>Anon Key Present:</strong> {details.hasKey}</p>
        <p className="text-xs text-gray-500 mt-2">
          Make sure your .env.local file contains valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY values.
        </p>
      </div>
    </div>
  );
} 