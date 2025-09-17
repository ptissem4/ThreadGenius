import React, { useState, useRef } from 'react';
import { generateThread, getTopicIdeas } from './services/geminiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { GeneratedThread, ThreadPost, SocialAccount, ScheduledPost } from './types';
import { Tone, Length, Platform } from './types';
import { FREE_GENERATIONS_LIMIT } from './constants';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { ThreadPreview } from './components/ThreadPreview';
import { ImageLibrary } from './components/ImageLibrary';
import { TemplateLibrary } from './components/TemplateLibrary';
import { HistoryPanel } from './components/HistoryPanel';
import { UpgradeModal } from './components/UpgradeModal';
import { Hero } from './components/Hero';
import { LandingSections } from './components/LandingSections';
import { Footer } from './components/Footer';
import { ScheduleModal } from './components/ScheduleModal';
import { CalendarView } from './components/CalendarView';
import { SettingsView } from './components/SettingsView';
import { AddAccountModal } from './components/AddAccountModal';

type View = 'generator' | 'calendar' | 'settings';

const App: React.FC = () => {
  // This check is crucial for production. It ensures the app doesn't run without a configured API key.
  if (!process.env.API_KEY) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-red-900/50 border border-red-700 rounded-lg p-8 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-red-300 mb-4">Erreur de Configuration</h1>
          <p className="text-red-200 mb-6">La clé API de Google Gemini est manquante.</p>
          <p className="text-gray-300">
            Veuillez définir la variable d'environnement <code className="bg-gray-800 p-1 rounded-md font-mono">API_KEY</code> pour que l'application fonctionne.
          </p>
        </div>
      </div>
    );
  }

  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.Inspirational);
  const [length, setLength] = useState<Length>(Length.Short);
  const [generatedThread, setGeneratedThread] = useState<GeneratedThread | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [history, setHistory] = useLocalStorage<GeneratedThread[]>('threadHistory', []);
  const [generationsLeft, setGenerationsLeft] = useLocalStorage<number>('generationsLeft', FREE_GENERATIONS_LIMIT);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isInspirationLoading, setIsInspirationLoading] = useState(false);

  const [view, setView] = useState<View>('generator');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [threadToSchedule, setThreadToSchedule] = useState<GeneratedThread | null>(null);
  const [scheduledPosts, setScheduledPosts] = useLocalStorage<ScheduledPost[]>('scheduledPosts', []);
  const [socialAccounts, setSocialAccounts] = useLocalStorage<SocialAccount[]>('socialAccounts', []);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  const generatorRef = useRef<HTMLDivElement>(null);

  const handleGenerateThread = async (e: React.FormEvent) => {
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
        platform: Platform.Twitter, // Default platform
        tone,
        length,
        image: selectedImage ?? undefined,
        createdAt: new Date().toISOString(),
      };
      setGeneratedThread(newThread);
      setHistory(prev => [newThread, ...prev.slice(0, 49)]); // Keep last 50
      setGenerationsLeft(prev => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGetInspiration = async () => {
      setIsInspirationLoading(true);
      setError(null);
      try {
          const ideas = await getTopicIdeas();
          if (ideas && ideas.length > 0) {
              setTopic(ideas[Math.floor(Math.random() * ideas.length)]);
          }
      } catch (err) {
           setError(err instanceof Error ? err.message : 'Failed to get inspiration.');
      } finally {
          setIsInspirationLoading(false);
      }
  };

  const handleLoadHistory = (thread: GeneratedThread) => {
      setTopic(thread.topic);
      setTone(thread.tone);
      setLength(thread.length);
      setSelectedImage(thread.image || null);
      setGeneratedThread(thread);
      setIsHistoryOpen(false);
      setView('generator'); // Switch to generator view
      // Scroll to the generator form after a short delay to ensure the view has updated
      setTimeout(() => {
        generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  };
  
  const handleScheduleOpen = (thread: GeneratedThread) => {
    setThreadToSchedule(thread);
    setIsScheduleModalOpen(true);
  };
  
  const handleScheduleConfirm = (scheduledAt: string, accountIds: string[], autoPost: boolean) => {
    if (!threadToSchedule) return;

    const newPosts: ScheduledPost[] = accountIds.map(accountId => ({
      id: `${new Date().toISOString()}-${accountId}`,
      thread: threadToSchedule,
      scheduledAt,
      accountId,
      autoPost,
      status: 'scheduled',
    }));

    setScheduledPosts(prev => [...prev, ...newPosts].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()));
    setIsScheduleModalOpen(false);
    setThreadToSchedule(null);
    alert(`${accountIds.length} thread(s) scheduled successfully!`);
    setView('calendar');
  };

  const handleAddAccount = (accountData: Omit<SocialAccount, 'id'>) => {
    const newAccount: SocialAccount = {
      ...accountData,
      id: new Date().toISOString(),
    };
    setSocialAccounts(prev => [...prev, newAccount]);
    setIsAddAccountModalOpen(false);
  };
  
  const handleDeleteAccount = (accountId: string) => {
      if (window.confirm("Are you sure you want to delete this account? This cannot be undone.")) {
          setSocialAccounts(prev => prev.filter(acc => acc.id !== accountId));
      }
  };
  
  const handleDeleteScheduledPost = (postId: string) => {
    setScheduledPosts(prev => prev.filter(p => p.id !== postId));
  };


  const renderView = () => {
    switch (view) {
      case 'calendar':
        return <CalendarView scheduledPosts={scheduledPosts} socialAccounts={socialAccounts} onDeletePost={handleDeleteScheduledPost} />;
      case 'settings':
        return <SettingsView accounts={socialAccounts} onAddAccountClick={() => setIsAddAccountModalOpen(true)} onDeleteAccount={handleDeleteAccount} />;
      case 'generator':
      default:
        return (
          <>
            <Hero />
            <main ref={generatorRef} id="generator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-8">
                  <GeneratorForm 
                    topic={topic}
                    setTopic={setTopic}
                    tone={tone}
                    setTone={setTone}
                    length={length}
                    setLength={setLength}
                    isLoading={isLoading}
                    onSubmit={handleGenerateThread}
                    onGetInspiration={handleGetInspiration}
                    isInspirationLoading={isInspirationLoading}
                  />
                  <TemplateLibrary onSelectPostContent={setTopic} accounts={socialAccounts} />
                  <ImageLibrary selectedImage={selectedImage} onSelectImage={setSelectedImage} />
                </div>
                <div className="lg:sticky lg:top-24">
                  <ThreadPreview thread={generatedThread} onSchedule={handleScheduleOpen} />
                </div>
              </div>
              {error && <div className="mt-4 text-center p-4 bg-red-900/50 text-red-300 rounded-md border border-red-700">{error}</div>}
            </main>
            <LandingSections />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        generationsLeft={generationsLeft} 
        onUpgradeClick={() => setIsUpgradeModalOpen(true)}
        onHistoryClick={() => setIsHistoryOpen(true)}
        onCalendarClick={() => setView('calendar')}
        onSettingsClick={() => setView('settings')}
        onLogoClick={() => setView('generator')}
      />
      {renderView()}
      <Footer />

      <HistoryPanel 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadHistory={handleLoadHistory}
      />
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleConfirm}
        thread={threadToSchedule}
        accounts={socialAccounts}
      />
      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onAddAccount={handleAddAccount}
      />
    </div>
  );
};

export default App;