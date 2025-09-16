import React, { useState } from 'react';
import type { GeneratedThread } from '../types';
import { Platform } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface ThreadPreviewProps {
  thread: GeneratedThread | null;
  onSchedule: (thread: GeneratedThread) => void;
}

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="absolute top-3 right-3 p-1.5 bg-gray-700/50 rounded-md text-gray-400 hover:text-white hover:bg-gray-600/50 transition">
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
        </button>
    );
};

export const ThreadPreview: React.FC<ThreadPreviewProps> = ({ thread, onSchedule }) => {
  const [activePlatform, setActivePlatform] = useState<Platform>(Platform.Twitter);

  const formatContent = (content: string, platform: Platform, index: number, total: number) => {
    switch (platform) {
      case Platform.Twitter:
        return `${content} (${index + 1}/${total})`;
      case Platform.LinkedIn:
      case Platform.Facebook:
      case Platform.Instagram:
        return content.replace(/\n/g, '\n\n');
      case Platform.Threads:
        return content;
      default:
        return content;
    }
  };

  if (!thread) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700 text-center p-8">
        <SparklesIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300">Your thread will appear here</h3>
        <p className="text-gray-500 mt-2">Fill out the details on the left and click "Generate Thread" to get started.</p>
      </div>
    );
  }

  const totalPosts = thread.posts.length;

  return (
    <div className="w-full h-full bg-gray-800 rounded-lg p-6 flex flex-col">
      <div className="flex border-b border-gray-700 mb-4 overflow-x-auto">
        {Object.values(Platform).map((platform) => (
          <button
            key={platform}
            onClick={() => setActivePlatform(platform)}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activePlatform === platform
                ? 'border-b-2 border-purple-400 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      <div className="space-y-4 flex-grow overflow-y-auto pr-2">
        {thread.image && (
          <div className="mb-4 rounded-lg overflow-hidden border border-gray-700">
             <img src={thread.image} alt="Associated visual" className="w-full h-auto object-cover" />
          </div>
        )}
        {thread.posts.map((post, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-lg relative border border-gray-700">
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {formatContent(post.content, activePlatform, index, totalPosts)}
            </p>
            <CopyButton textToCopy={formatContent(post.content, activePlatform, index, totalPosts)} />
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <button
          onClick={() => onSchedule(thread)}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          Planifier le Thread
        </button>
      </div>
    </div>
  );
};