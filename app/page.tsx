'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHandPeace } from 'react-icons/fa';
import { HiSparkles, HiCode } from 'react-icons/hi';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import Terminal from './components/Terminal';
import Footer from './components/Footer';

export default function Home() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.title = isDevMode ? 'Nathan Arruda - Terminal Dev Mode' : 'Nathan Arruda - Tech Lead & Software Architect';
  }, [isDevMode]);

  const theme = {
    dark: {
      bg: 'from-black via-green-900 to-black',
      text: 'text-white',
      textSecondary: 'text-white/80',
      textMuted: 'text-white/60',
      card: 'bg-white/5',
      cardBorder: 'border-white/10',
      navBg: 'bg-white/10',
      navBorder: 'border-white/10',
    },
    light: {
      bg: 'from-gray-50 via-green-50 to-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-800',
      textMuted: 'text-gray-700',
      card: 'bg-white shadow-lg',
      cardBorder: 'border-gray-300',
      navBg: 'bg-white/90',
      navBorder: 'border-gray-300',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  if (isDevMode) {
    return (
      <div className="relative">
        <Terminal />
        
        {/* Mode Toggle Button */}
        <button
          onClick={() => setIsDevMode(false)}
          className="fixed bottom-8 right-8 z-[100] p-4 bg-white/10 text-white border-white/20 rounded-full backdrop-blur-lg border transition-all duration-500 hover:scale-110 group"
          aria-label="Switch to Visual Mode"
        >
          <HiSparkles size={24} className="transition-transform group-hover:rotate-12" />
          
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white">
            Visual Mode
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
      {/* Navigation */}
      <nav className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-lg ${currentTheme.navBg} border-b ${currentTheme.navBorder} transition-all duration-1000`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">NA</span>
              </div>
              <span className={`${currentTheme.text} font-bold text-xl transition-colors duration-1000`}>Nathan Arruda</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-green-400 scale-110">
                Home
              </Link>
              <Link href="/sobre" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Sobre
              </Link>
              <Link href="/skills" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Skills
              </Link>
              <Link href="/experiencia" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Experiência
              </Link>
              <Link href="/contato" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Contato
              </Link>
              
              <button
                onClick={() => setIsDark(!isDark)}
                className="relative w-16 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-1 transition-all duration-500 hover:scale-110 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r transition-transform duration-700 ease-in-out ${isDark ? 'from-slate-800 to-slate-900 translate-x-0' : 'from-yellow-400 to-orange-400 translate-x-full'}`} />
                <div className={`relative w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-700 ease-in-out flex items-center justify-center ${isDark ? 'translate-x-0' : 'translate-x-8'}`}>
                  {isDark ? <BsMoonStarsFill className="w-3 h-3 text-slate-800" /> : <BsSunFill className="w-4 h-4 text-yellow-500" />}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="mb-8 inline-flex items-center space-x-3">
              <FaHandPeace className={`${isDark ? 'text-green-300' : 'text-green-600'} animate-wave transition-colors duration-1000`} size={48} />
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-bold ${currentTheme.text} mb-6 transition-colors duration-1000`}>
              Nathan <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Arruda</span>
            </h1>
            
            <p className={`text-xl md:text-2xl ${currentTheme.textSecondary} mb-4 transition-colors duration-1000`}>
              Tech Lead & Software Architect
            </p>
            
            <p className={`${currentTheme.textMuted} text-lg mb-12 max-w-2xl mx-auto transition-colors duration-1000`}>
              Transformando ideias em código de alta performance há mais de 10 anos
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-12">
              <a
                href="https://github.com/natharuc"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 hover:scale-110 transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                aria-label="GitHub"
              >
                <FaGithub size={24} className="text-white drop-shadow-lg" />
              </a>
              <a
                href="https://linkedin.com/in/nathanarruda"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 hover:scale-110 transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} className="text-white drop-shadow-lg" />
              </a>
              <a
                href="https://twitter.com/natharuc"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 hover:scale-110 transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                aria-label="Twitter"
              >
                <FaTwitter size={24} className="text-white drop-shadow-lg" />
              </a>
              <a
                href="https://instagram.com/natharuc"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 hover:scale-110 transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                aria-label="Instagram"
              >
                <FaInstagram size={24} className="text-white drop-shadow-lg" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/sobre"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
              >
                Conheça Mais
              </Link>
              <Link
                href="/contato"
                className={`px-8 py-4 ${currentTheme.card} ${currentTheme.text} rounded-lg font-semibold hover:scale-105 transition-all duration-300 border ${currentTheme.cardBorder}`}
              >
                Entre em Contato
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer isDark={isDark} />

      {/* Mode Toggle Button */}
      <button
        onClick={() => setIsDevMode(true)}
        className={`fixed bottom-8 right-8 z-[100] p-4 rounded-full backdrop-blur-lg border transition-all duration-500 hover:scale-110 group ${
          isDark 
            ? 'bg-white/10 text-white border-white/20' 
            : 'bg-gray-900/10 text-gray-900 border-gray-900/20'
        }`}
        aria-label="Switch to Dev Mode"
      >
        <HiCode size={24} className="transition-transform group-hover:rotate-12" />
        
        <span className={`absolute bottom-full right-0 mb-2 px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDark 
            ? 'bg-black/90 text-white' 
            : 'bg-white/90 text-gray-900'
        }`}>
          Dev Mode
        </span>
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}