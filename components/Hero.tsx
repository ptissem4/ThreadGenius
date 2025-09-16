import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Hero: React.FC = () => {
    const scrollToGenerator = () => {
        document.getElementById('generator-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="text-center py-16 px-4 sm:py-24">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Créez des Threads Viraux avec l'IA en Secondes
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-8 text-gray-400">
                Utilisez l'IA pour transformer vos idées en contenu captivant pour Twitter/X, LinkedIn et Threads. Pas d'inscription requise.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                    onClick={scrollToGenerator}
                    className="flex items-center rounded-md bg-purple-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 transition-colors"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Commencer à Créer
                </button>
            </div>
        </div>
    );
};
