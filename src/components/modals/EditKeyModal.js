'use client';

import { useState, useEffect } from 'react';

export default function EditKeyModal({ apiKey, onClose, onSubmit, isLoading }) {
  const [editingKey, setEditingKey] = useState({
    ...apiKey,
    hasMonthlyLimit: apiKey.monthly_limit !== null,
    monthlyLimit: apiKey.monthly_limit || ''
  });

  const handleSubmit = () => {
    if (!editingKey.name.trim()) {
      toast.error('Please enter a key name');
      return;
    }
    onSubmit({
      id: editingKey.id,
      name: editingKey.name,
      type: editingKey.type,
      monthly_limit: editingKey.hasMonthlyLimit ? parseInt(editingKey.monthlyLimit) : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit API key</h2>
        <p className="text-sm text-gray-600 mb-6">Update the settings for this API key.</p>
        
        <div className="space-y-6">
          {/* Key Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Name <span className="text-gray-500">— A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={editingKey.name}
              onChange={(e) => setEditingKey({...editingKey, name: e.target.value})}
              placeholder="Key Name"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Key Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Type <span className="text-gray-500">— Choose the environment for this key</span>
            </label>
            <div className="space-y-2">
              <div 
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                  editingKey.type === 'production' 
                    ? 'border-2 border-blue-500 bg-blue-50' 
                    : 'border-gray-200 opacity-50'
                }`}
                onClick={() => setEditingKey({...editingKey, type: 'production'})}
              >
                <div className={editingKey.type === 'production' ? 'text-gray-900' : 'text-gray-400'}>🚀</div>
                <div className="flex-1">
                  <div className={`font-medium ${editingKey.type === 'production' ? 'text-gray-900' : 'text-gray-400'}`}>Production</div>
                  <div className={`text-sm ${editingKey.type === 'production' ? 'text-gray-600' : 'text-gray-400'}`}>Rate limited to 1,000 requests/minute</div>
                </div>
              </div>
              <div 
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                  editingKey.type === 'development' 
                    ? 'border-2 border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => setEditingKey({...editingKey, type: 'development'})}
              >
                <div>💻</div>
                <div className="flex-1">
                  <div className="font-medium">Development</div>
                  <div className="text-sm text-gray-600">Rate limited to 100 requests/minute</div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Limit */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2">
              <input
                type="checkbox"
                checked={editingKey.hasMonthlyLimit}
                onChange={(e) => setEditingKey({...editingKey, hasMonthlyLimit: e.target.checked})}
                className="rounded border-gray-300"
              />
              <span>Limit monthly usage*</span>
            </label>
            {editingKey.hasMonthlyLimit && (
              <input
                type="number"
                value={editingKey.monthlyLimit}
                onChange={(e) => setEditingKey({...editingKey, monthlyLimit: e.target.value})}
                placeholder="1000"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <p className="text-xs text-gray-500 mt-2">
              * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
} 