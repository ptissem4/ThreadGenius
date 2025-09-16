import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

const features = [
    {
        title: 'Contenu évalué par performance',
        description: 'Les modèles et images incluent des scores d\'engagement basés sur des données réelles.',
    },
    {
        title: 'Copier-coller en un clic',
        description: 'Le contenu est prêt à être publié immédiatement, sans aucune modification requise.',
    },
    {
        title: 'Utilisation anonyme',
        description: 'Commencez instantanément sans inscription. Vos données sont sauvegardées localement.',
    },
    {
        title: 'Formats viraux éprouvés',
        description: 'Basé sur des publications réelles à haute performance sur toutes les plateformes.',
    },
    {
        title: 'Suggestions de sujets rapides',
        description: 'Idées alimentées par l\'IA pour une inspiration et une création instantanées.',
    },
    {
        title: 'Prêt pour le multi-plateforme',
        description: 'Optimisé pour LinkedIn, Twitter/X, et Threads.',
    },
];

export const WhyChooseUs: React.FC = () => {
    return (
        <div className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Pourquoi les créateurs choisissent ThreadGenius</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-400">
                        Tout ce dont vous avez besoin pour créer du contenu viral, rien de superflu.
                    </p>
                </div>
                <div className="mt-16 max-w-2xl mx-auto sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex flex-col">
                                <dt className="flex items-center gap-x-4 text-xl font-semibold leading-7 text-white">
                                    <div className="flex-none w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                                        <CheckIcon className="h-7 w-7 text-purple-400" aria-hidden="true" />
                                    </div>
                                    {feature.title}
                                </dt>
                                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-400 pl-16">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};
