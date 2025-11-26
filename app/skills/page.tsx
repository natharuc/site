'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiCode, HiCloud, HiDatabase, HiSparkles } from 'react-icons/hi';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import Footer from '../components/Footer';

export default function Skills() {
  const [isDark, setIsDark] = useState(true);

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

  const skills = [
    {
      icon: HiCode,
      title: 'Backend & Languages',
      color: 'from-blue-500 to-cyan-500',
      items: [
        { name: 'C#', level: 95 },
        { name: '.NET Core', level: 95 },
        { name: 'PHP / Laravel', level: 80 },
        { name: 'Clean Code', level: 90 },
      ],
    },
    {
      icon: HiCloud,
      title: 'Cloud & Messaging',
      color: 'from-green-500 to-emerald-500',
      items: [
        { name: 'Azure Cloud', level: 90 },
        { name: 'Masstransit', level: 85 },
        { name: 'Event-Driven Architecture', level: 90 },
        { name: 'Mensageria', level: 85 },
      ],
    },
    {
      icon: HiDatabase,
      title: 'Database & Data',
      color: 'from-purple-500 to-pink-500',
      items: [
        { name: 'MySQL', level: 90 },
        { name: 'SQL Server', level: 85 },
        { name: 'Database Design', level: 85 },
        { name: 'Performance Tuning', level: 85 },
      ],
    },
    {
      icon: HiSparkles,
      title: 'Leadership & Architecture',
      color: 'from-yellow-500 to-orange-500',
      items: [
        { name: 'Tech Leadership', level: 90 },
        { name: 'Arquitetura de Software', level: 90 },
        { name: 'Produtividade do Time', level: 95 },
        { name: 'Tomada de Decisão', level: 90 },
      ],
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
              <Link href="/skills" className="text-sm font-medium text-green-400 scale-110">
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
            Minhas <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Tecnologias e competências dominadas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skillGroup, idx) => (
            <div
              key={idx}
              className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} transition-all duration-300 hover:transform hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${skillGroup.color} rounded-lg flex items-center justify-center`}>
                  <skillGroup.icon className="text-white drop-shadow-lg" size={24} />
                </div>
                <h3 className={`text-xl font-bold ${currentTheme.text} transition-colors duration-1000`}>
                  {skillGroup.title}
                </h3>
              </div>

              <div className="space-y-4">
                {skillGroup.items.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div className="flex justify-between mb-2">
                      <span className={`text-sm font-medium ${currentTheme.textSecondary} transition-colors duration-1000`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm ${currentTheme.textMuted} transition-colors duration-1000`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                      <div
                        className={`h-full bg-gradient-to-r ${skillGroup.color} rounded-full animate-skill-bar`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${(idx * 0.1) + (skillIdx * 0.05)}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

        @keyframes skill-bar {
          from {
            width: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-skill-bar {
          animation: skill-bar 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}
