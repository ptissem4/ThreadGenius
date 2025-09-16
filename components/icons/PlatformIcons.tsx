import React from 'react';
import { Platform } from '../../types';

interface PlatformIconsProps extends React.SVGProps<SVGSVGElement> {
  platform: Platform;
}

export const PlatformIcons: React.FC<PlatformIconsProps> = ({ platform, ...props }) => {
  switch (platform) {
    case Platform.Twitter:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
          <g>
            <path
              fill="currentColor"
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            ></path>
          </g>
        </svg>
      );
    case Platform.LinkedIn:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-.82 0-1.12.56-1.12 1.93V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.38.99 3.38 3.3V19z"></path>
        </svg>
      );
    case Platform.Facebook:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
        </svg>
      );
    case Platform.Instagram:
    case Platform.Threads: // Using Instagram icon for Threads as it's common
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.543.01-4.781.06-2.766.126-4.004 1.37-4.13 4.13-.052 1.237-.063 1.598-.063 4.781s.011 3.543.063 4.781c.126 2.766 1.364 4.004 4.13 4.13 1.238.052 1.61.063 4.781.063s3.543-.011 4.781-.063c2.767-.126 4.004-1.364 4.13-4.13.052-1.238.063-1.61.063-4.781s-.011-3.543-.063-4.781c-.126-2.766-1.364-4.004-4.13-4.13C15.543 3.613 15.171 3.604 12 3.604zM12 9.75c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 7.378c-1.591 0-2.878-1.288-2.878-2.878s1.288-2.878 2.878-2.878 2.878 1.288 2.878 2.878-1.288 2.878-2.878 2.878zm4.398-8.634c-.78 0-1.414.634-1.414 1.414s.634 1.414 1.414 1.414 1.414-.634 1.414-1.414-.634-1.414-1.414-1.414z"></path>
        </svg>
      );
    default:
      return ( // Fallback icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m-6.364-2.272l-1.414 1.414m12.728-12.728l-1.414 1.414M3 12h1m16 0h1m-2.272-6.364l1.414-1.414m-12.728 12.728l1.414-1.414" />
        </svg>
      );
  }
};