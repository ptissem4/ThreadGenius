import React from 'react';
import type { ScheduledPost, SocialAccount } from '../types';

interface ScheduledPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: ScheduledPost;
  account: SocialAccount | null;
  onDelete: (postId: string) => void;
}

export const ScheduledPostModal: React.FC<ScheduledPostModalProps> = ({ isOpen, onClose, post, account, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl m-4 border border-gray-700 transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white" id="modal-title">
            Détails de la publication
          </h3>
          <p className="text-sm text-gray-400">
            Planifié pour le {new Date(post.scheduledAt).toLocaleString('fr-FR')} sur {account?.handle || 'Compte supprimé'}
          </p>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
            <h4 className="font-semibold text-purple-300 mb-2">Sujet : {post.thread.topic}</h4>
            <div className="space-y-4">
                {post.thread.posts.map((p, index) => (
                    <div key={index} className="bg-gray-900/70 p-4 rounded-lg border border-gray-700">
                        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{p.content}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-gray-900/50 px-6 py-4 rounded-b-2xl flex justify-end items-center space-x-3">
          <button
            type="button"
            className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={onClose}
          >
            Fermer
          </button>
           <button
            type="button"
            className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-sm font-medium text-white hover:bg-red-700"
            onClick={() => onDelete(post.id)}
          >
            Supprimer la planification
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