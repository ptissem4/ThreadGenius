import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface ApiKeyModalProps {
  onKeySubmit: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="relative bg-gray-800 rounded-2xl shadow-xl w-full max-w-md m-4 border border-gray-700">
        <form onSubmit={handleSubmit}>
          <div className="p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-600/20 border border-purple-500 mb-6">
              <SparklesIcon className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Welcome to ThreadGenius
            </h3>
            <p className="mt-4 text-gray-400">
              Please enter your Google Gemini API key to begin. Your key will be stored securely in your browser's local storage.
            </p>
          </div>
          
          <div className="px-8 pb-8 space-y-4">
             <div>
                <label htmlFor="apiKey" className="sr-only">Gemini API Key</label>
                <input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API Key..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
                    required
                />
             </div>
             <a 
                href="https://ai.google.dev/gemini-api/docs/api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-400 hover:text-purple-300"
            >
                Don't have a key? Get one here.
            </a>
          </div>

          <div className="bg-gray-900/50 px-8 py-6 rounded-b-2xl">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all disabled:opacity-50"
              disabled={!apiKey.trim()}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};