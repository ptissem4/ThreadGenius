import React from 'react';
import type { TrendingPost } from '../types';
import { PlatformIcons } from './icons/PlatformIcons';
import { MetricIcons } from './icons/MetricIcons';

interface TrendingPostCardProps {
  post: TrendingPost;
  onClick: () => void;
}

export const TrendingPostCard: React.FC<TrendingPostCardProps> = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-500 cursor-pointer transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img src={post.user.avatarUrl} alt={post.user.name} className="w-10 h-10 rounded-full mr-3 border-2 border-gray-600" />
            <div>
              <p className="font-bold text-white leading-tight">{post.user.name}</p>
              <p className="text-sm text-gray-400 leading-tight">{post.user.handle}</p>
            </div>
          </div>
          <PlatformIcons platform={post.platform} className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-700/50 flex justify-around text-gray-400">
        <div className="flex items-center space-x-1.5">
          <MetricIcons.Like className="w-4 h-4" />
          <span className="text-xs font-semibold">{post.metrics.likes}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <MetricIcons.Comment className="w-4 h-4" />
          <span className="text-xs font-semibold">{post.metrics.comments}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <MetricIcons.Share className="w-4 h-4" />
          <span className="text-xs font-semibold">{post.metrics.shares}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <MetricIcons.View className="w-4 h-4" />
          <span className="text-xs font-semibold">{post.metrics.views}</span>
        </div>
      </div>
    </div>
  );
};