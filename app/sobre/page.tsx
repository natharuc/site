'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiSparkles, HiCloud, HiCode } from 'react-icons/hi';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import Footer from '../components/Footer';

export default function Sobre() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.title = 'Sobre - Nathan Arruda';
  }, []);

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
              <Link href="/" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Home
              </Link>
              <Link href="/sobre" className="text-sm font-medium text-green-400 scale-110">
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
