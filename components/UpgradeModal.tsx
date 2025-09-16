import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { CheckIcon } from './icons/CheckIcon';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-gray-800 rounded-2xl shadow-xl w-full max-w-md m-4 border border-gray-700 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-600/20 border border-purple-500 mb-6">
            <SparklesIcon className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white" id="modal-title">
            Upgrade to ThreadGenius Pro
          </h3>
          <div className="mt-4 text-gray-400">
            <p>Unlock your full creative potential and go viral faster.</p>
          </div>
        </div>
        
        <div className="px-8 pb-8">
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300"><span className="font-semibold text-white">Unlimited Generations:</span> Create as many threads as you need.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300"><span className="font-semibold text-white">Premium Templates:</span> Access exclusive templates designed for maximum engagement.</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300"><span className="font-semibold text-white">Advanced Analytics:</span> Track your thread performance and get actionable insights.</span>
            </li>
             <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-300"><span className="font-semibold text-white">Priority Support:</span> Get faster responses from our support team.</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900/50 px-8 py-6 rounded-b-2xl">
           <button
            type="button"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all"
            onClick={onClose} // For now, it just closes the modal
          >
            Upgrade Now for $9/month
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 px-4 py-2 bg-transparent text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 sm:text-sm"
            onClick={onClose}
          >
            Maybe Later
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
