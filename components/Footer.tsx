import React from 'react';
import { GithubIcon } from './icons/GithubIcon';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-8 px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-4">
                     <a 
                        href="https://github.com/ptissem4/ThreadGenius"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-white transition-colors"
                        aria-label="View source on GitHub"
                    >
                        <GithubIcon className="h-6 w-6" />
                    </a>
                    <p className="text-center text-sm leading-5 text-gray-500">
                        &copy; {new Date().getFullYear()} ThreadGenius. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}