import React from 'react';
import { Link } from 'react-router-dom';
import { Github, MapPin, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { HEADER_CONFIG } from '../constants/headerConstants';
import { getThemeClasses } from '../styles/themeStyles';


export const Header: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <header className={getThemeClasses.header}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className={getThemeClasses.logo}>
                            <MapPin size={20} />
                        </div>
                        <span className={getThemeClasses.title}>
                            {HEADER_CONFIG.TITLE}
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className={getThemeClasses.themeButton}
                            aria-label={HEADER_CONFIG.ARIA_LABELS.THEME_TOGGLE}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <a
                            href={HEADER_CONFIG.GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={getThemeClasses.githubButton}
                        >
                            <Github size={20} />
                            <span className="hidden sm:block">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};