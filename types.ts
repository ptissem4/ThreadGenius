export enum Platform {
  Twitter = 'Twitter/X',
  LinkedIn = 'LinkedIn',
  Threads = 'Threads',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
}

export enum Tone {
  Inspirational = 'Inspirational',
  Professional = 'Professional',
  Humorous = 'Humorous',
  Educational = 'Educational',
  Contrarian = 'Contrarian',
  Storytelling = 'Storytelling'
}

export enum Length {
  Short = 'Short (3-5 posts)',
  Medium = 'Medium (6-9 posts)',
  Long = 'Long (10+ posts)',
}

export interface ThreadPost {
  content: string;
}

export interface GeneratedThread {
  id: string;
  topic: string;
  posts: ThreadPost[];
  platform: Platform;
  tone: Tone;
  length: Length;
  image?: string;
  createdAt: string;
}

export interface TrendingPost {
  id: string;
  platform: Platform;
  user: {
    name: string;
    handle: string;
    avatarUrl: string;
  };
  content: string;
  metrics: {
    likes: string;
    comments: string;
    shares: string;
    views: string;
  };
}


export interface SocialAccount {
  id: string;
  platform: Platform;
  handle: string; // e.g., "@username" or "Company Page"
  niche: string; // e.g., "AI, SaaS, and Productivity"
}

export interface ScheduledPost {
  id: string;
  thread: GeneratedThread;
  scheduledAt: string; // ISO string
  accountId: string; // Links to a SocialAccount
  autoPost: boolean;
  status: 'scheduled' | 'posted';
}