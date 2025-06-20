export type Mode = 'home' | 'sender' | 'receiver';

export interface ModeCard {
    mode: Mode;
    title: string;
    description: string;
    icon: JSX.Element;
    gradientClass: string;
    darkGradientClass?: string;
    features: string[];
}