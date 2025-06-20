import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { MODE_CARDS } from '../constants/appConstants';

export const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl mb-6 shadow-lg">
                        <MapPin size={32} />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Real-Time Location Sharing
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Experience seamless location sharing with SignalR WebSocket technology.
                        Send and receive GPS coordinates in real-time between multiple users.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {MODE_CARDS.map((card) => (
                        <Link
                            key={card.mode}
                            to={card.mode === 'sender' ? '/sender' : '/receiver'}
                            className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className={`flex items-center justify-center rounded-full ${card.gradientClass} gap-2`}>
                                <span className="font-bold text-4xl">{card.icon}</span>
                                <span className="text-2xl font-bold capitalize">{card.mode}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};