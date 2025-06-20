import React from 'react';
import { Send, Eye } from 'lucide-react';
import { ModeCard } from '../types/appTypes';

export const MODE_CARDS: ModeCard[] = [
    {
        mode: 'sender',
        title: 'Location Sender',
        description: 'Share your GPS coordinates in real-time. Choose between actual GPS or simulated location data for testing purposes.',
        icon: React.createElement(Send, { size: 28 }),
        gradientClass: 'from-blue-500 to-blue-600',
        features: [
            'Real GPS integration',
            'Simulation mode available',
            'Live sharing controls'
        ]
    },
    {
        mode: 'receiver',
        title: 'Location Receiver',
        description: 'View real-time location updates on an interactive map. Track multiple users and see their movements as they happen.',
        icon: React.createElement(Eye, { size: 28 }),
        gradientClass: 'from-purple-500 to-purple-600',
        features: [
            'Interactive map display',
            'Multi-user tracking',
            'Real-time updates'
        ]
    }
];