'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BiTargetLock, BiRefresh } from 'react-icons/bi';
import { FaUsers, FaTrophy } from 'react-icons/fa';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import Footer from '../components/Footer';

export default function Experiencia() {
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

  const experiences = [
    {
      period: 'Ago 2023 - Atual',
      role: 'Tech Lead',
      company: 'Grupo MAG',
      icon: BiTargetLock,
      color: 'from-green-500 to-emerald-500',
      achievements: [
        'Participação ativa no processo de desenvolvimento, auxiliando o PO',
        'Desenvolvimento em Azure Cloud e soluções com mensageria em .NET Core e Masstransit',
        'Evolução e manutenção da saúde dos ativos do time',
        'Busca constante por melhorias: escrita de código, migração de tecnologia, performance e estabilidade',
      ],
    },
    {
      period: 'Nov 2021 - Ago 2023',
      role: 'Tech Lead',
      company: 'Vital Consulting',
      icon: BiRefresh,
      color: 'from-blue-500 to-cyan-500',
      achievements: [
        'Tomada de decisões técnicas e auxílio em processos de desenvolvimento',
        'Trabalho focado na produtividade e satisfação do time',
        'Liderança técnica em projetos para MAG Seguros',
        'Atuação com arquitetura orientada a eventos e Azure Cloud',
      ],
    },
    {
      period: 'Jul 2021 - Ago 2023',
      role: 'Desenvolvedor .NET',
      company: 'Vital Consulting',
      icon: FaUsers,
      color: 'from-purple-500 to-pink-500',
      achievements: [
        'Desenvolvimento em projeto orientado a eventos usando C# e Azure Cloud',
        'Aplicação de Clean Code e boas práticas',
        'Foco em código preparado para o futuro',
        'Trabalho em time da MAG Seguros',
      ],
    },
    {
      period: 'Nov 2017 - Jul 2021',
      role: 'Desenvolvedor .NET',
      company: 'RCA Sistemas',
      icon: FaTrophy,
      color: 'from-yellow-500 to-orange-500',
      achievements: [
        'Responsável pelo desenvolvimento do RCA PDV usando Windows Form, Xamarin e Devexpress',
        'Desenvolvimento de soluções internas em PHP usando Laravel, Bootstrap e Vue.js',
        'Especialização em C# e .NET Core',
        'Entrega de soluções desktop e web',
      ],
    },
    {
      period: 'Dez 2015 - Nov 2017',
      role: 'Technical Support Specialist',
      company: 'RCA Sistemas',
      icon: BiRefresh,
      color: 'from-cyan-500 to-blue-500',
      achievements: [
        'Suporte e manutenção de banco de dados MySQL',
        'Automação de processos usando PHP, CSS, HTML5 e Bootstrap',
        'Início dos estudos em C# e desenvolvimento de soluções',
        'Suporte ao sistema Farma Manager',
      ],
    },
    {
      period: 'Nov 2014 - Dez 2015',
      role: 'Trainee',
      company: 'RCA Sistemas',
      icon: FaUsers,
      color: 'from-emerald-500 to-green-500',
      achievements: [
        'Aprendizado e especialização em MySQL',
        'Trabalho com Farma Manager (sistema para gerenciamento de múltiplas farmácias)',
        'Início da carreira em tecnologia',
        'Fundamentos de banco de dados e sistemas de gestão',
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
              <Link href="/skills" className={`text-sm font-medium transition-all duration-300 ${currentTheme.textMuted} hover:text-green-400`}>
                Skills
              </Link>
              <Link href="/experiencia" className="text-sm font-medium text-green-400 scale-110">
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
            Minha <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Experiência</span>
          </h1>
          <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Uma jornada de mais de 10 anos transformando código em soluções</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${isDark ? 'bg-gradient-to-b from-green-500 via-emerald-500 to-green-500' : 'bg-gradient-to-b from-green-400 via-emerald-400 to-green-400'} transition-colors duration-1000`} />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className={`relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} animate-fade-in`}
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} transition-all duration-300 hover:transform hover:scale-105`}>
                    <div className={`flex items-center ${idx % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4 space-x-3`}>
                      <div className={`w-12 h-12 bg-gradient-to-br ${exp.color} rounded-lg flex items-center justify-center`}>
                        <exp.icon className="text-white drop-shadow-lg" size={24} />
                      </div>
                    </div>
                    
                    <div className={`text-xs ${currentTheme.textMuted} mb-2 transition-colors duration-1000`}>{exp.period}</div>
                    <h3 className={`text-xl font-bold ${currentTheme.text} mb-1 transition-colors duration-1000`}>{exp.role}</h3>
                    <p className={`text-sm ${currentTheme.textSecondary} mb-4 transition-colors duration-1000`}>{exp.company}</p>
                    
                    <ul className={`space-y-2 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {exp.achievements.map((achievement, achIdx) => (
                        <li key={achIdx} className={`text-sm ${currentTheme.textMuted} transition-colors duration-1000`}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br ${exp.color} rounded-full border-4 ${isDark ? 'border-black' : 'border-gray-50'} transition-colors duration-1000 z-10`} />
              </div>
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
