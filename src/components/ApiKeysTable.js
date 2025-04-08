'use client';

export default function ApiKeysTable({ 
  apiKeys, 
  visibleKeys, 
  onToggleVisibility, 
  onCopy, 
  onEdit, 
  onDelete 
}) {
  const maskApiKey = (key) => {
    const prefix = key.slice(0, 4);
    const masked = '•'.repeat(key.length - 4);
    return `${prefix}${masked}`;
  };

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">🔑</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No API keys yet</h3>
        <p className="text-gray-500 text-sm">Create your first API key to get started</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
          <th className="px-6 py-4 font-medium">NAME</th>
          <th className="px-6 py-4 font-medium">TYPE</th>
          <th className="px-6 py-4 font-medium">KEY</th>
          <th className="px-6 py-4 font-medium text-right">OPTIONS</th>
        </tr>
      </thead>
      <tbody>
        {apiKeys.map((key) => (
          <tr key={key.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4">
              <span className="font-medium text-gray-900">{key.name || 'default'}</span>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                key.type === 'production' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {key.type}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="font-mono text-sm text-gray-600 flex items-center gap-2">
                {visibleKeys.has(key.id) ? key.key : maskApiKey(key.key)}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onToggleVisibility(key.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title={visibleKeys.has(key.id) ? "Hide key" : "Show key"}
                >
                  {visibleKeys.has(key.id) ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  onClick={() => onCopy(key.key)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Copy"
                >
                  📋
                </button>
                <button
                  onClick={() => onEdit(key)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(key.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 