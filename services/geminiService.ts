import { GoogleGenAI, Type } from "@google/genai";
import type { Tone, Length, SocialAccount, Platform } from '../types';

// Per guidelines, API key must come from environment variables.
// The app will fail to load if the key is not provided, which is the correct behavior.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set. Please configure it before running the application.");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


const threadSchema = {
  type: Type.OBJECT,
  properties: {
    thread: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          content: {
            type: Type.STRING,
            description: "The text content of the social media post.",
          },
        },
        required: ["content"],
      },
    },
  },
  required: ["thread"],
};

export const generateThread = async (topic: string, tone: Tone, length: Length) => {
  const prompt = `
    You are ThreadGenius, an expert in creating viral social media content.
    Generate a social media thread about "${topic}".
    The tone should be "${tone}".
    The thread should be of "${length}" length.
    
    Structure the output as a JSON object following the provided schema.
    The first post must be a strong, engaging hook.
    The middle posts should develop the topic with valuable information, stories, or insights.
    The final post should be a concluding thought or a call to action.
    Include relevant hashtags within the posts where appropriate.
    Do not include numbering like "1/5" or "Post 1:" in the content itself.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: threadSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    return parsed.thread;
  } catch (error) {
    console.error("Error generating thread:", error);
    throw new Error("Failed to generate thread. The model may have returned an invalid response.");
  }
};

const topicIdeasSchema = {
    type: Type.OBJECT,
    properties: {
        topics: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            },
            description: "An array of 5 topic ideas."
        }
    },
    required: ["topics"]
}


export const getTopicIdeas = async () => {
  const prompt = `
    You are an expert social media strategist.
    Suggest 5 trending and engaging topics for social media threads.
    The topics should be diverse, covering areas like tech, personal growth, marketing, and interesting facts.
    Return the result as a JSON object following the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: topicIdeasSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    return parsed.topics;
  } catch (error) {
    console.error("Error getting topic ideas:", error);
    throw new Error("Failed to get topic ideas.");
  }
};

const trendingPostSchema = {
  type: Type.OBJECT,
  properties: {
    posts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique ID for the post, e.g., 'post1'" },
          platform: {
            type: Type.STRING,
            enum: ['Twitter/X', 'LinkedIn', 'Threads', 'Facebook', 'Instagram'],
          },
          user: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "A realistic but fake user name." },
              handle: { type: Type.STRING, description: "A realistic but fake user handle, e.g., '@creatorhandle'" },
              avatarUrl: { type: Type.STRING, description: "A generated avatar URL from `https://i.pravatar.cc/48?u=[RANDOM_ID]`" },
            },
            required: ["name", "handle", "avatarUrl"],
          },
          content: { type: Type.STRING, description: "The full text content of the viral post." },
          metrics: {
            type: Type.OBJECT,
            properties: {
              likes: { type: Type.STRING, description: "Engagement metric, formatted as a string, e.g., '10.2k', '1.5M'" },
              comments: { type: Type.STRING, description: "Engagement metric, formatted as a string, e.g., '512', '1.1k'" },
              shares: { type: Type.STRING, description: "Engagement metric, formatted as a string, e.g., '2.3k', '789'" },
              views: { type: Type.STRING, description: "Engagement metric, formatted as a string, e.g., '1.2M', '250.7k'" },
            },
            required: ["likes", "comments", "shares", "views"],
          },
        },
        required: ["id", "platform", "user", "content", "metrics"],
      },
    },
  },
  required: ["posts"],
};

export const getTrendingPosts = async (category: string, account?: SocialAccount) => {
  const personalizationPrompt = account
    ? `The analysis should be hyper-personalized for a social media account with the handle "${account.handle}" that operates in the "${account.niche}" niche. The generated examples should resonate with this specific audience.`
    : `The analysis should be general for the specified category.`;

  const prompt = `
    You are a social media trend analyst expert. Your task is to generate 4 realistic examples of recent viral posts for the category: "${category}".
    ${personalizationPrompt}
    
    For each example, create a plausible but fake post with the following details:
    - id: A unique string identifier (e.g., 't1', 't2').
    - platform: The social media platform where this post would likely go viral. Choose from: 'Twitter/X', 'LinkedIn', 'Threads', 'Facebook', 'Instagram'.
    - user: A realistic but fake user profile, including name, handle, and a generated avatar URL from pravatar.cc with a random ID.
    - content: The full text of the post, written in a style that is currently performing well.
    - metrics: Realistic engagement metrics, formatted as strings (e.g., "15.3k", "1.2M").
    
    Return the result as a single JSON object matching the provided schema. Ensure the content is insightful and reflects current viral trends for the given category and target audience.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: trendingPostSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    return parsed.posts;
  } catch (error) {
    console.error("Error getting trending posts:", error);
    throw new Error("Failed to fetch trending posts from AI.");
  }
};