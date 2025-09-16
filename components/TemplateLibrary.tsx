import React, { useState } from 'react';
import type { TrendingPost, SocialAccount } from '../types';
import { getTrendingPosts } from '../services/geminiService';
import { TrendingIcon } from './icons/TrendingIcon';
import { TrendingPostCard } from './TrendingPostCard';

interface TemplateLibraryProps {
  onSelectPostContent: (content: string) => void;
  accounts: SocialAccount[];
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectPostContent, accounts }) => {
  const [category, setCategory] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [posts, setPosts] = useState<TrendingPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchPosts = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim()) {
      setError("Veuillez entrer une catégorie.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setPosts([]);
    try {
      const selectedAccount = accounts.find(acc => acc.id === selectedAccountId);
      const fetchedPosts = await getTrendingPosts(category, selectedAccount);
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-800 p-4 rounded-lg border border-gray-700 animate-pulse">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
            <div className="flex-grow">
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  const renderResults = () => {
    if (posts.length === 0) {
      return (
        <div className="text-center text-gray-500 p-4 border-2 border-dashed border-gray-700 rounded-lg">
          Entrez une catégorie pour découvrir des publications virales et inspirantes.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <TrendingPostCard
            key={post.id}
            post={post}
            onClick={() => onSelectPostContent(post.content)}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-200 mb-1">Galerie de Tendances</h3>
      <p className="text-sm text-gray-400 mb-4">Découvrez des publications virales simulées par l'IA pour inspirer votre prochain thread.</p>
      
      <form onSubmit={handleFetchPosts} className="space-y-3 mb-4">
        <div className="flex gap-2">
            <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Entrez une catégorie (ex: business, IA...)"
            className="flex-grow bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
            disabled={isLoading}
            />
            <button
            type="submit"
            disabled={isLoading || !category.trim()}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <TrendingIcon className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Analyser</span>
            </button>
        </div>
        {accounts.length > 0 && (
            <select
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white p-3 transition"
                disabled={isLoading}
            >
                <option value="">Tendances générales</option>
                {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>Tendances personnalisées pour {acc.handle}</option>
                ))}
            </select>
        )}
      </form>
      
      {isLoading ? renderSkeleton() : (
        error ? (
          <div className="text-center p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-300">{error}</p>
          </div>
        ) : renderResults()
      )}
    </div>
  );
};