import React from 'react';
import { type SocialAccount } from '../types';
import { PlatformIcons } from './icons/PlatformIcons';

interface SettingsViewProps {
    accounts: SocialAccount[];
    onAddAccountClick: () => void;
    onDeleteAccount: (accountId: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ accounts, onAddAccountClick, onDeleteAccount }) => {
    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Paramètres</h2>

            {/* Social Accounts Section */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-1">Comptes Sociaux</h3>
                        <p className="text-gray-400">"Connectez" vos comptes pour obtenir des tendances personnalisées. Ces informations sont stockées localement.</p>
                    </div>
                    <button 
                        onClick={onAddAccountClick}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all whitespace-nowrap"
                    >
                        + Connecter un compte
                    </button>
                </div>
                
                <div className="space-y-3 mt-6">
                    {accounts.length > 0 ? (
                        accounts.map(acc => (
                            <div key={acc.id} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-md border border-gray-700">
                                <div className="flex items-center">
                                    <PlatformIcons platform={acc.platform} className="w-6 h-6 mr-3" />
                                    <div>
                                        <p className="font-semibold text-white">{acc.handle}</p>
                                        <p className="text-xs text-gray-400">{acc.niche}</p>
                                    </div>
                                </div>
                                <button onClick={() => onDeleteAccount(acc.id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">
                                    Supprimer
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4 border-2 border-dashed border-gray-700 rounded-md">Aucun compte connecté.</p>
                    )}
                </div>
            </div>

            {/* Auto-posting Section */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                 <h3 className="text-xl font-semibold text-white mb-1">Automatisation</h3>
                 <p className="text-gray-400 mb-6">Configurez la publication automatique pour une gestion entièrement mains libres.</p>
                
                 <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-md border border-gray-700 opacity-50 cursor-not-allowed">
                     <div>
                        <h4 className="font-semibold text-gray-300">Publication Automatique (Pro)</h4>
                        <p className="text-sm text-gray-500">Bientôt disponible. Nécessitera une mise à niveau Pro et une connexion API sécurisée.</p>
                     </div>
                     <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" disabled className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-600 border-4 appearance-none cursor-not-allowed"/>
                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-not-allowed"></label>
                    </div>
                 </div>
            </div>
        </div>
    );
}