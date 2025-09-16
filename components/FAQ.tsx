import React from 'react';

const faqs = [
    {
        question: 'Qu\'est-ce que ThreadGenius AI ?',
        answer: 'ThreadGenius vous aide à créer des threads viraux pour les médias sociaux en utilisant l\'IA, des modèles éprouvés et une bibliothèque d\'images virales.',
    },
    {
        question: 'Puis-je réutiliser les images dans plusieurs threads ?',
        answer: 'Oui, toutes les images sélectionnées peuvent être utilisées dans tous vos threads et sur toutes les plateformes.',
    },
    {
        question: 'De quoi ai-je besoin pour m\'inscrire ?',
        answer: 'De rien ! ThreadGenius fonctionne sans compte. Votre historique est sauvegardé localement dans votre navigateur pour plus de confidentialité.',
    },
    {
        question: 'Supportez-vous la publication directe ?',
        answer: 'Pas encore – ThreadGenius se concentre sur la création de contenu ; la planification native est sur notre feuille de route.',
    },
];

export const FAQ: React.FC = () => {
    return (
        <div className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                 <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Foire aux questions</h2>
                </div>
                <div className="mt-16 max-w-4xl mx-auto">
                    <dl className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {faqs.map((faq) => (
                            <div key={faq.question} className="p-8 bg-gray-800/50 border border-gray-700 rounded-2xl">
                                <dt className="text-lg font-semibold leading-8 text-white">{faq.question}</dt>
                                <dd className="mt-2 text-base leading-7 text-gray-400">{faq.answer}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};
