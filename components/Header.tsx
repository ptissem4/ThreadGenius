import React from 'react';
import { FREE_GENERATIONS_LIMIT } from '../constants';
import { CalendarIcon } from './icons/CalendarIcon';
import { SettingsIcon } from './icons/SettingsIcon';

interface HeaderProps {
  generationsLeft: number;
  onUpgradeClick: () => void;
  onHistoryClick: () => void;
  onCalendarClick: () => void;
  onSettingsClick: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ generationsLeft, onUpgradeClick, onHistoryClick, onCalendarClick, onSettingsClick, onLogoClick }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 z-20">
      <h1 onClick={onLogoClick} className="text-2xl font-bold text-white tracking-tight cursor-pointer">
        Thread<span className="text-purple-400">Genius</span>
      </h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="hidden md:block text-sm text-gray-400">
            <span className="font-semibold text-white">{generationsLeft}</span> / {FREE_GENERATIONS_LIMIT} generations left
        </div>
        <button 
          onClick={onCalendarClick}
          className="px-3 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <CalendarIcon className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Calendrier</span>
        </button>
         <button 
          onClick={onSettingsClick}
          className="px-3 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <SettingsIcon className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Paramètres</span>
        </button>
        <button 
          onClick={onHistoryClick}
          className="px-3 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors hidden md:block"
        >
          History
        </button>
        <button 
          onClick={onUpgradeClick}
          className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Upgrade
        </button>
      </div>
    </header>
  );
};