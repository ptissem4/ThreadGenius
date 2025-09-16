import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GeneratorForm } from './components/GeneratorForm';
import { TemplateLibrary } from './components/TemplateLibrary';
import { ImageLibrary } from './components/ImageLibrary';
import { ThreadPreview } from './components/ThreadPreview';
import { UpgradeModal } from './components/UpgradeModal';
import { HistoryPanel } from './components/HistoryPanel';
import { LandingSections } from './components/LandingSections';
import { Footer } from './components/Footer';
import { CalendarView } from './components/CalendarView';
import { ScheduleModal } from './components/ScheduleModal';
import { SettingsView } from './components/SettingsView';
import { AddAccountModal } from './components/AddAccountModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateThread, getTopicIdeas } from './services/geminiService';
import { Tone, Length, Platform } from './types';
import type { GeneratedThread, TrendingPost, ThreadPost, ScheduledPost, SocialAccount } from './types';
import { FREE_GENERATIONS_LIMIT } from './constants';

const App: React.FC = () => {
  // App State
  const [view, setView] = useState<'generator' | 'calendar' | 'settings'>('generator');

  // Form State
  const [topic, setTopic] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.Inspirational);
  const [length, setLength] = useState<Length>(Length.Short);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Generation State
  const [generatedThread, setGeneratedThread] = useState<GeneratedThread | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInspirationLoading, setIsInspirationLoading] = useState<boolean>(false);

  // Modal & Panel State
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState<boolean>(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState<boolean>(false);
  const [threadToSchedule, setThreadToSchedule] = useState<GeneratedThread | null>(null);

  // Local Storage State
  const [generationsLeft, setGenerationsLeft] = useLocalStorage<number>('generationsLeft', FREE_GENERATIONS_LIMIT);
  const [history, setHistory] = useLocalStorage<GeneratedThread[]>('generationHistory', []);
  const [scheduledPosts, setScheduledPosts] = useLocalStorage<ScheduledPost[]>('scheduledPosts', []);
  const [socialAccounts, setSocialAccounts] = useLocalStorage<SocialAccount[]>('socialAccounts', []);

  // Startup check for API key. This prevents the app from running without proper configuration.
  if (!process.env.API_KEY) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center p-4">
        <div className="bg-red-900/50 border border-red-700 p-8 rounded-lg max-w-lg">
          <h1 className="text-3xl font-bold text-red-300 mb-4">Erreur de Configuration</h1>
          <p className="text-red-200 mb-2">
            La clé API de Google Gemini est manquante.
          </p>
          <p className="text-gray-400">
            Veuillez vous assurer d'avoir configuré la variable d'environnement <code className="bg-gray-700 p-1 rounded">API_KEY</code> dans les paramètres de votre déploiement (par exemple, sur Vercel) avant d'utiliser l'application.
          </p>
        </div>
      </div>
    );
  }

  const handleSelectPostContent = useCallback((content: string) => {
    setTopic(content);
    document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' });
    setView('generator');
  }, []);

  const handleGetInspiration = async () => {
    setIsInspirationLoading(true);
    setError(null);
    try {
        const topics = await getTopicIdeas();
        if (topics && topics.length > 0) {
            setTopic(topics[Math.floor(Math.random() * topics.length)]);
        }
    } catch (e) {
        setError("Impossible de récupérer des idées de sujets. Veuillez réessayer.");
    } finally {
        setIsInspirationLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (generationsLeft <= 0) {
      setIsUpgradeModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedThread(null);

    try {
      const posts: ThreadPost[] = await generateThread(topic, tone, length);
      const newThread: GeneratedThread = {
        id: new Date().toISOString(),
        topic,
        posts,
        platform: Platform.Twitter,
        tone,
        length,
        image: selectedImage || undefined,
        createdAt: new Date().toISOString(),
      };
      setGeneratedThread(newThread);
      setHistory(prev => [newThread, ...prev].slice(0, 50));
      setGenerationsLeft(prev => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (thread: GeneratedThread) => {
    setGeneratedThread(thread);
    setTopic(thread.topic);
    setTone(thread.tone);
    setLength(thread.length);
    setSelectedImage(thread.image || null);
    setIsHistoryPanelOpen(false);
    setView('generator');
    document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleOpenScheduleModal = (thread: GeneratedThread) => {
      setThreadToSchedule(thread);
      setIsScheduleModalOpen(true);
  };

  const handleSchedulePost = (scheduledAt: string, accountIds: string[], autoPost: boolean) => {
    if (!threadToSchedule) return;
    
    const newScheduledPosts: ScheduledPost[] = accountIds.map((accountId, index) => ({
      id: `sch_${Date.now()}_${index}_${accountId}`,
      thread: threadToSchedule,
      scheduledAt,
      accountId,
      autoPost,
      status: 'scheduled',
    }));

    setScheduledPosts(prev => [...prev, ...newScheduledPosts].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()));
    setIsScheduleModalOpen(false);
    setThreadToSchedule(null);
    setView('calendar');
  };
  
  const handleDeleteScheduledPost = (postId: string) => {
      setScheduledPosts(prev => prev.filter(p => p.id !== postId));
  }
  
  const handleAddAccount = (account: Omit<SocialAccount, 'id'>) => {
      const newAccount: SocialAccount = { ...account, id: `acc_${new Date().toISOString()}`};
      setSocialAccounts(prev => [...prev, newAccount]);
      setIsAddAccountModalOpen(false);
  };
  
  const handleDeleteAccount = (accountId: string) => {
      setSocialAccounts(prev => prev.filter(acc => acc.id !== accountId));
      // Also remove scheduled posts associated with this account
      setScheduledPosts(prev => prev.filter(p => p.accountId !== accountId));
  };
  
  const renderView = () => {
    switch(view) {
        case 'calendar':
            return <CalendarView scheduledPosts={scheduledPosts} socialAccounts={socialAccounts} onDeletePost={handleDeleteScheduledPost} />;
        case 'settings':
            return <SettingsView accounts={socialAccounts} onAddAccountClick={() => setIsAddAccountModalOpen(true)} onDeleteAccount={handleDeleteAccount} />;
        case 'generator':
        default:
            return (
                <>
                    <Hero />
                    <div id="generator-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8 max-w-7xl mx-auto">
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                <GeneratorForm
                                    topic={topic}
                                    setTopic={setTopic}
                                    tone={tone}
                                    setTone={setTone}
                                    length={length}
                                    setLength={setLength}
                                    isLoading={isLoading}
                                    onSubmit={handleSubmit}
                                    onGetInspiration={handleGetInspiration}
                                    isInspirationLoading={isInspirationLoading}
                                />
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                <TemplateLibrary onSelectPostContent={handleSelectPostContent} accounts={socialAccounts} />
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                                <ImageLibrary selectedImage={selectedImage} onSelectImage={setSelectedImage} />
                            </div>
                        </div>
                        <div className="lg:col-span-1 lg:sticky top-24 self-start h-[calc(100vh-120px)]">
                            {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-md mb-4">{error}</div>}
                            <ThreadPreview thread={generatedThread} onSchedule={handleOpenScheduleModal} />
                        </div>
                    </div>
                    <LandingSections />
                </>
            );
    }
  }


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        generationsLeft={generationsLeft} 
        onUpgradeClick={() => setIsUpgradeModalOpen(true)}
        onHistoryClick={() => setIsHistoryPanelOpen(true)}
        onCalendarClick={() => setView('calendar')}
        onSettingsClick={() => setView('settings')}
        onLogoClick={() => setView('generator')}
      />
      <main>
        {renderView()}
      </main>
      
      <Footer />
      
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
      <HistoryPanel 
        isOpen={isHistoryPanelOpen} 
        onClose={() => setIsHistoryPanelOpen(false)} 
        history={history}
        onLoadHistory={loadFromHistory}
      />
      {isScheduleModalOpen && (
        <ScheduleModal 
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            thread={threadToSchedule}
            accounts={socialAccounts}
            onSchedule={handleSchedulePost}
        />
      )}
       <AddAccountModal 
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAddAccount={handleAddAccount}
       />
    </div>
  );
};

export default App;
