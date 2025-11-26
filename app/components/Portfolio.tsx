'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHandPeace, FaTrophy, FaUsers, FaHeart } from 'react-icons/fa';
import { HiCode, HiCloud, HiDatabase, HiSparkles } from 'react-icons/hi';
import { BiTargetLock, BiRefresh } from 'react-icons/bi';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';

export default function Portfolio({ onThemeChange }: { onThemeChange?: (isDark: boolean) => void }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Detect active section
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // h-16 = 64px
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Theme colors
  const theme = {
    dark: {
      bg: 'from-black via-green-900 to-black',
      text: 'text-white',
      textSecondary: 'text-white/80',
      textMuted: 'text-white/60',
      textCard: 'text-white/70',
      card: 'bg-white/5',
      cardBorder: 'border-white/10',
      cardHover: 'hover:border-green-500/50',
      navBg: 'bg-white/10',
      navBorder: 'border-white/10',
    },
    light: {
      bg: 'from-gray-50 via-green-50 to-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-800',
      textMuted: 'text-gray-700',
      textCard: 'text-gray-700',
      card: 'bg-white shadow-lg',
      cardBorder: 'border-gray-300',
      cardHover: 'hover:border-green-500 hover:shadow-xl',
      navBg: 'bg-white/90',
      navBorder: 'border-gray-300',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br ${currentTheme.bg} transition-all duration-1000`}>
      {/* Navigation */}
      <nav className={`sticky top-0 left-0 right-0 z-[60] backdrop-blur-lg ${currentTheme.navBg} border-b ${currentTheme.navBorder} transition-all duration-1000`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NA</span>
              </div>
              <span className={`${currentTheme.text} font-bold text-xl transition-colors duration-1000`}>Nathan Arruda</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Sobre', 'Skills', 'Experiência', 'Contato'].map((item, i) => {
                const id = ['home', 'about', 'skills', 'experience', 'contact'][i];
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`text-sm font-medium transition-all duration-300 ${
                      activeSection === id
                        ? 'text-green-400 scale-110'
                        : `${currentTheme.textMuted} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
              
              {/* Theme Toggle Button */}
              <button
                onClick={() => {
                  setIsDark(!isDark);
                  onThemeChange?.(!isDark);
                }}
                className="relative w-16 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-1 transition-all duration-500 hover:scale-110 overflow-hidden"
              >
                {/* Sliding background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r transition-transform duration-700 ease-in-out ${
                    isDark ? 'from-slate-800 to-slate-900 translate-x-0' : 'from-yellow-400 to-orange-400 translate-x-full'
                  }`}
                />
                
                {/* Slider */}
                <div
                  className={`relative w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-700 ease-in-out flex items-center justify-center ${
                    isDark ? 'translate-x-0' : 'translate-x-8'
                  }`}
                >
                  {isDark ? (
                    <BsMoonStarsFill className="w-3 h-3 text-slate-800 animate-spin-slow" />
                  ) : (
                    <BsSunFill className="w-4 h-4 text-yellow-500 animate-pulse" />
                  )}
                </div>
                
                {/* Stars effect when dark */}
                {isDark && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-twinkle" />
                    <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.3s' }} />
                    <div className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full animate-twinkle" style={{ animationDelay: '0.6s' }} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 scroll-mt-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute w-96 h-96 bg-green-500/30 rounded-full blur-3xl"
            style={{ 
              top: '20%', 
              left: '10%',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          <div 
            className="absolute w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl"
            style={{ 
              bottom: '20%', 
              right: '10%',
              transform: `translateY(${-scrollY * 0.3}px)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm font-medium border border-green-500/30 flex items-center gap-2 inline-flex">
                <FaHandPeace className={`w-4 h-4 ${isDark ? 'text-green-300' : 'text-green-600'}`} /> Bem-vindo ao meu portfólio
              </span>
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-bold ${currentTheme.text} transition-colors duration-1000`}>
              Nathan <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Arruda</span>
            </h1>
            
            <p className={`text-2xl md:text-3xl ${currentTheme.textSecondary} font-light transition-colors duration-1000`}>
              Desenvolvedor • Tech Lead
            </p>
            
            <p className={`text-lg md:text-xl ${currentTheme.textMuted} max-w-2xl mx-auto transition-colors duration-1000`}>
              Transformando ideias em soluções escaláveis com <span className="text-green-400 font-semibold">10+ anos</span> de experiência em desenvolvimento
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Entre em Contato
                <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
              
              <button
                onClick={() => scrollToSection('about')}
                className={`px-8 py-4 backdrop-blur-sm rounded-full font-semibold border-2 transform hover:scale-105 transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' 
                    : 'bg-gray-900/10 text-gray-900 border-gray-900/20 hover:bg-gray-900/20'
                }`}
              >
                Saiba Mais
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 pt-8">
              <a 
                href="https://github.com/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-900/10 text-gray-900 hover:bg-gray-900/20'
                }`}
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-900/10 text-gray-900 hover:bg-gray-900/20'
                }`}
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://twitter.com/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-900/10 text-gray-900 hover:bg-gray-900/20'
                }`}
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://instagram.com/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-900/10 text-gray-900 hover:bg-gray-900/20'
                }`}
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
              Sobre <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Mim</span>
            </h2>
            <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Conheça um pouco da minha trajetória</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} ${currentTheme.cardHover} transition-all duration-300 hover:transform hover:scale-105`}>
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

              <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} ${currentTheme.cardHover} transition-all duration-300 hover:transform hover:scale-105`}>
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

              <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} ${currentTheme.cardHover} transition-all duration-300 hover:transform hover:scale-105`}>
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
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
              Minhas <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Habilidades</span>
            </h2>
            <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Tecnologias e ferramentas que domino</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Backend */}
            <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} ${currentTheme.cardHover} transition-all duration-1000 hover:transform hover:scale-105 group`}>
              <div className="flex items-center space-x-3 mb-6">
                <HiCode className="text-green-400 group-hover:scale-110 transition-transform" size={32} />
                <h3 className={`text-xl font-bold ${currentTheme.text} transition-colors duration-1000`}>Backend</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textMuted} transition-colors duration-1000`}>C# / .NET Core</span>
                    <span className="text-green-400 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full animate-skill-bar" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>PHP / Laravel</span>
                    <span className="text-green-400 font-semibold">80%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full animate-skill-bar" style={{ width: '80%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>REST APIs</span>
                    <span className="text-green-400 font-semibold">95%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full animate-skill-bar" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud */}
            <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} hover:border-blue-500/50 transition-all duration-1000 hover:transform hover:scale-105 group ${currentTheme.cardHover}`}>
              <div className="flex items-center space-x-3 mb-6">
                <HiCloud className="text-blue-400 group-hover:scale-110 transition-transform" size={32} />
                <h3 className={`text-xl font-bold ${currentTheme.text} transition-colors duration-1000`}>Cloud</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>Azure Cloud</span>
                    <span className="text-blue-400 font-semibold">90%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full animate-skill-bar" style={{ width: '90%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>Service Bus</span>
                    <span className="text-blue-400 font-semibold">85%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full animate-skill-bar" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>Functions</span>
                    <span className="text-blue-400 font-semibold">85%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full animate-skill-bar" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Frontend */}
            <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} hover:border-green-500/50 transition-all duration-1000 hover:transform hover:scale-105 group ${currentTheme.cardHover}`}>
              <div className="flex items-center space-x-3 mb-6">
                <HiCode className="text-green-400 group-hover:scale-110 transition-transform" size={32} />
                <h3 className={`text-xl font-bold ${currentTheme.text} transition-colors duration-1000`}>Frontend</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>Vue.js</span>
                    <span className="text-green-400 font-semibold">75%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full animate-skill-bar" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>Bootstrap</span>
                    <span className="text-green-400 font-semibold">85%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full animate-skill-bar" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>HTML/CSS</span>
                    <span className="text-green-400 font-semibold">90%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full animate-skill-bar" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Database */}
            <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} hover:border-orange-500/50 transition-all duration-1000 hover:transform hover:scale-105 group ${currentTheme.cardHover}`}>
              <div className="flex items-center space-x-3 mb-6">
                <HiDatabase className="text-orange-400 group-hover:scale-110 transition-transform" size={32} />
                <h3 className={`text-xl font-bold ${currentTheme.text} transition-colors duration-1000`}>Database</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>SQL Server</span>
                    <span className="text-orange-400 font-semibold">95%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full animate-skill-bar" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>MySQL</span>
                    <span className="text-orange-400 font-semibold">90%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full animate-skill-bar" style={{ width: '90%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={`${currentTheme.textCard} transition-colors duration-1000`}>NoSQL</span>
                    <span className="text-orange-400 font-semibold">75%</span>
                  </div>
                  <div className={`w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full h-2 overflow-hidden transition-colors duration-1000`}>
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full animate-skill-bar" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 text-center hover:transform hover:scale-105 transition-all duration-1000`}>
              <div className="flex justify-center mb-3">
                <BiTargetLock className={`w-12 h-12 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h4 className={`text-lg font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Clean Code & SOLID</h4>
              <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Código limpo e princípios de design</p>
            </div>
            <div className={`bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 text-center hover:transform hover:scale-105 transition-all duration-1000`}>
              <div className="flex justify-center mb-3">
                <BiRefresh className={`w-12 h-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h4 className={`text-lg font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Event-Driven Architecture</h4>
              <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Arquitetura orientada a eventos</p>
            </div>
            <div className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 text-center hover:transform hover:scale-105 transition-all duration-1000`}>
              <div className="flex justify-center mb-3">
                <FaUsers className={`w-12 h-12 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h4 className={`text-lg font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Liderança Técnica</h4>
              <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Mentoria e gestão de times</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
              Minha <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Trajetória</span>
            </h2>
            <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Experiência profissional e conquistas</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 to-emerald-500 hidden md:block" />

            <div className="space-y-12">
              {/* Current Position */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} hover:border-green-500/50 transition-all duration-1000 hover:transform hover:scale-105 ${currentTheme.cardHover}`}>
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-xs font-semibold mb-3">
                        Atual
                      </div>
                      <h3 className={`text-2xl font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Tech Lead</h3>
                      <p className="text-green-400 font-semibold mb-3">Grupo MAG</p>
                      <p className={`${currentTheme.textCard} text-sm mb-4 transition-colors duration-1000`}>
                        Liderando times de desenvolvimento, arquitetando soluções escaláveis em cloud (Azure), implementando arquitetura orientada a eventos com Masstransit.
                      </p>
                      <div className="space-y-2 text-left">
                        <div className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Arquitetura e desenvolvimento de microsserviços em .NET Core</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Implementação de mensageria com Azure Service Bus e Masstransit</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Mentoria técnica e gestão de times de desenvolvimento</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Definição de padrões de código e boas práticas (Clean Code, SOLID)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-black hidden md:block" />
              </div>

              {/* Senior Developer */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="hidden md:block" />
                  <div className="mb-8 md:mb-0">
                    <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} hover:border-blue-500/50 transition-all duration-1000 hover:transform hover:scale-105 ${currentTheme.cardHover}`}>
                      <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-semibold mb-3">
                        2018 - Presente
                      </div>
                      <h3 className={`text-2xl font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Senior Full Stack Developer</h3>
                      <p className="text-blue-400 font-semibold mb-3">Diversos Projetos Enterprise</p>
                      <p className={`${currentTheme.textCard} text-sm mb-4 transition-colors duration-1000`}>
                        Desenvolvimento de soluções complexas full-stack, com foco em performance, escalabilidade e qualidade de código.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Desenvolvimento de APIs RESTful de alta performance em .NET Core</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Implementação de frontends modernos com Vue.js e Bootstrap</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Otimização de queries e modelagem de dados em SQL Server e MySQL</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Integração com serviços cloud Azure (Functions, Storage, Service Bus)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 hidden md:block" />
              </div>

              {/* Full Stack Developer */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className={`${currentTheme.card} backdrop-blur-lg rounded-2xl p-6 border ${currentTheme.cardBorder} hover:border-cyan-500/50 transition-all duration-1000 hover:transform hover:scale-105 ${currentTheme.cardHover}`}>
                      <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-semibold mb-3">
                        2015 - 2018
                      </div>
                      <h3 className={`text-2xl font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>Full Stack Developer</h3>
                      <p className="text-cyan-400 font-semibold mb-3">Projetos Web & Mobile</p>
                      <p className={`${currentTheme.textCard} text-sm mb-4 transition-colors duration-1000`}>
                        Desenvolvimento de aplicações web e mobile, com stack PHP/Laravel e tecnologias Microsoft.
                      </p>
                      <div className="space-y-2 text-left">
                        <div className="flex items-start space-x-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Desenvolvimento de sistemas web com PHP, Laravel e CodeIgniter</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Criação de aplicativos mobile com Xamarin Forms</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Implementação de interfaces responsivas com Bootstrap e jQuery</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <p className={`${currentTheme.textMuted} text-sm transition-colors duration-1000`}>Gestão de bancos de dados MySQL e SQL Server</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-900 hidden md:block" />
              </div>

              {/* Achievement */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 hover:border-green-500/50 transition-all duration-1000 hover:transform hover:scale-105`}>
                      <div className="flex justify-center mb-3">
                        <FaTrophy className={`w-12 h-12 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      </div>
                      <h3 className={`text-2xl font-bold ${currentTheme.text} mb-2 transition-colors duration-1000`}>10+ Anos</h3>
                      <p className="text-green-400 font-semibold mb-3">De Experiência</p>
                      <p className={`${currentTheme.textCard} text-sm transition-colors duration-1000`}>
                        Uma década transformando desafios em soluções, sempre aprendendo e evoluindo com as melhores práticas do mercado.
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-slate-900 hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>
              Vamos <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Conversar?</span>
            </h2>
            <p className={`${currentTheme.textMuted} text-lg transition-colors duration-1000`}>Estou sempre aberto para novas oportunidades e projetos</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Social Links Cards */}
              <a 
                href="https://github.com/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} hover:border-purple-500/50 transition-all duration-1000 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${currentTheme.cardHover}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaGithub className="text-white drop-shadow-lg" size={32} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${currentTheme.text} mb-1 transition-colors duration-1000`}>GitHub</h3>
                    <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>@natharuc</p>
                  </div>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} hover:border-blue-500/50 transition-all duration-1000 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${currentTheme.cardHover}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaLinkedin className="text-white drop-shadow-lg" size={32} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${currentTheme.text} mb-1 transition-colors duration-1000`}>LinkedIn</h3>
                    <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>@natharuc</p>
                  </div>
                </div>
              </a>

              <a 
                href="https://twitter.com/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} hover:border-sky-500/50 transition-all duration-1000 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/20 ${currentTheme.cardHover}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaTwitter className="text-white drop-shadow-lg" size={32} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${currentTheme.text} mb-1 transition-colors duration-1000`}>Twitter / X</h3>
                    <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>@natharuc</p>
                  </div>
                </div>
              </a>

              <a 
                href="https://instagram.com/natharuc" 
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${currentTheme.card} backdrop-blur-lg rounded-2xl p-8 border ${currentTheme.cardBorder} hover:border-pink-500/50 transition-all duration-1000 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 ${currentTheme.cardHover}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaInstagram className="text-white drop-shadow-lg" size={32} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${currentTheme.text} mb-1 transition-colors duration-1000`}>Instagram</h3>
                    <p className={`${currentTheme.textMuted} transition-colors duration-1000`}>@natharuc</p>
                  </div>
                </div>
              </a>
            </div>

            {/* CTA */}
            <div className="mt-12 text-center">
              <div className={`bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 transition-all duration-1000`}>
                <h3 className={`text-2xl font-bold ${currentTheme.text} mb-4 transition-colors duration-1000`}>Tem um projeto em mente?</h3>
                <p className={`${currentTheme.textMuted} mb-6 transition-colors duration-1000`}>
                  Vamos transformar sua ideia em realidade. Entre em contato através das redes sociais acima!
                </p>
                <div className="inline-flex items-center space-x-2 text-green-400">
                  <span className="text-sm font-semibold">Todas as redes:</span>
                  <span className="text-lg font-bold">@natharuc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-white/10' : 'border-gray-200'} py-8 transition-all duration-1000`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${currentTheme.textMuted} text-sm transition-colors duration-1000`}>
            <p className="flex items-center justify-center gap-2">© 2025 Nathan Arruda. Feito com <FaHeart className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-red-600'}`} /> e muito código.</p>
          </div>
        </div>
      </footer>

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

        @keyframes scroll {
          0%, 20% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(15px);
          }
        }

        @keyframes skill-bar {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        .animate-skill-bar {
          animation: skill-bar 1.5s ease-out;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
