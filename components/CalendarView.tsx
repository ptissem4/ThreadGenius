import React, { useState } from 'react';
import { Platform, type ScheduledPost, type SocialAccount } from '../types';
import { ScheduledPostModal } from './ScheduledPostModal';

interface CalendarViewProps {
  scheduledPosts: ScheduledPost[];
  socialAccounts: SocialAccount[];
  onDeletePost: (postId: string) => void;
}

const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

const platformColors: { [key in Platform]?: string } = {
    [Platform.Twitter]: 'bg-sky-500/50 text-sky-200 hover:bg-sky-400/50',
    [Platform.LinkedIn]: 'bg-blue-600/50 text-blue-200 hover:bg-blue-500/50',
    [Platform.Threads]: 'bg-gray-500/50 text-gray-100 hover:bg-gray-400/50',
    [Platform.Facebook]: 'bg-indigo-600/50 text-indigo-200 hover:bg-indigo-500/50',
    [Platform.Instagram]: 'bg-fuchsia-600/50 text-fuchsia-200 hover:bg-fuchsia-500/50',
};


export const CalendarView: React.FC<CalendarViewProps> = ({ scheduledPosts, socialAccounts, onDeletePost }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewingPost, setViewingPost] = useState<ScheduledPost | null>(null);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

  const days = [];
  let day = new Date(startDate);
  while (day <= endDate) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const postsByDate: { [key: string]: ScheduledPost[] } = {};
  scheduledPosts.forEach(post => {
    const dateKey = new Date(post.scheduledAt).toDateString();
    if (!postsByDate[dateKey]) {
      postsByDate[dateKey] = [];
    }
    postsByDate[dateKey].push(post);
  });
  
  const changeMonth = (offset: number) => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };
  
  const handleDelete = (postId: string) => {
      onDeletePost(postId);
      setViewingPost(null);
  };

  return (
    <>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Calendrier de contenu</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition">&lt;</button>
                    <span className="text-lg md:text-xl font-semibold w-36 md:w-48 text-center">{currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition">&gt;</button>
                </div>
            </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 md:p-6">
            <div className="grid grid-cols-7 gap-px text-center text-sm text-gray-400 mb-2">
            {dayNames.map(d => <div key={d} className="hidden md:block font-semibold">{d}.</div>)}
            {dayNames.map(d => <div key={d + 'sm'} className="md:hidden font-semibold">{d.charAt(0)}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-px">
            {days.map(d => {
                const dateKey = d.toDateString();
                const postsForDay = postsByDate[dateKey] || [];
                return (
                <div
                    key={d.toISOString()}
                    className={`h-24 md:h-32 p-1 md:p-2 bg-gray-800 border-t border-l border-gray-700 ${d.getMonth() !== currentDate.getMonth() ? 'opacity-40' : ''}`}
                >
                    <div className={`text-xs md:text-base font-semibold ${isToday(d) ? 'text-purple-400' : 'text-white'}`}>{d.getDate()}</div>
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-16 md:max-h-20 text-left">
                        {postsForDay.map(post => {
                            const account = socialAccounts.find(acc => acc.id === post.accountId);
                            const platform = account?.platform;
                            const colorClass = (platform && platformColors[platform]) || 'bg-purple-600/50 text-purple-200 hover:bg-purple-500/50';
                            
                            return (
                                <div 
                                    key={post.id} 
                                    className={`text-xs p-1 rounded-md truncate cursor-pointer ${colorClass}`}
                                    title={`${account?.handle}: ${post.thread.topic}`}
                                    onClick={() => setViewingPost(post)}
                                >
                                <span className="hidden md:inline">{new Date(post.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - </span>
                                {post.thread.topic}
                                </div>
                            )
                        })}
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </div>
        {viewingPost && (
            <ScheduledPostModal
                isOpen={!!viewingPost}
                onClose={() => setViewingPost(null)}
                post={viewingPost}
                account={socialAccounts.find(acc => acc.id === viewingPost.accountId) || null}
                onDelete={handleDelete}
            />
        )}
    </>
  );
};