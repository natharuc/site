'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiSparkles, HiCloud, HiCode } from 'react-icons/hi';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function Sobre() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.title = 'Sobre - Nathan Arruda';
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
      {/* Navigation */}
      <NavBar isDark={isDark} onThemeToggle={handleThemeToggle} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className={`text-5xl md:text-6xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
            Sobre <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Mim</span>
          </h1>
          <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Conheça um pouco da minha trajetória</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} transition-all duration-300 hover:transform hover:scale-105`}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiSparkles className="text-white drop-shadow-lg" size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Tech Lead</h3>
                  <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>
                    Liderando times de desenvolvimento e arquitetando soluções escaláveis no <span className="text-green-400 font-semibold">Grupo MAG</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} transition-all duration-300 hover:transform hover:scale-105`}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiCode className="text-white drop-shadow-lg" size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>10+ Anos de Experiência</h3>
                  <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>
                    Codando para o futuro, sempre buscando <span className="text-blue-400 font-semibold">performance</span> e <span className="text-cyan-400 font-semibold">estabilidade</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} transition-all duration-300 hover:transform hover:scale-105`}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiCloud className="text-white drop-shadow-lg" size={24} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Especialista em Cloud</h3>
                  <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>
                    Arquitetura orientada a eventos, mensageria e soluções na <span className="text-green-400 font-semibold">Azure Cloud</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 border ${isDark ? 'border-white/10' : 'border-green-200'} transition-all duration-1000`}>
            <h3 className={`text-2xl font-bold ${currentTheme.text} mb-6 transition-colors duration-1000`}>Minha Filosofia</h3>
            <div className={`space-y-4 ${currentTheme.textSecondary} transition-colors duration-1000`}>
              <p className="leading-relaxed">
                Acredito que <span className="text-green-400 font-semibold">código limpo</span> é mais que uma prática - é uma arte. Com mais de uma década construindo sistemas, aprendi que as melhores soluções são aquelas que equilibram elegância técnica com resultados de negócio.
              </p>
              <p className="leading-relaxed">
                Como Tech Lead, minha missão vai além de escrever código: é <span className="text-emerald-400 font-semibold">inspirar times</span>, compartilhar conhecimento e criar arquiteturas que suportam o crescimento exponencial dos produtos.
              </p>
              <p className="leading-relaxed">
                Especializado em <span className="text-blue-400 font-semibold">.NET</span>, <span className="text-cyan-400 font-semibold">Azure</span> e arquitetura de microsserviços, transformo desafios complexos em soluções simples e eficientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer isDark={isDark} />

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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
