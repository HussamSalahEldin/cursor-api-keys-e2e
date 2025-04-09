'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import ApiKeysTable from '@/components/ApiKeysTable';
import CreateKeyModal from '@/components/modals/CreateKeyModal';
import EditKeyModal from '@/components/modals/EditKeyModal';
import { apiKeyService } from '@/services/apiKeyService';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(new Set());

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const data = await apiKeyService.fetchApiKeys();
      setApiKeys(data);
    } catch (error) {
      console.error('Error loading API keys:', error);
      toast.error('Failed to load API keys');
    }
  };

  const handleCreateKey = async (keyData) => {
    setIsLoading(true);
    try {
      const newKey = await apiKeyService.createApiKey(keyData);
      setApiKeys([newKey, ...apiKeys]);
      setShowCreateModal(false);
      toast.success('API key created successfully');
    } catch (error) {
      console.error('Error creating API key:', error);
      toast.error('Failed to create API key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditKey = async (updates) => {
    setIsLoading(true);
    try {
      const updatedKey = await apiKeyService.updateApiKey(updates.id, updates);
      setApiKeys(apiKeys.map(key => key.id === updates.id ? updatedKey : key));
      setShowEditModal(false);
      toast.success('API key updated successfully');
    } catch (error) {
      console.error('Error updating API key:', error);
      toast.error('Failed to update API key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteKey = async (id) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      try {
        await apiKeyService.deleteApiKey(id);
        setApiKeys(apiKeys.filter(key => key.id !== id));
        toast.success('API key deleted successfully');
      } catch (error) {
        console.error('Error deleting API key:', error);
        toast.error('Failed to delete API key');
      }
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const handleToggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-900 transition-colors">Dandi Dashboard</Link>
            <span>/</span>
            <span className="text-gray-900">API Keys</span>
          </nav>

          {/* Header Section */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
            <div className="flex justify-between items-start">
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-blue-100 mb-2">CURRENT PLAN</div>
                  <h1 className="text-4xl font-bold mb-2">Researcher</h1>
                  <p className="text-blue-100">Manage your API keys and usage limits</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">API Usage</span>
                      <span className="text-blue-200 hover:text-white cursor-help transition-colors" title="Monthly API usage">ⓘ</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-64 bg-blue-400/30 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-white rounded-full transition-all duration-500"></div>
                      </div>
                      <span className="text-sm font-medium">0/1,000 Credits</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-200"></div>
                    <span className="text-sm">Pay as you go</span>
                    <span className="text-blue-200 hover:text-white cursor-help transition-colors" title="Charges apply only for what you use">ⓘ</span>
                  </div>
                </div>
              </div>
              
              <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                Manage Plan
              </button>
            </div>
          </div>

          {/* API Keys Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage authentication keys for your API requests
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <span className="text-lg">+</span>
                  Create Key
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <ApiKeysTable
                apiKeys={apiKeys}
                visibleKeys={visibleKeys}
                onToggleVisibility={handleToggleKeyVisibility}
                onCopy={handleCopyKey}
                onEdit={(key) => {
                  setEditingKey(key);
                  setShowEditModal(true);
                }}
                onDelete={handleDeleteKey}
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need help?</h3>
              <p className="text-gray-500 mb-4">We are here to help you with any questions you have</p>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateKeyModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateKey}
          isLoading={isLoading}
        />
      )}

      {showEditModal && editingKey && (
        <EditKeyModal
          apiKey={editingKey}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditKey}
          isLoading={isLoading}
        />
      )}
    </div>
  );
} 
