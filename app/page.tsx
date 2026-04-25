'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHandPeace } from 'react-icons/fa';
import { HiSparkles, HiCode, HiDocumentText, HiArrowRight } from 'react-icons/hi';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

export default function Home() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const savedMode = localStorage.getItem('viewMode');
    setIsDark(savedTheme !== 'light');
    setIsDevMode(savedMode === 'terminal');
  }, []);

  useEffect(() => {
    document.title = isDevMode ? 'Nathan Arruda - Terminal Dev Mode' : 'Nathan Arruda - Tech Lead & Software Architect';
  }, [isDevMode]);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    if (newTheme) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  };

  const handleModeToggle = () => {
    const newMode = !isDevMode;
    setIsDevMode(newMode);
    localStorage.setItem('viewMode', newMode ? 'terminal' : 'visual');
  };

  if (!mounted) {
    return null;
  }

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
          onClick={handleModeToggle}
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
      <NavBar isDark={isDark} onThemeToggle={handleThemeToggle} />

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

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/20 text-green-400 text-sm font-semibold mb-5">
            <HiDocumentText />
            Blog
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
            Últimas <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">postagens</span>
          </h2>

          <p className={`${currentTheme.textMuted} text-lg max-w-2xl mx-auto transition-colors duration-1000`}>
            Reflexões sobre tecnologia, carreira, arquitetura e os movimentos que estão mudando o mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-stretch">
          <div className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder} relative overflow-hidden`}>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
            <div className="relative h-full flex flex-col justify-between">
              <div>
                <p className="text-green-400 font-semibold mb-3">Destaque</p>
                <h3 className={`${currentTheme.text} text-3xl font-bold mb-4 transition-colors duration-1000`}>
                  IA e o futuro da TI
                </h3>
                <p className={`${currentTheme.textMuted} leading-relaxed transition-colors duration-1000`}>
                  Uma previsão direta sobre como a inteligência artificial deve impactar devs, QAs,
                  suporte, times de tecnologia e o perfil do profissional que continuará relevante.
                </p>
              </div>

              <Link
                href="/blog/ia-futuro-ti"
                className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/40"
              >
                Ler postagem
                <HiArrowRight />
              </Link>
            </div>
          </div>

          <Link
            href="/blog/ia-futuro-ti"
            className={`${currentTheme.card} backdrop-blur-lg rounded-3xl p-8 border ${currentTheme.cardBorder} hover:scale-[1.02] transition-all duration-300 group`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <HiCode className="text-white" size={30} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-400/20 text-sm font-semibold">
                    Mercado
                  </span>
                  <span className={`px-3 py-1 rounded-full ${currentTheme.card} ${currentTheme.textMuted} border ${currentTheme.cardBorder} text-sm`}>
                    24/04/2026
                  </span>
                </div>

                <h3 className={`${currentTheme.text} text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors duration-300`}>
                  Menos executores, mais orquestradores
                </h3>

                <p className={`${currentTheme.textMuted} leading-relaxed transition-colors duration-1000`}>
                  A IA não precisa substituir 100% um profissional. Ela só precisa permitir que uma pessoa boa faça o trabalho de várias.
                </p>
              </div>

              <HiArrowRight className="text-green-400 group-hover:translate-x-1 transition-transform duration-300 hidden md:block" size={28} />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer isDark={isDark} />

      {/* Mode Toggle Button */}
      <button
        onClick={handleModeToggle}
        className={`fixed bottom-8 left-8 z-[100] p-4 rounded-full backdrop-blur-lg border transition-all duration-500 hover:scale-110 group ${
          isDark 
            ? 'bg-white/10 text-white border-white/20' 
            : 'bg-gray-900/10 text-gray-900 border-gray-900/20'
        }`}
        aria-label="Switch to Dev Mode"
      >
        <HiCode size={24} className="transition-transform group-hover:rotate-12" />
        
        <span className={`absolute bottom-full left-0 mb-2 px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
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