'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import Footer from '../components/Footer';

export default function Contato() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.title = 'Contato - Nathan Arruda';
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

  const contacts = [
    {
      name: 'GitHub',
      username: '@natharuc',
      url: 'https://github.com/natharuc',
      icon: FaGithub,
      color: 'from-gray-700 to-gray-900',
    },
    {
      name: 'LinkedIn',
      username: 'Nathan Arruda',
      url: 'https://linkedin.com/in/nathanarruda',
      icon: FaLinkedin,
      color: 'from-blue-600 to-blue-800',
    },
    {
      name: 'Twitter',
      username: '@natharuc',
      url: 'https://twitter.com/natharuc',
      icon: FaTwitter,
      color: 'from-sky-400 to-sky-600',
    },
    {
      name: 'Instagram',
      username: '@natharuc',
      url: 'https://instagram.com/natharuc',
      icon: FaInstagram,
      color: 'from-pink-500 to-rose-600',
    },
  ];

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
              <Link href="/sobre" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Sobre
              </Link>
              <Link href="/skills" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Skills
              </Link>
              <Link href="/experiencia" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Experiência
              </Link>
              <Link href="/contato" className="text-sm font-medium text-green-400 scale-110">
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
            Vamos <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Conectar</span>
          </h1>
          <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Estou sempre aberto a novas oportunidades e conversas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contacts.map((contact, idx) => (
            <a
              key={idx}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} transition-all duration-300 hover:transform hover:scale-105 group animate-fade-in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <contact.icon className="text-white drop-shadow-lg" size={28} />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${currentTheme.text} mb-1 transition-colors duration-1000`}>{contact.name}</h3>
                  <p className={`text-sm ${currentTheme.textMuted} transition-colors duration-1000`}>{contact.username}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-12 border ${currentTheme.cardBorder} text-center animate-fade-in`} style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
              <FaHeart className="text-white drop-shadow-lg" size={36} />
            </div>
          </div>
          <h2 className={`text-3xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
            Pronto para colaborar?
          </h2>
          <p className={`${currentTheme.textSecondary} mb-8 max-w-2xl mx-auto transition-colors duration-1000`}>
            Seja para discutir uma oportunidade, trocar ideias sobre tecnologia ou apenas bater um papo sobre código, 
            ficarei feliz em conversar. Me encontre nas redes sociais acima!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {contacts.map((contact, idx) => (
              <a
                key={idx}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg bg-gradient-to-br ${contact.color} hover:scale-110 transition-transform`}
                aria-label={contact.name}
              >
                <contact.icon className="text-white" size={24} />
              </a>
            ))}
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
