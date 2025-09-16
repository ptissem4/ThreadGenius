import React, { useState } from 'react';
import { Platform, type SocialAccount } from '../types';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (account: Omit<SocialAccount, 'id'>) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose, onAddAccount }) => {
  const [platform, setPlatform] = useState<Platform>(Platform.Twitter);
  const [handle, setHandle] = useState('');
  const [niche, setNiche] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (!handle.trim() || !niche.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    onAddAccount({ platform, handle, niche });
    setHandle('');
    setNiche('');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg m-4 border border-gray-700 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <h3 className="text-xl font-bold text-white mb-2" id="modal-title">
            Connecter un compte social
          </h3>
          <p className="text-sm text-gray-400 mb-6">Ces informations nous aideront à personnaliser les tendances pour vous.</p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-2">Plateforme</label>
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
              >
                {Object.values(Platform).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="handle" className="block text-sm font-medium text-gray-300 mb-2">Pseudo / Nom de la page</label>
              <input 
                id="handle"
                type="text"
                placeholder="Ex: @monPseudo or Ma Page Pro"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
              />
            </div>
             <div>
              <label htmlFor="niche" className="block text-sm font-medium text-gray-300 mb-2">Votre Niche / Audience</label>
              <input 
                id="niche"
                type="text"
                placeholder="Ex: IA, SaaS et Productivité"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 px-8 py-4 rounded-b-2xl sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleSubmit}
          >
            Connecter le compte
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 px-4 py-2 bg-transparent text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};