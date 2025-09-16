import React, { useState } from 'react';
import { type GeneratedThread, type SocialAccount } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (scheduledAt: string, accountIds: string[], autoPost: boolean) => void;
  thread: GeneratedThread | null;
  accounts: SocialAccount[];
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSchedule, thread, accounts }) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now.setSeconds(0);
  now.setMilliseconds(0);
  const defaultDateTime = now.toISOString().slice(0, 16);

  const [scheduledAt, setScheduledAt] = useState(defaultDateTime);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [autoPost, setAutoPost] = useState(false);

  if (!isOpen || !thread) {
    return null;
  }

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccountIds(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const handleSchedule = () => {
    if (selectedAccountIds.length === 0) {
      alert("Veuillez sélectionner au moins un compte social.");
      return;
    }
    onSchedule(new Date(scheduledAt).toISOString(), selectedAccountIds, autoPost);
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
          <div className="flex items-center mb-6">
             <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-600/20 border border-purple-500">
                <CalendarIcon className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4 text-left">
                 <h3 className="text-xl font-bold text-white" id="modal-title">
                    Planifier la publication
                </h3>
                <p className="text-sm text-gray-400">Choisissez quand et où ce thread sera publié.</p>
            </div>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-md mb-6 border border-gray-700">
            <p className="text-sm text-gray-400 font-medium">Aperçu du thread :</p>
            <p className="text-white mt-1 truncate">"{thread.topic}"</p>
          </div>
          
          <div className="space-y-4">
            <div>
                <label htmlFor="datetime" className="block text-sm font-medium text-gray-300 mb-2">Date et heure</label>
                <input 
                    type="datetime-local" 
                    id="datetime" 
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
                />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Comptes Sociaux</label>
                <div className="space-y-2 max-h-32 overflow-y-auto p-3 bg-gray-700/50 rounded-md border border-gray-600">
                    {accounts.length > 0 ? (
                        accounts.map((acc) => (
                           <label key={acc.id} className="flex items-center cursor-pointer">
                               <input
                                   id={`acc-${acc.id}`}
                                   type="checkbox"
                                   checked={selectedAccountIds.includes(acc.id)}
                                   onChange={() => handleAccountToggle(acc.id)}
                                   className="h-4 w-4 rounded border-gray-500 bg-gray-600 text-purple-600 focus:ring-purple-600"
                               />
                               <span className="ml-3 text-sm text-gray-300">
                                   {acc.handle} <span className="text-gray-400">({acc.platform})</span>
                               </span>
                           </label>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Aucun compte ajouté. Allez dans les paramètres.</p>
                    )}
                </div>
             </div>
             <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                    <input
                        id="auto-post"
                        aria-describedby="auto-post-description"
                        name="auto-post"
                        type="checkbox"
                        checked={autoPost}
                        onChange={(e) => setAutoPost(e.target.checked)}
                        disabled
                        className="h-4 w-4 rounded border-gray-500 bg-gray-600 text-purple-600 focus:ring-purple-600 cursor-not-allowed"
                    />
                </div>
                <div className="ml-3 text-sm leading-6">
                    <label htmlFor="auto-post" className="font-medium text-gray-500">
                        Activer la publication automatique
                    </label>
                    <p id="auto-post-description" className="text-gray-500">
                        (Fonctionnalité Pro à venir. Nécessite une intégration backend.)
                    </p>
                </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 px-8 py-4 rounded-b-2xl sm:flex sm:flex-row-reverse">
           <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            onClick={handleSchedule}
            disabled={accounts.length === 0 || selectedAccountIds.length === 0}
          >
            Confirmer la planification
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 B24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};