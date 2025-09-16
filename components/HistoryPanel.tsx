
import React from 'react';
import type { GeneratedThread } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedThread[];
  onLoadHistory: (thread: GeneratedThread) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose, history, onLoadHistory }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-900 border-l border-gray-700 shadow-xl transform transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full md:w-1/3 lg:w-1/4`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-xl font-bold">Generation History</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No history yet. Generate a thread to see it here.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="bg-gray-800 p-3 rounded-md border border-gray-700">
                <p className="font-semibold truncate text-white">{item.topic}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.createdAt).toLocaleString()} | {item.platform}
                </p>
                 <button 
                  onClick={() => onLoadHistory(item)}
                  className="mt-2 text-sm text-purple-400 hover:text-purple-300"
                >
                  Load
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
