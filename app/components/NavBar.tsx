'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { HiHome, HiUser, HiCode, HiBriefcase, HiMail, HiSparkles } from 'react-icons/hi';

interface NavBarProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function NavBar({ isDark, onThemeToggle }: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const theme = {
    dark: {
      navBg: 'bg-white/10',
      navBorder: 'border-white/10',
      text: 'text-white',
      textMuted: 'text-white/60',
    },
    light: {
      navBg: 'bg-white/90',
      navBorder: 'border-gray-300',
      text: 'text-gray-900',
      textMuted: 'text-gray-600',
    },
  };

  const currentTheme = isDark ? theme.dark : theme.light;

  const menuItems = [
    { href: '/', label: 'Home', icon: HiHome, color: 'from-green-500 to-emerald-500' },
    { href: '/sobre', label: 'Sobre', icon: HiUser, color: 'from-blue-500 to-cyan-500' },
    { href: '/skills', label: 'Skills', icon: HiCode, color: 'from-purple-500 to-pink-500' },
    { href: '/experiencia', label: 'Experiência', icon: HiBriefcase, color: 'from-yellow-500 to-orange-500' },
    { href: '/contato', label: 'Contato', icon: HiMail, color: 'from-red-500 to-rose-500' },
  ];

  // Prevenir scroll quando menu aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:block sticky top-0 left-0 right-0 z-50 backdrop-blur-lg ${currentTheme.navBg} border-b ${currentTheme.navBorder} transition-all duration-1000`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">NA</span>
              </div>
              <span className={`${currentTheme.text} font-bold text-xl transition-colors duration-1000`}>Nathan Arruda</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-green-400 scale-110'
                      : `${currentTheme.textMuted} hover:text-green-400`
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <button
                onClick={onThemeToggle}
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

      {/* Mobile Navigation - Radial Menu Concept */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-lg ${currentTheme.navBg} border-b ${currentTheme.navBorder} transition-all duration-1000`}>
          <div className="px-4 h-16 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NA</span>
              </div>
            </Link>

            <button
              onClick={onThemeToggle}
              className="relative w-14 h-7 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-1 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r transition-transform duration-700 ease-in-out ${isDark ? 'from-slate-800 to-slate-900 translate-x-0' : 'from-yellow-400 to-orange-400 translate-x-full'}`} />
              <div className={`relative w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-700 ease-in-out flex items-center justify-center ${isDark ? 'translate-x-0' : 'translate-x-7'}`}>
                {isDark ? <BsMoonStarsFill className="w-2.5 h-2.5 text-slate-800" /> : <BsSunFill className="w-3 h-3 text-yellow-500" />}
              </div>
            </button>
          </div>
        </div>

        {/* Radial Menu Button - Bottom Right */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`fixed bottom-6 right-6 z-[70] w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-2xl transition-all duration-500 flex items-center justify-center ${
            isMobileMenuOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
          }`}
          aria-label="Menu"
        >
          <div className="relative w-8 h-8">
            <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-x-[-50%] translate-y-[-50%]' : 'rotate-0 translate-x-[-50%] translate-y-[-8px]'
            }`} />
            <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0 translate-x-[-50%] translate-y-[-50%]' : 'opacity-100 translate-x-[-50%] translate-y-[-50%]'
            }`} />
            <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 translate-x-[-50%] translate-y-[-50%]' : 'rotate-0 translate-x-[-50%] translate-y-[6px]'
            }`} />
          </div>
        </button>

        {/* Radial Menu Overlay */}
        <div
          className={`fixed inset-0 z-[60] transition-all duration-700 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop with Blur */}
          <div
            className={`absolute inset-0 backdrop-blur-xl transition-all duration-700 ${
              isDark ? 'bg-black/80' : 'bg-white/80'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Radial Menu Items */}
          <div className="absolute inset-0 flex items-center justify-center">
            {menuItems.map((item, index) => {
              const angle = (index * 72 - 90) * (Math.PI / 180); // 360/5 = 72 degrees each
              const radius = 120; // Distance from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`absolute transition-all duration-700 ease-out ${
                    isMobileMenuOpen
                      ? `translate-x-0 translate-y-0 opacity-100 scale-100`
                      : 'translate-x-0 translate-y-0 opacity-0 scale-0'
                  }`}
                  style={{
                    transform: isMobileMenuOpen
                      ? `translate(${x}px, ${y}px) scale(${hoveredItem === item.label ? 1.2 : 1})`
                      : 'translate(0, 0) scale(0)',
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  <div className="relative group">
                    {/* Icon Circle */}
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} shadow-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'ring-4 ring-white/50' : ''
                      }`}
                    >
                      <item.icon className="text-white drop-shadow-lg" size={28} />
                    </div>

                    {/* Label */}
                    <div
                      className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                        hoveredItem === item.label || isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                      }`}
                    >
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        isDark ? 'bg-black/80 text-white' : 'bg-white/90 text-gray-900'
                      } shadow-lg`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Sparkle Effect on Active */}
                    {isActive && (
                      <HiSparkles
                        className="absolute -top-2 -right-2 text-yellow-400 animate-pulse"
                        size={20}
                      />
                    )}
                  </div>
                </Link>
              );
            })}

            {/* Center Decoration */}
            <div
              className={`absolute w-24 h-24 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 backdrop-blur-sm transition-all duration-700 ${
                isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-600/10 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-600/5 to-emerald-700/5" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
    </>
  );
}
