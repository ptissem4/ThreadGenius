
import React, { useState } from 'react';
import { Tone, Length } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface GeneratorFormProps {
  topic: string;
  setTopic: (topic: string) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  length: Length;
  setLength: (length: Length) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGetInspiration: () => void;
  isInspirationLoading: boolean;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  topic,
  setTopic,
  tone,
  setTone,
  length,
  setLength,
  isLoading,
  onSubmit,
  onGetInspiration,
  isInspirationLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 p-1">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
          Topic / Theme
        </label>
        <textarea
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'The future of remote work' or a link to an article..."
          rows={4}
          className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
          required
        />
        <div className="mt-2">
            <button 
                type="button" 
                onClick={onGetInspiration}
                disabled={isInspirationLoading}
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center disabled:opacity-50"
            >
                <SparklesIcon className="w-4 h-4 mr-1" />
                {isInspirationLoading ? 'Getting ideas...' : 'Get inspiration'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">
            Tone / Style
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
          >
            {Object.values(Tone).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">
            Desired Length
          </label>
          <select
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value as Length)}
            className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
          >
            {Object.values(Length).map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            Generate Thread
          </>
        )}
      </button>
    </form>
  );
};
