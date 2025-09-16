import React from 'react';
import { RocketIcon } from './icons/RocketIcon';

const benefits = [
  { name: 'Gagnez du temps', description: '— générez du contenu viral en secondes au lieu d\'heures' },
  { name: 'Augmentez l\'engagement', description: '— utilisez des formats éprouvés avec des scores de performance documentés' },
  { name: 'Qualité professionnelle', description: '— un rendu impeccable sans compétences en design' },
  { name: 'Création à grande échelle', description: '— créez 5 à 10 publications par jour sans effort' },
  { name: 'Publication multi-plateformes', description: '— un seul contenu fonctionne sur toutes les plateformes majeures' },
  { name: 'Aucune courbe d\'apprentissage', description: '— une interface intuitive que tout le monde peut utiliser' },
  { name: 'Meilleures pratiques intégrées', description: '— les modèles suivent des structures virales éprouvées' },
  { name: 'Rentable', description: '— remplacez les agences et outils coûteux de médias sociaux' },
];

export const KeyBenefits: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Avantages clés</h2>
        </div>
        <div className="mt-16">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="p-6 bg-gray-800/50 border border-gray-700 rounded-2xl">
                <dd className="text-lg font-medium leading-9 tracking-tight text-white flex items-start">
                  <RocketIcon className="w-6 h-6 mr-3 text-purple-400 flex-shrink-0 mt-1"/>
                  <span>
                    <span className="font-semibold">{benefit.name}</span>
                    <span className="text-gray-400"> {benefit.description}</span>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
