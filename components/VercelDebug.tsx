import React from 'react';

export const VercelDebug: React.FC = () => {
  const apiKey = process.env.API_KEY;
  const isKeyPresent = apiKey && apiKey.length > 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center text-center p-4">
      <div className={`border p-8 rounded-lg max-w-lg ${isKeyPresent ? 'bg-green-900/50 border-green-700' : 'bg-red-900/50 border-red-700'}`}>
        <h1 className="text-3xl font-bold mb-4">Diagnostic de Déploiement (Netlify)</h1>
        
        {isKeyPresent ? (
          <div>
            <p className="text-green-300 text-2xl mb-4">
              ✅ Clé API trouvée !
            </p>
            <p className="text-gray-400">
              La variable d'environnement <code className="bg-gray-700 p-1 rounded">API_KEY</code> est correctement configurée sur Netlify. L'application devrait fonctionner.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-red-300 text-2xl mb-4">
              ❌ Clé API NON TROUVÉE !
            </p>
            <p className="text-gray-400 mt-4">
              L'application déployée ne trouve pas la variable d'environnement <code className="bg-gray-700 p-1 rounded">API_KEY</code>.
            </p>
            <p className="text-gray-400 mt-2">
              Veuillez vous rendre dans les paramètres de votre site sur Netlify (<code className="bg-gray-700 p-1 rounded">Site settings &gt; Build & deploy &gt; Environment</code>) pour ajouter la variable <code className="bg-gray-700 p-1 rounded">API_KEY</code>. Assurez-vous de **redéclencher un déploiement** après avoir sauvegardé la clé.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
