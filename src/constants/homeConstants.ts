import React from 'react';
import { Share2, Radio } from 'lucide-react';
import { ModeCard } from '../types/appTypes';

export const MODE_CARDS: ModeCard[] = [
    {
        mode: 'sender',
        title: 'Share Location',
        description: 'Share your real-time location with others',
        icon: React.createElement(Share2, { size: 24 }),
        gradientClass: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
        features: [
            'Real GPS integration',
            'Simulation mode available',
            'Live sharing controls'
        ]
    },
    {
        mode: 'receiver',
        title: 'Track Location',
        description: 'Monitor shared locations in real-time',
        icon: React.createElement(Radio, { size: 24 }),
        gradientClass: 'from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
        features: [
            'Interactive map display',
            'Multi-user tracking',
            'Real-time updates'
        ]
    }
];